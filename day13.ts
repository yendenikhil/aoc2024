const p = console.log;
const up = 10000000000000;
const configs = Deno.readTextFileSync("13.in").trim().split("\n\n")
  .map((config) =>
    config.split("\n").map((line) =>
      line.replace(/.*: /, "").replace(/X./, "").replace(/Y./, "").split(", ")
        .map(Number)
    )
  );
let p1 = 0;
let p2 = 0;
configs.forEach(([[ax, ay], [bx, by], [rx, ry]]) => {
  const rx2 = up + rx;
  const ry2 = up + ry;
  const a = (rx * by - ry * bx) / (ax * by - ay * bx);
  const b = (ax * ry - ay * rx) / (ax * by - ay * bx);
  const a2 = (rx2 * by - ry2 * bx) / (ax * by - ay * bx);
  const b2 = (ax * ry2 - ay * rx2) / (ax * by - ay * bx);
  if (Number.isInteger(a) && Number.isInteger(b)) {
    p1 += 3 * a;
    p1 += b;
  }
  if (Number.isInteger(a2) && Number.isInteger(b2)) {
    p2 += 3 * a2;
    p2 += b2;
  }
});
p({ p1 });
p({ p2 });
