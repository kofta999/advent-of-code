let engineCode = (await Bun.file("./day3.txt").text()).split("\n");
const lineLength = engineCode.at(0)?.length! + 2;
const symbolRegex = /[^a-zA-Z0-9_ .]/g;
let total = 0;

engineCode = fill(engineCode);

for (let i = 0; i < engineCode.length; i++) {
  console.log(engineCode[i].match(/\d+/g));
  const lineNum = engineCode[i].match(/\d+/g);
  let mark = false;
  for (let j = 0; j < lineLength!; j++) {
    if (/\d/.test(engineCode[i][j])) {
      if (check(i, j)) {
        mark = true;
      }
    } else if (/\d/.test(engineCode[i][j - 1])) {
      if (mark) {
        total += parseInt(lineNum?.at(0)!);
      }
      lineNum?.shift();
      mark = false;
    }
  }
}

function fill(engineCode: string[]) {
  const filler = ".".repeat(lineLength!);
  engineCode.push(filler);
  engineCode.unshift(filler);
  return engineCode.map((line, i) => {
    return "." + line + ".";
  });
}

function check(i: number, j: number) {
  if (
    symbolRegex.test(engineCode[i + 1][j]) ||
    symbolRegex.test(engineCode[i - 1][j]) ||
    symbolRegex.test(engineCode[i][j + 1]) ||
    symbolRegex.test(engineCode[i][j - 1]) ||
    symbolRegex.test(engineCode[i + 1][j + 1]) ||
    symbolRegex.test(engineCode[i - 1][j - 1]) ||
    symbolRegex.test(engineCode[i + 1][j - 1]) ||
    symbolRegex.test(engineCode[i - 1][j + 1])
  ) {
    return true;
  }
  return false;
}

console.log(total);
