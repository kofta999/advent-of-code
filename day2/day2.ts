// 12 red, 13 green, 14 blue
// game doesn't count when:
// total number of cubes per time exceeds 39
// red/blue/green cubes are more than 12/13/14
// otherwise add the ID to ans

const games = (await Bun.file("./day2.txt").text()).split("\n");
let ans = 0;

games.forEach((g) => {
  const [gameId, game] = g.split(":");
  let [maxRed, maxGreen, maxBlue] = [0, 0, 0];

  game.split(";").forEach((round) => {
    const colors = round.split(",").map((c) => c.trim());
    console.log(colors);
    colors.forEach((color) => {
      const colorValue = parseInt(color.split(" ")[0]!);
      if (color.match(/red$/gi)) {
        maxRed = Math.max(maxRed, colorValue);
      } else if (color.match(/green$/gi)) {
        maxGreen = Math.max(maxGreen, colorValue);
      } else if (color.match(/blue$/gi)) {
        maxBlue = Math.max(maxBlue, colorValue);
      }
    });
  });

  ans += maxRed * maxGreen * maxBlue;
});

console.log(ans);

// Day 2 Part 1
// games.forEach((g) => {
//   const [gameId, game] = g.split(":");
//   let validGame = true;
//   game.split(";").forEach((round) => {
//     const colors = round.split(",").map((c) => c.trim());
//     console.log(colors);
//     let totalCubes = 0;
//     colors.forEach((color) => {
//       const colorValue = parseInt(color.split(" ")[0]!);
//       console.log(colorValue);
//       if (
//         (color.match(/red$/gi) && colorValue <= 12) ||
//         (color.match(/green$/gi) && colorValue <= 13) ||
//         (color.match(/blue$/gi) && colorValue <= 14)
//       ) {
//         console.log("here");
//         totalCubes += colorValue;
//       } else {
//         validGame = false
//       }
//     });
//     if (totalCubes > 39) {
//       validGame = false;
//     }
//   });
//   if (validGame) {
//     ans += parseInt(gameId.split(" ").at(1)!);
//   }
// });
