import genDiff from '../src/genDiff';

test('genDiff', () => {
  expect(genDiff('/home/danylo/Documents/jsonFiles/jsonBefore.json', '/home/danylo/Documents/jsonFiles/jsonAfter.json')).toBe('{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false\n}');
})
