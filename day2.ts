const p = console.log;
const reports = (await Deno.readTextFile("2.in")).trim().split("\n")
  .map((line) => line.split(" ").map((e) => parseInt(e)));

const isSafe = (r) => {
  const up = r[1] - r[0] > 0 ? 1 : -1;
  for (let i = 0; i < r.length - 1; i++) {
    const diff = r[i + 1] - r[i];
    if ((diff * up) < 0 || Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return [i, i + 1];
    }
  }
  return [];
};

const p1 = reports //.slice(999)
  .map((r) => isSafe(r).length == 0 ? 1 : 0)
  .reduce((a, b) => a + b);
p({ p1 });

const p2 = reports //.slice(999)
  .map((r) => {
    const ans1 = isSafe(r);
    if (ans1.length == 0) {
      return 1;
    } else {
      const r0 = r.slice();
      if (ans1[0] !== 0) {
        r0.splice(ans1[0] - 1, 1);
      }
      const r1 = r.slice();
      r1.splice(ans1[0], 1);
      const r2 = r.slice();
      r2.splice(ans1[1], 1);
      //p({ans1, r1, r2})
      if (
        (ans1[0] !== 0 && isSafe(r0).length == 0) || isSafe(r1).length == 0 ||
        isSafe(r2).length == 0
      ) {
        return 1;
      } else {
        //p('no match')
        return 0;
      }
    }
  }).reduce((a, b) => a + b);
p({ p2 });
