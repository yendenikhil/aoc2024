const p = console.log;
const G = Deno.readTextFileSync("10.in").trim().split("\n").map((line) =>
  line.split("").map(Number)
);
const k = (r, c) => JSON.stringify([r, c]);
const nn = (r, c) => [
  [r + 1, c],
  [r - 1, c],
  [r, c + 1],
  [r, c - 1],
];
const isin = (r, c, cell, visited) =>
  r >= 0 && c >= 0 && r < G.length && c < G[0].length &&
  !visited.has(k(r, c)) && G[r][c] === cell + 1;

const th = [];
G.forEach((row, r) =>
  row.forEach((cell, c) => {
    if (cell === 0) th.push([r, c]);
  })
);
let p1 = 0;
let p2 = 0;
while (th.length > 0) {
  const q = [];
  const visited = new Set();
  const loc9 = new Set();
  const thcurr = th.shift();
  q.push(thcurr.slice());
  while (q.length > 0) {
    const [r, c] = q.shift();
    const currcell = G[r][c];
    visited.add(k(r, c));
    if (currcell === 9) {
      loc9.add(k(r, c));
      continue;
    }
    //p({r,c, visited, nn: nn(r, c)})
    nn(r, c).filter(([nr, nc]) => isin(nr, nc, currcell, visited))
      .forEach((e) => q.push(e));
  }
  p1 += loc9.size;
  const q2 = [];
  q2.push([...thcurr, new Set()]);
  let ratings = 0;
  while (q2.length > 0) {
    const [r, c, visited] = q2.pop();
    const currcell = G[r][c];
    visited.add(k(r, c));
    // p({r,c, currcell, visited, nn: nn(r, c)})
    if (currcell === 9) {
      ratings++;
      continue;
    }
    nn(r, c).filter(([nr, nc]) => isin(nr, nc, currcell, visited))
      .forEach((e) => q2.push([...e, new Set(visited)]));
  }
  p2 += ratings;
}
p({ p1 });
p({ p2 });
