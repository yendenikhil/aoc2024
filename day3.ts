const p = console.log;
const re = /mul\(\d{1,3},\d{1,3}\)/g;
const raw = (await Deno.readTextFile("3.in")).trim();
const terms = [];
let t = re.exec(raw);
while (t) {
  const a = t[0].replace("mul(", "").replace(")", "").split(",").map((e) =>
    parseInt(e)
  );
  terms.push(a);
  t = re.exec(raw);
}

const p1 = terms.map(([a, b]) => a * b).reduce((a, b) => a + b);
p({ p1 });

const re2 = /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g;
let t2 = re2.exec(raw);
let d = true;
const terms2 = [];
while (t2) {
  if (t2[0] === "do()") {
    d = true;
  } else if (t2[0] == "don't()") {
    d = false;
  } else {
    if (d) {
      const a = t2[0].replace("mul(", "").replace(")", "").split(",").map((e) =>
        parseInt(e)
      );
      terms2.push(a);
    }
  }
  t2 = re2.exec(raw);
}
const p2 = terms2.map(([a, b]) => a * b).reduce((a, b) => a + b);
p({ p2 });
