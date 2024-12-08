const p = console.log;
const raw = (await Deno.readTextFile("8.in")).trim().split("\n").map((line) =>
  line.split("")
);
const rlen = raw.length;
const clen = raw[0].length;
const k = (r, c) => JSON.stringify([r, c]);
const isin = (r, c) => r >= 0 && c >= 0 && r < rlen && c < clen;
const antennas = new Map();

raw.forEach((row, r) =>
  row.forEach((cell, c) => {
    if (cell !== ".") {
      const arr = antennas.get(cell) ?? [];
      arr.push([r, c]);
      antennas.set(cell, arr);
    }
  })
);
const spots = (r1, c1, r2, c2) => {
  return [
    [r1 + (r1 - r2), c1 + (c1 - c2)],
    [r2 + (r2 - r1), c2 + (c2 - c1)],
  ];
};
const spots2 = (r1, c1, r2, c2) => {
  const ans = [];
  let dr = r1;
  let dc = c1;
  while (isin(dr, dc)) {
    ans.push([dr, dc]);
    dr = dr + (r1 - r2);
    dc = dc + (c1 - c2);
  }
  dr = r2;
  dc = c2;
  while (isin(dr, dc)) {
    ans.push([dr, dc]);
    dr = dr + (r2 - r1);
    dc = dc + (c2 - c1);
  }
  return ans;
};
const nodes = new Set();
const nodes2 = new Set();
antennas.forEach((v) => {
  const arr = v.slice().map((e) => e.slice());
  while (arr.length > 0) {
    const [r, c] = arr.shift();
    arr.forEach(([r2, c2]) => {
      spots(r, c, r2, c2)
        .filter(([dr, dc]) => isin(dr, dc))
        .forEach(([dr, dc]) => {
          nodes.add(k(dr, dc));
        });
      spots2(r, c, r2, c2)
        .filter(([dr, dc]) => isin(dr, dc))
        .forEach(([dr, dc]) => {
          nodes2.add(k(dr, dc));
        });
    });
  }
});
p(nodes.size);
p(nodes2.size);
