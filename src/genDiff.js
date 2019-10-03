// const fs = require('fs');
// var _ = require('lodash');
import fs from 'fs';
import _ from 'lodash';

const genDiff = (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1);
  const file2 = fs.readFileSync(pathToFile2);

  const jsonBefore = JSON.parse(file1);
  const jsonAfter = JSON.parse(file2);

  const arrayOfStrings1 = Object.keys(jsonBefore).reduce((acc, key) => {
    if (_.has(jsonAfter, key)) {
      return jsonBefore[key] === jsonAfter[key] ?
        [...acc, [' ', `${key}: ${jsonBefore[key]}`]] :
        [...acc, ['+', `${key}: ${jsonAfter[key]}`], ['-', `${key}: ${jsonBefore[key]}`]];
    } else {
      return [...acc, ['-', `${key}: ${jsonBefore[key]}`]];
    }
  }, []);

  const arrayOfStrings2 = Object.keys(jsonAfter).reduce((acc, key) => {
    if (!_.has(jsonBefore, key)) {
      return [...acc, ['+', `${key}: ${jsonAfter[key]}`]];
    } else return acc;
  }, []);

  const result = `{\n${arrayOfStrings1.concat(arrayOfStrings2).map(current => `   ${current.join(' ')}`).join('\n')}\n}`;
  return result;
}

export default genDiff;
