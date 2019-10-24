import _ from 'lodash';

const nodeBuilders = [
  {
    check: (first, second, key) => {
      return !_.has(first, key);
    },
    make: (first, second, key) => {
      return { key, type: 'added', values: { newValue: second[key] } }
    }
  },
  {
    check: (first, second, key) => {
      return !_.has(second, key);
    },
    make: (first, second, key) => {
      return { key, type: 'deleted', values: { oldValue: first[key]} }
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
      return first[key] === second[key];
    },
    make: (first, second, key) => {
      return { key, type: 'unchanged', values: { oldValue: first[key], newValue: second[key] } }
    }
  },
];

const buildAst = (obj1, obj2) => {
  const keys = Object.keys({...obj1, ...obj2});

  const ast = keys.map(key => {
    if ( _.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key]) ) {
      return { key, type: 'unchanged', children: buildAst(obj1[key], obj2[key]) }
    }
    return nodeBuilders.find(method => method.check(obj1, obj2, key)).make(obj1, obj2, key);
  });
  return ast;
};

export default buildAst;
