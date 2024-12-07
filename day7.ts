const p = console.log;
const lines = (await Deno.readTextFile("7.in")).trim().split("\n")
  .map((line) => line.split(": "))
  .map((
    [ans, terms],
  ) => [parseInt(ans), ...terms.split(" ").map((e) => parseInt(e))]);

const p1 = lines.map(([ans, ...terms]) => {
  let results = [0];
  terms.forEach((t) => {
    results = results.map((r) => [r + t, r * t]).flat();
  });
  if (results.includes(ans)) {
    return ans;
  } else {
    return 0;
  }
}).reduce((a, b) => a + b);
p({ p1 });

const p2 = lines.map(([ans, ...terms]) => {
  let results = [0];
  terms.forEach((t) => {
    results = results.map((r) => [r + t, r * t, parseInt("" + r + t)]).flat();
  });
  if (results.includes(ans)) {
    return ans;
  } else {
    return 0;
  }
}).reduce((a, b) => a + b);
p({ p2 });
