import { readFileSync } from 'fs';
import genDiff from '../src';

const filePaths = {
  json: [`${__dirname}/__fixtures__/json/deep-before.json`, `${__dirname}/__fixtures__/json/deep-after.json`],
  yaml: [`${__dirname}/__fixtures__/yaml/deep-before.yaml`, `${__dirname}/__fixtures__/yaml/deep-after.yaml`],
  ini: [`${__dirname}/__fixtures__/ini/deep-before.ini`, `${__dirname}/__fixtures__/ini/deep-after.ini`],
};

test.each([filePaths.json, filePaths.yaml, filePaths.ini])(
  'Simple format: test #%#',
  (firstPath, secondPath) => {
    const expected = readFileSync(`${__dirname}/__fixtures__/expacted/deepData.diff`, 'utf8').trim();
    expect(genDiff(firstPath, secondPath, 'simple')).toBe(expected);
  },
);

test.each([filePaths.json, filePaths.yaml, filePaths.ini])(
  'Plain format: test #%#',
  (firstPath, secondPath) => {
    const expected = readFileSync(`${__dirname}/__fixtures__/expacted/deepData.plainFormat.diff`, 'utf8').trim();
    expect(genDiff(firstPath, secondPath, 'plain')).toBe(expected);
  },
);

test.each([filePaths.json, filePaths.yaml, filePaths.ini])(
  'Json format: test #%#',
  (firstPath, secondPath) => {
    const expected = readFileSync(`${__dirname}/__fixtures__/expacted/deepData.jsonFormat.diff`, 'utf8').trim();
    expect(genDiff(firstPath, secondPath, 'json')).toBe(expected);
  },
);
