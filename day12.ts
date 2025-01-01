const p = console.log;
const G = Deno.readTextFileSync("12.1.in").trim().split("\n").map((line) =>
  line.split("")
);

const k = (r, c) => JSON.stringify([r, c]);
const nn = (r, c) => [
  [r + 1, c],
  [r - 1, c],
  [r, c + 1],
  [r, c - 1],
];
const visited = new Set();
const isin = (r, c) => r >= 0 && c >= 0 && r < G.length && c < G[0].length;
const areas = [];
const flood = (r, c) => {
  const area = [];
  const l = G[r][c];
  const q = [[r, c]];
  while (q.length > 0) {
    const [cr, cc] = q.shift();
    if (visited.has(k(cr, cc))) {
      continue;
    }
    visited.add(k(cr, cc));
    area.push([cr, cc]);
    //p({cr, cc, q, visited})
    nn(cr, cc)
      .filter(([dr, dc]) => isin(dr, dc))
      .filter(([dr, dc]) => G[dr][dc] === l)
      .filter(([dr, dc]) => !visited.has(k(dr, dc)))
      .forEach((e) => q.push(e));
  }
  areas.push(area);
  //p({l, area})
};
for (let r = 0; r < G.length; r++) {
  for (let c = 0; c < G[0].length; c++) {
    if (!visited.has(k(r, c))) flood(r, c);
  }
}
let p1 = 0;
let p2 = 0;
const dx = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const calcsides = (area, s) => {
  let sides = 0;
  let d = 0;
  area.forEach(([r, c]) => {
    sides += nn(r, c).filter(([dr, dc]) => !s.has(k(dr, dc))).length - 1;
  });
  p({ sides });
  return sides;
};
areas.forEach((area) => {
  const a = area.length;
  let per = 0;
  const s = new Set();
  area.forEach(([r, c]) => s.add(k(r, c)));
  area.forEach(([r, c]) =>
    per += nn(r, c).filter(([dr, dc]) => !s.has(k(dr, dc))).length
  );
  // p({a, per, l: G[area[0][0]][area[0][1]]})
  p1 += a * per;
  p2 += a * calcsides(area, s);
});
p({ p1 });
p({ p2 });
