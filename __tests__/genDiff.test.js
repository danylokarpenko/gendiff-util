import { readFileSync } from 'fs';
import { trim } from 'lodash';
import genDiff from '../src/';

describe('genDiff plain', () => {
  const expacted = trim(readFileSync('./__tests__/__fixtures__/expacted/flatJson.diff', 'utf8'));
  test('Must compare json', () => {
    const data = genDiff(
      './__tests__/__fixtures__/received/before.json',
      './__tests__/__fixtures__/received/after.json'
    );
    expect(data).toBe(expacted);
  });
  test('Must be wrong', () => {
    const data = genDiff(
      './__tests__/__fixtures__/received/before.json',
      './__tests__/__fixtures__/received/before.json'
    );
    expect(data).not.toBe(expacted);
  })
})
