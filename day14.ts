const p = console.log;
const configs = Deno.readTextFileSync("14.in").trim().split("\n")
  .map((line) =>
    line.replace("p=", "").replace(" v=", ",").split(",").map(Number)
  );

const steps = 100;
// const xlen = 11
const xlen = 101;
// const ylen = 7
const ylen = 103;
const midx = Math.ceil(xlen / 2);
const midy = Math.ceil(ylen / 2);
const xmod = (number) => ((number % xlen) + xlen) % xlen;
const ymod = (number) => ((number % ylen) + ylen) % ylen;

const draw = (configs, p2) => {
  const G = [];
  for (let y = 0; y < ylen; y++) {
    const line = [];
    for (let x = 0; x < xlen; x++) {
      line.push(".");
    }
    G.push(line);
  }
  configs.forEach(([xx, yy]) =>
    G[yy][xx] = G[yy][xx] === "." ? "1" : "" + (Number(G[yy][xx]) + 1)
  );
  if (p2) {
    if (
      G.map((line) => line.join("")).some((line) =>
        line.search(/\d\d\d\d\d\d\d\d/) > -1
      )
    ) {
      p(G.map((line) => line.join("")).join("\n"));
      return true;
    }
  } else {
    // p(G.map((line) => line.join("")).join("\n"));
    p(
      "p1: ",
      G.slice(0, midy - 1).map((line) =>
        line.slice(0, midx - 1).filter((e) => e !== ".").map(Number).reduce(
          (a, b) => a + b,
          0,
        )
      ).reduce((a, b) => a + b) *
        G.slice(0, midy - 1).map((line) =>
          line.slice(midx).filter((e) => e !== ".").map(Number).reduce(
            (a, b) => a + b,
            0,
          )
        ).reduce((a, b) => a + b) *
        G.slice(midy).map((line) =>
          line.slice(0, midx - 1).filter((e) => e !== ".").map(Number).reduce(
            (a, b) => a + b,
            0,
          )
        ).reduce((a, b) => a + b) *
        G.slice(midy).map((line) =>
          line.slice(midx).filter((e) => e !== ".").map(Number).reduce(
            (a, b) => a + b,
            0,
          )
        ).reduce((a, b) => a + b),
    );
  }
};

// draw(configs, false);
p();
const after = configs.map((
  [x, y, vx, vy],
) => [xmod(x + vx * steps), ymod(y + vy * steps), vx, vy]);
draw(after, false);

for (let i = 1; i <= 100000; i++) {
  const after = configs.map((
    [x, y, vx, vy],
  ) => [xmod(x + vx * i), ymod(y + vy * i), vx, vy]);
  if (draw(after, true)) {
    p({ p2: i });
    break;
  }
}
