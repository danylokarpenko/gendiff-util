import genDiff from '../src/genDiff';

test('genDiff', () => {
  expect(
    genDiff(
      '/home/danylo/Documents/jsonFiles/before.json',
      '/home/danylo/Documents/jsonFiles/after.json'
    )
  )
  .toBe({})
});
