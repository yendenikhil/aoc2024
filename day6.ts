const p = console.log;
const G = new Map();
const k = (r, c) => JSON.stringify([r, c]);
const k2 = (r, c, d) => JSON.stringify([r, c, d]);
const raw = (await Deno.readTextFile("6.in")).trim().split("\n").map((line) =>
  line.split("")
);
let r = 0;
let c = 0;
raw.forEach((row, dr) =>
  row.forEach((cell, dc) => {
    G.set(k(dr, dc), cell);
    if (cell === "^") {
      r = dr;
      c = dc;
    }
  })
);

const startr = r;
const startc = c;
const visited = new Set();
const isin = (r, c) => r >= 0 && c >= 0 && r < raw.length && c < raw[0].length;
let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
let dir = 0;

while (isin(r, c)) {
  visited.add(k(r, c));
  let nr = r + dirs[dir % 4][0];
  let nc = c + dirs[dir % 4][1];
  while (G.get(k(nr, nc)) === "#") {
    dir = (dir + 1) % 4;
    nr = r + dirs[dir % 4][0];
    nc = c + dirs[dir % 4][1];
    if (!isin(nr, nc)) {
      break;
    }
  }
  if (!isin(nr, nc)) {
    break;
  }
  //p({r, c, nr, nc})
  r = nr;
  c = nc;
}

p(`p1: ${visited.size}`);
const obs = [];
visited.forEach((e) => {
  if (e !== k(startr, startc)) {
    obs.push(JSON.parse(e));
  }
});

const isloop = (or, oc) => {
  r = startr;
  c = startc;
  dir = 0;
  const v = new Set();
  while (isin(r, c)) {
    if (v.has(k2(r, c, dir))) {
      return true;
    }
    v.add(k2(r, c, dir));
    let nr = r + dirs[dir % 4][0];
    let nc = c + dirs[dir % 4][1];
    while ((nr == or && nc == oc) || G.get(k(nr, nc)) === "#") {
      dir = (dir + 1) % 4;
      nr = r + dirs[dir % 4][0];
      nc = c + dirs[dir % 4][1];
      if (!isin(nr, nc)) {
        break;
      }
    }
    if (!isin(nr, nc)) {
      break;
    }
    //p({r, c, nr, nc})
    r = nr;
    c = nc;
  }
  return false;
};

const p2 = obs.filter(([dr, dc]) => isloop(dr, dc)).length;
p({ p2 });
