const data = await Bun.file("./day1.txt").text();
const lines = data.split("\n");
const numbers: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

let ans = 0;
const regex = /(?=(one|two|three|four|five|six|seven|eight|nine))|\d/gi;
// console.log(regex);

lines.forEach((line, i) => {
  const matches = Array.from(line.matchAll(regex), (v) =>
    v[1] ? numbers[v[1]] : v[0]
  );
  console.log(matches);
  const num = parseInt(matches.at(0)! + matches.at(-1)!);
  console.log({ index: i + 1, num, type: typeof num });
  ans += num;
});
console.log(ans);
