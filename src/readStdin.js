function readStdin() {
  const stdin = process.stdin;

  return new Promise((resolve) => {
    let output = '';

    if (stdin.isTTY) {
      resolve(output);
      return;
    }

    stdin.setEncoding('utf8');

    stdin.on('data', (data) => {
      output += data;
    });

    stdin.on('end', () => {
      resolve(output);
    });
  });
}
  
module.exports = readStdin;