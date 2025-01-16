const p = console.log;
const raw = Deno.readTextFileSync("19.in").trim().split("\n\n");
const I = raw[0].split(", ");
const IS = new Set(I);
const P = raw[1].split("\n");
const lens = [...new Set(I.map((e) => e.length))];

const memo = new Map();
const count = (pattern) => {
  if (pattern.length === 0) return 1;
  if (memo.has(pattern)) return memo.get(pattern);
  let ans = 0;
  for (const l of lens) {
    if (l <= pattern.length && IS.has(pattern.substring(0, l))) {
      ans += count(pattern.substring(l));
    }
  }
  memo.set(pattern, ans);
  return ans;
};

let p1 = 0;
let p2 = 0;
for (const patt of P) {
  const num = count(patt);
  p2 += num;
  if (num > 0) p1++;
}
p({ p1 });
p({ p2 });
