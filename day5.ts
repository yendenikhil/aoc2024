const p = console.log;
const [instrraw, pagesraw] = (await Deno.readTextFile("5.in")).trim().split(
  "\n\n",
).map((block) => block.split("\n"));
const instr = instrraw.map((line) => line.split("|").map((e) => parseInt(e)));
const pages = pagesraw.map((line) => line.split(",").map((e) => parseInt(e)));

let p1 = 0;
let p2 = 0;
pages
  .forEach((arr) => {
    const mid = arr[(arr.length - 1) / 2];
    const visited = new Set();
    const q = arr.slice();
    let failed = false;
    while (q.length > 0) {
      const curr = q.shift();
      failed = failed ||
        instr.some(([a, b]) => b === curr && q.includes(a) && !visited.has(a));
      // p({curr, visited, failed})
      visited.add(curr);
    }
    if (failed) {
      let corr = arr.slice();
      let f = true;
      while (f) {
        let cf = false;
        const visited2 = new Set();
        for (let i = 0; i < corr.length; i++) {
          const c2 = corr[i];
          const finstr = instr.filter(([a, b]) =>
            b === c2 && corr.slice(i + 1).includes(a) && !visited2.has(a)
          ).map(([a, b]) => a);
          if (finstr.length > 0) {
            cf = true;
            corr = corr.filter((e) => !finstr.includes(e));
            corr.splice(i, 0, ...finstr);
            // p({corr})
            break;
          }
          visited2.add(c2);
        }
        f = cf;
      }
      p2 += corr[(corr.length - 1) / 2];
      //p({arr, corr})
    } else {
      p1 += mid;
    }
  });

p({ p1 });
p({ p2 });
