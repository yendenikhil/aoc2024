const p = console.log;
const k = (x, y) => JSON.stringify([x, y]);
const ka = (x) => JSON.stringify(x);
const instr = Deno.readTextFileSync("18.in").trim().split("\n").map((line) =>
  line.split(",").map(Number)
);
// const len = 6 + 1
const len = 70 + 1;
// let bitsize = 12
let bitsize = 1024;

// p({instr})
const G = [];
for (let y = 0; y < len; y++) {
  let line = "";
  for (let x = 0; x < len; x++) {
    if (instr.slice(0, bitsize).map((e) => ka(e)).includes(k(x, y))) {
      line += "#";
    } else {
      line += ".";
    }
  }
  G.push(line);
}
// G.forEach(e => p(e))

const nn = (x, y) => [
  [x + 1, y],
  [x - 1, y],
  [x, y + 1],
  [x, y - 1],
];
const isin = (x, y) =>
  x >= 0 && y >= 0 && x < len && y < len && G[y][x] !== "#";

let q = [[0, 0, 0, new Set()]];
let visited = new Set();
let p1 = 0;
let p2 = "";
while (q.length > 0) {
  const [x, y, steps, path] = q.shift();
  // p({x, y, steps})
  if (x === len - 1 && y === len - 1) {
    if (p1 === 0) {
      p1 = steps;
    }
    for (; bitsize < instr.length; bitsize++) {
      const [dx, dy] = instr[bitsize];
      // p({dx, dy})
      G[dy] = G[dy].substring(0, dx) + "#" + G[dy].substring(dx + 1);
      if (path.has(k(dx, dy))) {
        p2 = dx + "," + dy;
        q = [[0, 0, 0, new Set()]];
        visited = new Set();
        break;
      }
    }
    continue;
  }
  if (visited.has(k(x, y))) continue;
  path.add(k(x, y));
  visited.add(k(x, y));
  nn(x, y).filter((e) => isin(...e) && !visited.has(k(...e)))
    .forEach((e) => q.push([...e, steps + 1, new Set(path)]));
}
p({ p1 });
p({ p2 });
