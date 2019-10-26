import { readFileSync } from 'fs';
import genDiff from '../src/';

const fixPath = './__tests__/__fixtures__/';

const filePaths = {
  json: [fixPath + 'json/deep-before.json', fixPath + 'json/deep-after.json'],
  yaml: [fixPath + 'yaml/deep-before.yaml', fixPath + 'yaml/deep-after.yaml'],
  ini: [fixPath + 'ini/deep-before.ini', fixPath + 'ini/deep-after.ini'],
}

test.each([filePaths.json, filePaths.yaml, filePaths.ini])(
  'Simple format: test #%#',
  (firstPath, secondPath) => {
    const expected = readFileSync(fixPath + 'expacted/deepData.diff', 'utf8').trim();
    expect(genDiff(firstPath, secondPath, 'simple')).toBe(expected);
  },
);

test.each([filePaths.json, filePaths.yaml, filePaths.ini])(
  'Plain format: test #%#',
  (firstPath, secondPath) => {
    const expected = readFileSync(fixPath + 'expacted/deepData.plainFormat.diff', 'utf8').trim();
    expect(genDiff(firstPath, secondPath, 'plain')).toBe(expected);
  },
);

test.each([filePaths.json, filePaths.yaml, filePaths.ini])(
  'Json format: test #%#',
  (firstPath, secondPath) => {
    const expected = readFileSync(fixPath + 'expacted/deepData.jsonFormat.diff', 'utf8').trim();
    expect(genDiff(firstPath, secondPath, 'json')).toBe(expected);
  },
);
