let engineCode = (await Bun.file("./day3.txt").text()).split("\n");
let total = 0;

interface InumXY {
  num: number;
  xy: number[];
}

engineCode = fill(engineCode);
const xys: InumXY[] = [];
let gearXY: number[];

for (let i = 0; i < engineCode.length; i++) {
  const lineNum = engineCode[i].match(/\d+/g);
  let mark = false;
  console.log(lineNum);
  const lineLength = engineCode[i].length;
  for (let j = 0; j < lineLength!; j++) {
    if (/\d/.test(engineCode[i][j])) {
      if (check(i, j).length > 0) {
        gearXY = check(i, j);
        mark = true;
      }
    } else if (/\d/.test(engineCode[i][j - 1])) {
      if (mark) {
        xys.push({ num: parseInt(lineNum?.at(0)!), xy: gearXY! });
      }
      lineNum?.shift();
      mark = false;
    }
  }
}

console.log(xys);

let map = new Map<string, number[]>();

xys.forEach((xy) => {
  let key = xy.xy.join(",");
  if (map.has(key)) {
    map.get(key)!.push(xy.num);
  } else {
    map.set(key, [xy.num]);
  }
});

console.log(map);

map.forEach((v) => {
  if (v.length > 1) {
    total += v.reduce((prev, curr) => prev * curr, 1);
  }
});

function fill(engineCode: string[]) {
  const filler = ".".repeat(engineCode.at(0)?.length! + 2);
  engineCode.push(filler);
  engineCode.unshift(filler);
  return engineCode.map((line, i) => {
    return "." + line + ".";
  });
}

function check(i: number, j: number) {
  if (/\*/g.test(engineCode[i + 1][j])) return [i + 1, j];
  if (/\*/g.test(engineCode[i - 1][j])) return [i - 1, j];
  if (/\*/g.test(engineCode[i][j + 1])) return [i, j + 1];
  if (/\*/g.test(engineCode[i][j - 1])) return [i, j - 1];
  if (/\*/g.test(engineCode[i + 1][j + 1])) return [i + 1, j + 1];
  if (/\*/g.test(engineCode[i - 1][j - 1])) return [i - 1, j - 1];
  if (/\*/g.test(engineCode[i + 1][j - 1])) return [i + 1, j - 1];
  if (/\*/g.test(engineCode[i - 1][j + 1])) return [i - 1, j + 1];

  return [];
}

console.log(total);
