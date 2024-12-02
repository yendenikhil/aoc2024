const p = console.log;
const lines = (await Deno.readTextFile("1.in")).trim().split("\n");
const arr1 = [];
const arr2 = [];
lines.map((line) => {
  return line.split("   ").map((a) => parseInt(a));
})
  .forEach(([a, b]) => {
    arr1.push(a);
    arr2.push(b);
  });
arr1.sort();
arr2.sort();
let p1 = 0;
for (let i = 0; i < arr1.length; i++) {
  p1 += Math.abs(arr1[i] - arr2[i]);
}
p({ p1 });

const m = new Map();
arr2.forEach((e) => {
  const v = m.get(e) ?? 0;
  m.set(e, v + 1);
});

const p2 = arr1.map((e) => e * (m.get(e) ?? 0)).reduce((a, b) => a + b);
p({ p2 });
