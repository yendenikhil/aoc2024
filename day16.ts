import { PriorityQueue } from "./priorityqueue.ts";
const p = console.log;
const G = Deno.readTextFileSync("16.in").trim().split("\n").map((l) =>
  l.split("")
);
let sr = 0;
let sc = 0;
G.forEach((row, dr) =>
  row.forEach((cell, dc) => {
    if (cell === "S") {
      sr = dr;
      sc = dc;
    }
  })
);
const k = (r, c, dir) => JSON.stringify([r, c, dir]);
const visited = new Set();
const dirs = [
  (r, c) => [r + 0, c + 1, 0],
  (r, c) => [r + 1, c + 0, 1],
  (r, c) => [r + 0, c - 1, 2],
  (r, c) => [r - 1, c + 0, 3],
];
const isin = (r, c) =>
  r >= 0 && c >= 0 && r < G.length && c < G[0].length && G[r][c] !== "#";
const q = new PriorityQueue((a, b) => a[3] < b[3]);
q.push([sr, sc, 0, 0, new Set()]);
let p1 = 99999999;
const p2 = new Set();
while (!q.isEmpty() > 0) {
  const [r, c, dir, steps, points] = q.pop();
  //p({r, c, dir, steps})
  if (steps > p1) continue;
  visited.add(k(r, c, dir));
  points.add(k(r, c));
  if (G[r][c] === "E") {
    // p({steps})
    p1 = p1 < steps ? p1 : steps;
    points.forEach((e) => p2.add(e));
    //break
  }
  const s = dirs[dir](r, c);
  const lt = dirs[(dir + 1) % 4](r, c);
  const rt = dirs[(dir + 3) % 4](r, c);
  if (isin(...s) && !visited.has(k(...s))) {
    q.push([...s, steps + 1, new Set(points)]);
  }
  if (isin(...lt) && !visited.has(k(...lt))) {
    q.push([...lt, steps + 1001, new Set(points)]);
  }
  if (isin(...rt) && !visited.has(k(...rt))) {
    q.push([...rt, steps + 1001, new Set(points)]);
  }
}
p({ p1, p2: p2.size });
