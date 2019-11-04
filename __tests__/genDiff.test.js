import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src';

const formats = ['json', 'yaml', 'ini'];

const getFixPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

test.each(formats)(
  'Simple format: test #%#',
  (format) => {
    const beforeFilePath = getFixPath(`before.${format}`);
    const afterFilePAth = getFixPath(`after.${format}`);

    const actual = genDiff(beforeFilePath, afterFilePAth, 'simple');
    const expected = readFileSync(getFixPath('simpleResult.diff'), 'utf8');
    expect(actual).toBe(expected.trim());
  },
);

test.each(formats)(
  'Plain format: test #%#',
  (format) => {
    const beforeFilePath = getFixPath(`before.${format}`);
    const afterFilePAth = getFixPath(`after.${format}`);

    const actual = genDiff(beforeFilePath, afterFilePAth, 'plain');
    const expected = readFileSync(getFixPath('plainResult.diff'), 'utf8');
    expect(actual).toBe(expected.trim());
  },
);

test.each(formats)(
  'Json format: test #%#',
  (format) => {
    const beforeFilePath = getFixPath(`before.${format}`);
    const afterFilePAth = getFixPath(`after.${format}`);

    const actual = genDiff(beforeFilePath, afterFilePAth, 'json');
    const expected = readFileSync(getFixPath('jsonResult.diff'), 'utf8');
    expect(actual).toBe(expected.trim());
  },
);
