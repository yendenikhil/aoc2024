const p = console.log;
const G = (await Deno.readTextFile("4.in")).trim().split("\n").map((line) =>
  line.split("")
);

let p1 = 0;
for (let r = 0; r < G.length; r++) {
  for (let c = 0; c < G[0].length; c++) {
    //p({r, c})
    if (r < G.length - 3) {
      //p('v')
      const vertical = G[r][c] + G[r + 1][c] + G[r + 2][c] + G[r + 3][c];
      if (vertical === "XMAS" || vertical === "SAMX") {
        //p('v+')
        p1 += 1;
      }
    }
    if (c < G[0].length - 3) {
      //p('h')
      const horizontal = G[r][c] + G[r][c + 1] + G[r][c + 2] + G[r][c + 3];
      if (horizontal === "XMAS" || horizontal === "SAMX") {
        //p('h+')
        p1 += 1;
      }
    }
    if (r < G.length - 3 && c < G[0].length - 3) {
      //p('d1')
      const dia1 = G[r][c] + G[r + 1][c + 1] + G[r + 2][c + 2] +
        G[r + 3][c + 3];
      if (dia1 === "XMAS" || dia1 === "SAMX") {
        //p('d1+')
        p1 += 1;
      }
    }
    if (r < G.length - 3 && c > 2) {
      //p('d2')
      const dia2 = G[r][c] + G[r + 1][c - 1] + G[r + 2][c - 2] +
        G[r + 3][c - 3];
      if (dia2 === "XMAS" || dia2 === "SAMX") {
        //p('d2+')
        p1 += 1;
      }
    }
  }
}
p({ p1 });

let p2 = 0;

for (let r = 0; r < G.length - 2; r++) {
  for (let c = 0; c < G[0].length - 2; c++) {
    const left = G[r][c] + G[r + 1][c + 1] + G[r + 2][c + 2];
    const right = G[r][c + 2] + G[r + 1][c + 1] + G[r + 2][c];
    if (
      (left === "MAS" || left == "SAM") && (right == "MAS" || right == "SAM")
    ) {
      p2 += 1;
    }
  }
}

p({ p2 });
