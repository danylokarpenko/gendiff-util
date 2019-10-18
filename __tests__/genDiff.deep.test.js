import { readFileSync } from 'fs';
import { trim } from 'lodash';
import genDiff from '../src/';
import path from 'path';

const beforeJson = './__tests__/__fixtures__/json/deep-before.json';
const afterJson = './__tests__/__fixtures__/json/deep-after.json';

const beforeYaml = './__tests__/__fixtures__/yaml/deep-before.yaml';
const afterIniYaml = './__tests__/__fixtures__/yaml/deep-after.yaml';

const beforeIni = './__tests__/__fixtures__/ini/deep-before.ini';
const afterIni = '__tests__/__fixtures__/ini/deep-after.ini';

const expected = trim(readFileSync('./__tests__/__fixtures__/expacted/deepData.diff', 'utf8'));

test.each([[beforeJson, afterJson, expected], [beforeYaml, afterIniYaml, expected], [beforeIni, afterIni, expected]])(
  'Test %#: deep data',
  (firstPath, secondPath, expected) => {
    expect(genDiff(firstPath, secondPath)).toBe(expected);
  },
);
