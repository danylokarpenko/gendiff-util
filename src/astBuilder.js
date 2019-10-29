import _ from 'lodash';

const nodeBuilders = [
  {
    check: (first, second, key) => _.isPlainObject(first[key]) && _.isPlainObject(second[key]),
    make: (first, second, key, func) => ({ key, type: 'father', children: func(first[key], second[key]) }),
  },
  {
    check: (first, second, key) => !_.has(first, key),
    make: (first, second, key) => ({ key, type: 'added', newValue: second[key] }),
  },
  {
    check: (first, second, key) => !_.has(second, key),
    make: (first, second, key) => ({ key, type: 'deleted', oldValue: first[key] }),
  },
  {
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
    && first[key] !== second[key]),
    make: (first, second, key) => ({
      key, type: 'changed', oldValue: first[key], newValue: second[key],
    }),
  },
  {
    check: (first, second, key) => first[key] === second[key],
    make: (first, second, key) => ({
      key, type: 'unchanged', oldValue: first[key], newValue: second[key],
    }),
  },
];

const buildAst = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));

  const ast = keys.map((key) => nodeBuilders
    .find((builder) => builder.check(obj1, obj2, key))
    .make(obj1, obj2, key, buildAst));

  return ast;
};

export default buildAst;
