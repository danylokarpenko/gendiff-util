import { readFileSync } from 'fs';
import { trim } from 'lodash';
import genDiff from '../src/';

const beforeJson = './__tests__/__fixtures__/json/flat-before.json';
const afterJson = './__tests__/__fixtures__/json/flat-after.json';

const beforeYaml = './__tests__/__fixtures__/yaml/flat-before.yaml';
const afterIniYaml = './__tests__/__fixtures__/yaml/flat-after.yaml';

const beforeIni = './__tests__/__fixtures__/ini/flat-before.ini';
const afterIni = '__tests__/__fixtures__/ini/flat-after.ini';


test.each([[beforeJson, afterJson], [beforeYaml, afterIniYaml], [beforeIni, afterIni]])(
  `Test %#: diff format`,
  (firstPath, secondPath) => {
    const expected = trim(readFileSync('./__tests__/__fixtures__/expacted/flatData.diff', 'utf8'));
    expect(genDiff(firstPath, secondPath, 'diff')).toBe(expected);
  },
);

test.each([[beforeJson, afterJson], [beforeYaml, afterIniYaml], [beforeIni, afterIni]])(
  `Test %#: plain format`,
  (firstPath, secondPath) => {
    const expected = trim(readFileSync('./__tests__/__fixtures__/expacted/flatData.plainFormat.diff', 'utf8'));
    expect(genDiff(firstPath, secondPath, 'plain')).toBe(expected);
  },
);

test.each([[beforeJson, afterJson], [beforeYaml, afterIniYaml], [beforeIni, afterIni]])(
  `Test %#: json format`,
  (firstPath, secondPath) => {
    const expected = trim(readFileSync('./__tests__/__fixtures__/expacted/flatData.jsonFormat.diff', 'utf8'));
    expect(genDiff(firstPath, secondPath, 'json')).toBe(expected);
  },
);
