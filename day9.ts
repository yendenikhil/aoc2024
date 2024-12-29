const p = console.log;
const raw = Deno.readTextFileSync("9.in").trim();
// const raw = '2333133121414131402'
// p('00...111...2...333.44.5555.6666.777.888899')
// p('0099811188827773336446555566')

const blocks = [];
for (let i = 0; i < raw.length; i += 2) {
  const files = Number(raw[i]);
  const blanks = i === raw.length - 1 ? 0 : Number(raw[i + 1]);
  const id = i / 2;
  for (let j = 0; j < files; j++) {
    blocks.push(id);
  }
  for (let j = 0; j < blanks; j++) {
    blocks.push(-1);
  }
}
const b2 = blocks.slice();
let i = 0;
while (blocks.includes(-1)) {
  // if (i % 1000 === 0 ) p({i, l: blocks.length})
  while (blocks[blocks.length - 1] === -1) {
    // if (i % 1000 === 0 ) p({i, l: blocks.length})
    blocks.pop();
  }
  while (blocks.includes(-1) && blocks[i] !== -1) {
    // if (i % 1000 === 0 ) p({i, l: blocks.length})
    i++;
  }
  if (blocks[i] === -1) {
    blocks[i] = blocks.pop();
    i++;
  }
}
const p1 = blocks.map((v, i) => v * i).reduce((a, b) => a + b);
p({ p1 });

let max = b2.length - 1;
let min = max;
let repl = b2[max];
while (repl > 0) {
  while (b2[min - 1] === b2[max]) {
    min--;
  }
  // p({min, max, b: b2[max]})
  for (i = 0; i < min; i++) {
    if (b2[i] !== -1) continue;
    let j = i;
    for (; j < max; j++) {
      if (b2[j + 1] !== -1) {
        break;
      }
    }
    if ((j - i) >= (max - min)) {
      //p({i, j, b: b2[i]})
      for (let k = 0; k <= (max - min); k++) {
        b2[i + k] = b2[max];
        b2[min + k] = -1;
      }
      break;
    }
  }
  // p({min, max, b: b2[max]})
  max = min - 1;
  repl--;
  while (b2[max] !== repl) {
    max--;
  }
  min = max;
  //p(b2.map(e => e === -1 ? '.':''+e ).join(''))
}
// p('00992111777.44.333....5555.6666.....8888..')
// p(b2.map(e => e === -1 ? '.':''+e ).join(''))
const p2 = b2.map((e) => e === -1 ? 0 : e).map((v, i) => v * i).reduce((a, b) =>
  a + b
);
p({ p2 });
