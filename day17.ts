const p = console.log;
const raw = Deno.readTextFileSync("17.in").trim();
const R = raw.split("\n\n")[0].split("\n").map((line) =>
  line.replace(/.*: /, "")
).map(Number);
const instr = raw.split("\n")[4].replace("Program: ", "").split(",").map(
  Number,
);
p({ R, instr });
const init = R.slice();

const run = (R) => {
  const p1 = [];
  for (let i = 0; i < instr.length; i += 2) {
    const opcode = instr[i];
    let operand = instr[i + 1];
    if (operand > 6) p("ERROR");
    if (operand > 3) operand = R[operand - 4];
    switch (opcode) {
      case 0:
        R[0] = Math.floor(R[0] / Math.pow(2, operand));
        break;
      case 1:
        R[1] = R[1] ^ operand;
        break;
      case 2:
        R[1] = operand % 8;
        break;
      case 3:
        if (R[0] !== 0) {
          i = operand - 2;
        }
        break;
      case 4:
        R[1] = R[1] ^ R[2];
        break;
      case 5:
        p1.push(operand % 8);
        break;
      case 6:
        R[1] = Math.floor(R[0] / Math.pow(2, operand));
        break;
      case 7:
        R[2] = Math.floor(R[0] / Math.pow(2, operand));
        break;
      default:
        p("ERROR ERROR ERROR");
    }
  }
  return p1;
};
p(run(R).join(","));
p("---------");
for (let i = 40000000000000; i < 40001001000050; i++) {
  const r = init.slice();
  r[0] = i;
  const ans = run(r);
  //if (ans.length === instr.length)
  if (ans[0] === 2 && ans[1] === 4) { //&& ans[2] === 1 && ans[3] === 3 && ans[4] === 7 )
    p(i, ans.join(","));
  }
  // if (i % 1000000 === 0) p({i, ans: ans.length})
}
