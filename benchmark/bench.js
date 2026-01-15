import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 50,
  duration: "30s",
};

const baseUrl = (__ENV.BASE || "https://do-d1-drizzle.r3js.workers.dev").replace(
  /\/+$/,
  "",
);
const d1Path = __ENV.D1_PATH || "/d1/create";
const doPath = __ENV.DO_PATH || "/do/create";
const joinUrl = (base, path) => `${base}${path.startsWith("/") ? "" : "/"}${path}`;

export default function () {
  // http.get(joinUrl(baseUrl, d1Path));
  http.get(joinUrl(baseUrl, doPath));
  sleep(0.1);
}
