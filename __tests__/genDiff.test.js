import genDiff from '../src/';

test('genDiff', () => {
  expect(
    genDiff(
      '/home/danylo/Documents/jsonFiles/before.json',
      '/home/danylo/Documents/jsonFiles/after.json'
    )
  )
  .toBe({})
});
