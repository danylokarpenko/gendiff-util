import { readFileSync } from 'fs';
import _ from 'lodash';

const stats = {
  'same': ({name, oldValue}) => {
    return `     ${name}: ${oldValue}`;
  },
  'changed': ({name, oldValue, newValue}) => {
    return `   + ${name}: ${newValue}\n   - ${name}: ${oldValue}`;
  },
  'deleted': ({name, oldValue}) => {
    return `   - ${name}: ${oldValue}`;
  },
  'added': ({name, newValue}) => {
    return `   + ${name}: ${newValue}`;
  }
}

const parse = (obj1, obj2, key) => {
  let type;
  if (_.has(obj1, key) ^ _.has(obj2, key)) {
    type = _.has(obj1, key) ? 'deleted' : 'added';
  } else {
    type = obj1[key] === obj2[key] ? 'same' : 'changed';
  }
  return { type, name: key, oldValue: obj1[key], newValue: obj2[key]};
}

export default (pathToFile1, pathToFile2) => {
  const file1 = readFileSync(pathToFile1);
  const file2 = readFileSync(pathToFile2);

  const jsonBefore = JSON.parse(file1);
  const jsonAfter = JSON.parse(file2);

  const keySet = new Set(Object.keys(jsonBefore).concat(Object.keys(jsonAfter)));
  const keys = Array.from(keySet);

  const data = keys.map(key => {
    const parsedData = parse(jsonBefore, jsonAfter, key);
    return stats[parsedData.type](parsedData);
  });

  return `{\n${data.join('\n')}\n}`;
};
