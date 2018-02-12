# stdin-codegolf

> An example of code golfing a node script that reads from stdin - Used for a talk.

Shows an example of turning this simple module:

```js
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
```

into this glorious mess:

```js
module.exports=(s=process.stdin,o='')=>new Promise(r=>s.isTTY?r(o):s.on('data',d=>o+=d).on('end',a=>r(o)))
```

### Tests

We test that the two pieces of code are equivalent with some unit tests in `test.js`.

```sh
yarn test
```

And a run script that can be called from the command line (for manually testing cases not handled in the unit tests like running with no stdin)

```sh
# multiple lines
echo "Foo\nBar" | node ./run.js

# no stdin
node ./run.js
```