import _ from 'lodash';

const diff = [
  {
    check: (first, second, key) => {
      return _.has(first, key) && _.has(second, key) && first[key] === second[key];
    },
    make: (first, second, key) => {
      return { key, type: 'unchanged', values: { oldValue: first[key], newValue: second[key] } }
    }
  },
  {
    check: (first, second, key) => {
      return _.has(first, key) && _.has(second, key) && first[key] !== second[key];
    },
    make: (first, second, key) => {
      return { key, type: 'changed', values: { oldValue: first[key], newValue: second[key] } }
    }
  },
  {
    check: (first, second, key) => {
      return !_.has(first, key) && _.has(second, key);
    },
    make: (first, second, key) => {
      return { key, type: 'added', values: { oldValue: first[key], newValue: second[key] } }
    }
  },
  {
    check: (first, second, key) => {
      return _.has(first, key) && !_.has(second, key);
    },
    make: (first, second, key) => {
      return { key, type: 'deleted', values: { oldValue: first[key], newValue: second[key] } }
    }
  },
];

const buildAst = (data1, data2) => {
  const keySet = new Set(Object.keys(data1).concat(Object.keys(data2)));
  const keys = Array.from(keySet);

  const ast = keys.map(key => {
    if ( (typeof data1[key] === 'object' && data1[key] !== null) && (typeof data2[key] === 'object' && data2[key] !== null)) {
      return {key, type: 'unchanged', children: buildAst(data1[key], data2[key])}
    }
    return diff.find(method => method.check(data1, data2, key)).make(data1, data2, key);
  });
  return ast;
};

export default buildAst;
