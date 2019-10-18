import { readFileSync } from 'fs';
import { trim } from 'lodash';
import genDiff from '../src/';
import path from 'path';

const beforeJson = './__tests__/__fixtures__/json/flat-before.json';
const afterJson = './__tests__/__fixtures__/json/flat-after.json';

const beforeYaml = './__tests__/__fixtures__/yaml/flat-before.yaml';
const afterIniYaml = './__tests__/__fixtures__/yaml/flat-after.yaml';

const beforeIni = './__tests__/__fixtures__/ini/flat-before.ini';
const afterIni = '__tests__/__fixtures__/ini/flat-after.ini';

const expected = trim(readFileSync('./__tests__/__fixtures__/expacted/flatData.diff', 'utf8'));

test.each([[beforeJson, afterJson, expected], [beforeYaml, afterIniYaml, expected], [beforeIni, afterIni, expected]])(
  `Test %#: flat data`,
  (firstPath, secondPath, expected) => {
    expect(genDiff(firstPath, secondPath)).toBe(expected);
  },
);
