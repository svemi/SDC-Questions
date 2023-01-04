const db = require('../../databases/productsDB.js');
const {pool} = require('../../databases/productsDB.js');

const stylesQuery =
`SELECT coalesce(json_agg
  (
    json_build_object
    (
      'product_id', product.id,
      'results', (
        SELECT coalesce(json_agg
          (
            'style_id', styles.id,
            'name', styles.name,
            'original_price', styles.original_price,
            'sale_price', styles.sale_price,
            'default', styles.default_style,
            'photos', (
              SELECT coalesce(json_agg
                (
                  'thumbnail_url', photos.thumbnail_url,
                  'url', photos.url,
                )'[]'::json
              ) FROM photos WHERE photos.styleId = styles.id
            )
            'skus', (
              SELECT coalesce(json_agg
                (
                  'skus.id', (
                    SELECT coalesce(json_agg
                      (
                        'quantity', skus.quantity,
                        'size', skus.size,
                      )
                    )
                  )
                )'[]'::json
              ) FROM skus where skus.styleId = styles.id
            )
          ) '[]'::json
        )FROM styles where styles.productId = product.id
      )
    )
  )
) FROM product`;
const relatedQuery =
`SELECT coalesce(json_agg
  (
    json_build_array
    (
      related.related_product_id
    )
  )
) FROM related
WHERE related.current_product_id = product.id`;
//I feel like i need to define from product table somehow ^

module.exports = {
  getInfo: (data, CB) => {
    pool.query(
      // `SELECT * from product where id = '${data}'`,
      `SELECT coalesce (json_build_object
        (
          'id', product.id,
          'name', product.name,
          'slogan', product.slogan,
          'description', product.description,
          'category', product.category,
          'default_price', product.default_price,
          'features', (
              SELECT json_agg
                (
                  json_build_object
                    (
                    'feature', features.feature,
                    'value', features.value
                    )
                )
              FROM features where features.product_id = product.id
            )
        ), '[]'::json
      )
        FROM product where product.id = '${data}'`
      ,
      (err, response) => {
        CB(err, response)
      }
    )
  },
  getStyles: (data, CB) => {
    pool.query(
      // `SELECT * from styles where styles.id = '${data}'`,
      `SELECT json_build_object (
          'product_id', product.id,
          'results', (
            SELECT coalesce(json_agg(
                json_build_object (
                  'style_id', styles.id,
                  'name', styles.name,
                  'original_price', styles.original_price,
                  'sale_price', styles.sale_price,
                  'default', styles.default_style,
                  'photos', (
                    SELECT coalesce(json_agg(
                        json_build_object (
                          'thumbnail_url', photos.thumbnail_url,
                        'url', photos.url
                        )
                      ), '[]'::json
                    ) FROM photos WHERE photos.styleId = styles.id
                  ),
                  'skus', (
                    SELECT json_object_agg(
                        skus.id,
                           json_build_object(
                              'quantity', skus.quantity,
                              'size', skus.size
                            )
                      )
                    FROM skus where skus.styleId = styles.id
                  )
                )
              ), '[]'::json
            )FROM styles where styles.productId = product.id
          )
        )
       FROM product where product.id = '${data}'`
      ,
      (err, response) => {
        if (err) {
          CB(err)
        } else {
          CB(null, response)
        }
      }
    )
  },
  getRelated: (data, CB) => {
    pool.query(
      //`SELECT * from related WHERE related.current_product_id = '${data}'`,
      `SELECT
        coalesce(json_agg
        (
          related.related_product_id
        )
        , '[]'::json
      ) FROM related WHERE related.current_product_id = '${data}'`,
      (err, response) => {
        if (err) {
          CB(err)
        } else {
          CB(null, response)
        }
      }
    )
  }
}
