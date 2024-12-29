const p = console.log;
const stones =
  // "0 1 10 99 999"
  // "125 17"
  "1950139 0 3 837 6116 18472 228700 45"
    // "0"
    .split(" ").map(Number);
// p({stones})

const k = (stone, blinks) => JSON.stringify([stone, blinks]);
const memo = new Map();

const count = (stone, blinks) => {
  if (blinks === 0) {
    return 1;
  }
  if (memo.has(k(stone, blinks))) {
    return memo.get(k(stone, blinks));
  }
  if (stone === 0) {
    const val = count(1, blinks - 1);
    memo.set(k(stone, blinks), val);
    //p({stone, blinks, val})
    return val;
  }
  const t = stone.toString();
  if (t.length % 2 === 0) {
    const left = Number(t.substring(0, t.length / 2));
    const right = Number(t.substring(t.length / 2));
    const val = count(left, blinks - 1) + count(right, blinks - 1);
    //p({stone, blinks, val})
    memo.set(k(stone, blinks), val);
    return val;
  }
  const val = count(stone * 2024, blinks - 1);
  memo.set(k(stone, blinks), val);
  // p({stone, blinks, val})
  return val;
};

const p1 = stones.map((e) => count(e, 25)).reduce((a, b) => a + b);
p({ p1 });
const p2 = stones.map((e) => count(e, 75)).reduce((a, b) => a + b);
p({ p2 });
