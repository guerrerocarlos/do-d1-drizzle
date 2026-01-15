# DO D1 Drizzle

Compare the performance of Cloudflare D1 vs Durable Object backed SQLite (DO-sqlite)
using k6 and `benchmark/bench.js`.

## What is being compared
- D1: `GET /d1/create` inserts a row into D1 with Drizzle.
- DO-sqlite: `GET /do/create` inserts a row into a Durable Object SQLite DB.

## Prereqs
- A deployed Worker (or `wrangler dev`).
- k6 installed. If you refer to it as "k9", this repo uses k6 in
  `benchmark/bench.js` (`k6/http`).

## Run the benchmark
1. Point the benchmark at your base URL.
2. Run once for D1 and once for DO-sqlite using the same options.

Example:

```bash
k6 run benchmark/bench.js -e BASE=https://<your-worker>.workers.dev
```

By default, `benchmark/bench.js` calls the DO endpoint. To test D1, flip the
commented line:

```js
  http.get(joinUrl(baseUrl, d1Path));
  // http.get(joinUrl(baseUrl, doPath));
```

Then rerun the same command.

## Optional tuning
- Adjust virtual users and duration in `benchmark/bench.js` `options`.
- Set custom paths:
  - `-e D1_PATH=/d1/create`
  - `-e DO_PATH=/do/create`
- Export results for side-by-side comparison:

```bash
k6 run benchmark/bench.js -e BASE=... --summary-export=results-do.json
k6 run benchmark/bench.js -e BASE=... --summary-export=results-d1.json
```

Compare `http_req_duration` (avg/p95), `http_reqs`, and error rates between runs.
