import test from 'ava';
import * as mockStdin from 'mock-stdin';

import readStdin from './src/readStdin';
import golfed from './src/golfed';

function setupTest(inputString) {
  const stdin = mockStdin.stdin();
  const promises = [readStdin(), golfed()];

  stdin.send(inputString).end();
  return Promise.all(promises);
}


/**
 * Note: We cant test the case where no stdin is passed in because mock-stdin does not allow faking the
 * isTTY flag. This needs to be tested with src/run.js 
 */

test('Simple string', async t => {
  const testStr = 'Foobar';
  const results = await setupTest(testStr);
  t.is(results[0], results[1]);
});

test('Simple string with newline', async t => {
  const testStr = 'Foobar\n';
  const results = await setupTest(testStr);
  t.is(results[0], results[1]);
});

test('Multiple lines', async t => {
  const testStr = 'Foo\nbar\n';
  const results = await setupTest(testStr);
  t.is(results[0], results[1]);
});

test('Emojis', async t => {
  const testStr = 'Foo bar\n🔥';
  const results = await setupTest(testStr);
  t.is(results[0], results[1]);
});

test('Empty string', async t => {
  const testStr = '';
  const results = await setupTest(testStr);
  t.is(results[0], results[1]);
});
