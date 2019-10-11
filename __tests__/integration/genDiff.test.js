import { readFileSync } from 'fs';
import { trim } from 'lodash';
import genDiff from '../../src/';
import path from 'path';

const beforeJson = './__tests__/__fixtures__/compareFiles/before.json';
const afterJson = './__tests__/__fixtures__/compareFiles/after.json';

const beforeYaml = './__tests__/__fixtures__/compareFiles/before.yaml';
const afterIniYaml = './__tests__/__fixtures__/compareFiles/after.yaml';

const beforeIni = './__tests__/__fixtures__/compareFiles/before.ini';
const afterIni = './__tests__/__fixtures__/compareFiles/after.ini';

const expected = trim(readFileSync('./__tests__/__fixtures__/expacted/flatJson.diff', 'utf8'));

test.each([[beforeJson, afterJson, expected], [beforeYaml, afterIniYaml, expected], [beforeIni, afterIni, expected]])(
  `Test %#: different formats`,
  (firstPath, secondPath, expected) => {
    expect(genDiff(firstPath, secondPath)).toBe(expected);
  },
);
