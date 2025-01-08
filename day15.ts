const p = console.log;
const raw = Deno.readTextFileSync("15.in").trim();
const k = (r, c) => JSON.stringify([r, c]);
const G = raw.split("\n\n")[0].split("\n").map((line) => line.split(""));
const G2 = G.map((line) =>
  line.map((e) => {
    switch (e) {
      case "#":
        return "##";
      case ".":
        return "..";
      case "O":
        return "[]";
      case "@":
        return "@.";
    }
  }).map((l) => l.split("")).flat()
);
const instr = raw.split("\n\n")[1].split("\n").map((line) => line.split(""))
  .flat();
const instr2 = instr.slice();

let r = 0;
let c = 0;
G.forEach((row, r1) =>
  row.forEach((cell, c1) => {
    if (cell === "@") {
      r = r1;
      c = c1;
    }
  })
);

const dirs = {
  "<": [0, -1],
  ">": [0, 1],
  "v": [1, 0],
  "^": [-1, 0],
};
// remove the @
G[r][c] = ".";

while (instr.length > 0) {
  const dir = instr.shift();
  const nr = dirs[dir][0] + r;
  const nc = dirs[dir][1] + c;
  if (G[nr][nc] === ".") {
    r = nr;
    c = nc;
  } else if (G[nr][nc] === "O") {
    let br = nr;
    let bc = nc;
    while (G[br][bc] === "O") {
      br += dirs[dir][0];
      bc += dirs[dir][1];
    }
    if (G[br][bc] === ".") {
      G[br][bc] = "O";
      r = nr;
      c = nc;
      G[r][c] = ".";
    }
  }
}

// G.forEach((line) => p(line.join("")));
const sum = (a, b) => a + b;
const p1 = G.map((row, r) =>
  row.map((cell, c) => cell === "O" ? 100 * r + c : 0).reduce(sum)
).reduce(sum);
p({ p1 });
// G2.forEach(line => p(line.join('')))
G2.forEach((row, r1) =>
  row.forEach((cell, c1) => {
    if (cell === "@") {
      r = r1;
      c = c1;
    }
  })
);
// remove the @
G2[r][c] = ".";
// G2.forEach((line) => p(line.join("")));

let ctr = 0;
while (instr2.length > 0) {
  ctr++;
  //if (ctr > 111) break
  const dir = instr2.shift();
  const nr = dirs[dir][0] + r;
  const nc = dirs[dir][1] + c;
  // p({ctr, r, c, nr, nc, dir})
  if (G2[nr][nc] === ".") {
    r = nr;
    c = nc;
  } else if (G2[nr][nc] === "[" || G2[nr][nc] === "]") {
    let br = nr;
    let bc = nc;
    if (dir === "<" || dir === ">") {
      while (G2[br][bc] === "[" || G2[br][bc] === "]") {
        //br += dirs[dir][0];
        //br += dirs[dir][0];
        bc += dirs[dir][1];
        bc += dirs[dir][1];
      }
      if (G2[br][bc] === ".") {
        r = nr;
        c = nc;
        for (let bb = bc; bb !== nc; bb -= dirs[dir][1]) {
          //p({br, bb, oldc: G2[br][bb], newc: G2[br][bb - dirs[dir][1]]})
          G2[br][bb] = G2[br][bb - dirs[dir][1]];
        }
        G2[r][c] = ".";
        //G2.forEach((line) => p(line.join("")));
      }
    } else {
      const q = [];
      const visited = [];
      if (G2[br][bc] === "[") {
        q.push([br, bc]);
        q.push([br, bc + 1]);
      } else if (G2[br][bc] === "]") {
        q.push([br, bc]);
        q.push([br, bc - 1]);
      }
      let working = true;
      while (q.length > 0) {
        const [cr, cc] = q.shift();
        // p({cr, cc, cell: G2[cr][cc]})
        visited.push([cr, cc, G2[cr][cc]]);
        if (G2[cr + dirs[dir][0]][cc] === "#") {
          working = false;
          break;
        } else if (G2[cr + dirs[dir][0]][cc] === "[") {
          q.push([cr + dirs[dir][0], cc]);
          q.push([cr + dirs[dir][0], cc + 1]);
        } else if (G2[cr + dirs[dir][0]][cc] === "]") {
          q.push([cr + dirs[dir][0], cc]);
          q.push([cr + dirs[dir][0], cc - 1]);
        }
      }
      if (!working) continue;
      //p({dir, r, c, visited})
      const done = new Set();
      // G2.forEach((line) => p(line.join("")));
      // p()
      for (let i = visited.length - 1; i >= 0; i--) {
        const [cr, cc, cell] = visited[i];
        if (done.has(k(cr, cc))) continue;
        G2[cr + dirs[dir][0]][cc] = cell;
        G2[cr][cc] = ".";
        //p({cr, cc, oldc: G2[cr + dirs[dir][0]][cc], newc: cell})
        done.add(k(cr, cc));
      }
      r = nr;
      c = nc;
      /*if (G2[r][c] === '[') {
          G2[r][c] = '.'
          G2[r][c + 1] = '.'
        } else {
          G2[r][c] = '.'
          G2[r][c - 1] = '.'
        }*/
      // G2.forEach((line) => p(line.join("")));
    }
  }
  //G2.forEach((line) => p(line.join("")));
}
const p2 = G2.map((row, r) =>
  row.map((cell, c) => cell === "[" ? 100 * r + c : 0).reduce(sum)
).reduce(sum);
p({ p2 });
