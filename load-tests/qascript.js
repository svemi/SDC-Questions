import { Rate } from "k6/metrics";
import http from "k6/http";

let myRate = new Rate("my_rate");

export default function() {
  let res = http.get("http://localhost:3000/qa/questions?product_id=14066");
  myRate.add(1);
}

export let options = {
  vus: 10,
  duration: "10s",
  thresholds: {
    my_rate: ["rate>=1000"],
  },
};