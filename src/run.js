const readStdin = require('./readStdin');
const golfed = require('./golfed');

(async function() {
  const a = readStdin();
  const b = golfed();
  const results = await Promise.all([a, b]);

  if (results[0] === results[1]) {
    console.log('Success!');
    console.log(results)
  } else {
    throw new Error('Results are not equal')
  }
})()