import _ from 'lodash';

const nodeBuilders = [
  {
    check: (first, second, key) => _.isPlainObject(first[key]) && _.isPlainObject(second[key]),
    make: (first, second, key) => {
      return { key, type: 'father', children: buildAst(first[key], second[key]) }
    },
  },
  {
    check: (first, second, key) => !_.has(first, key),
    make: (first, second, key) => {
      return { key, type: 'added', newValue: second[key] }
    },
  },
  {
    check: (first, second, key) => !_.has(second, key),
    make: (first, second, key) => {
      return { key, type: 'deleted', oldValue: first[key] };
    },
  },
  {
    check: (first, second, key) => _.has(first, key) && _.has(second, key) && first[key] !== second[key],
    make: (first, second, key) => {
      return { key, type: 'changed', oldValue: first[key], newValue: second[key] };
    },
  },
  {
    check: (first, second, key) => first[key] === second[key],
    make: (first, second, key) => {
      return { key, type: 'unchanged', oldValue: first[key], newValue: second[key] };
    },
  },
];

const buildAst = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));

  const ast = keys.map(key => nodeBuilders.find(builder => builder.check(obj1, obj2, key)).make(obj1, obj2, key));

  return ast;
};

export default buildAst;
