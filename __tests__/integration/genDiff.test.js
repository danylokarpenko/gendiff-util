import { readFileSync } from 'fs';
import { trim } from 'lodash';
import genDiff from '../../src/';


describe('json format', () => {
  const expacted = trim(readFileSync('./__tests__/__fixtures__/expacted/flatJson.diff', 'utf8'));
  test('Plain json file', () => {
    const data = genDiff(
      './__tests__/__fixtures__/compareFiles/before.json',
      './__tests__/__fixtures__/compareFiles/after.json'
    );
    expect(data).toBe(expacted);
  });

  test('Must be wrong', () => {
    const data = genDiff(
      './__tests__/__fixtures__/compareFiles/before.json',
      './__tests__/__fixtures__/compareFiles/before.json'
    );
    expect(data).not.toBe(expacted);
  });
});

describe('yaml format', () => {
  const expacted = trim(readFileSync('./__tests__/__fixtures__/expacted/flatJson.diff', 'utf8'));
  test('Plain yaml file', () => {
    const data = genDiff(
      './__tests__/__fixtures__/compareFiles/before.yaml',
      './__tests__/__fixtures__/compareFiles/after.yaml'
    );
    expect(data).toBe(expacted);
  });
})
