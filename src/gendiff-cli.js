import { readFileSync } from 'fs';
import _ from 'lodash';
import parse from './parsers';

//renderring
const actions = {
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

// diff process
const parseValue = (obj1, obj2, key) => {
  let type;
  if (_.has(obj1, key) ^ _.has(obj2, key)) {
    type = _.has(obj1, key) ? 'deleted' : 'added';
  } else {
    type = obj1[key] === obj2[key] ? 'same' : 'changed';
  }
  return { type, name: key, oldValue: obj1[key], newValue: obj2[key]};
}

export default (configPath1, configPath2) => {
  const data1 = parse(configPath1);
  const data2 = parse(configPath2);
  console.log(data1);
  console.log(true);
  const keySet = new Set(Object.keys(data1).concat(Object.keys(data2)));
  const keys = Array.from(keySet);

  const data = keys.map(key => {
    const parsedValue = parseValue(data1, data2, key);
    return actions[parsedValue.type](parsedValue);
  });

  return `{\n${data.join('\n')}\n}`;
};
