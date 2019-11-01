import { readFileSync } from 'fs';
import genDiff from '../src';

const filePaths = {
  json: [`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`],
  yaml: [`${__dirname}/__fixtures__/before.yaml`, `${__dirname}/__fixtures__/after.yaml`],
  ini: [`${__dirname}/__fixtures__/before.ini`, `${__dirname}/__fixtures__/after.ini`],
};

test.each([filePaths.json, filePaths.yaml, filePaths.ini])(
  'Simple format: test #%#',
  (firstPath, secondPath) => {
    const expected = readFileSync(`${__dirname}/__fixtures__/simpleFormat.diff`, 'utf8').trim();
    expect(genDiff(firstPath, secondPath, 'simple')).toBe(expected);
  },
);

test.each([filePaths.json, filePaths.yaml, filePaths.ini])(
  'Plain format: test #%#',
  (firstPath, secondPath) => {
    const expected = readFileSync(`${__dirname}/__fixtures__/plainFormat.diff`, 'utf8').trim();
    expect(genDiff(firstPath, secondPath, 'plain')).toBe(expected);
  },
);

test.each([filePaths.json, filePaths.yaml, filePaths.ini])(
  'Json format: test #%#',
  (firstPath, secondPath) => {
    const expected = readFileSync(`${__dirname}/__fixtures__/jsonFormat.diff`, 'utf8').trim();
    expect(genDiff(firstPath, secondPath, 'json')).toBe(expected);
  },
);
