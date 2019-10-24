const renders = {
  'changed' : (key, values) => {
    return `Property '${key}' was updated. From ${stringifyValue(values.oldValue)} to ${stringifyValue(values.newValue)}`;
  },
  'added' : (key, values) => {
    return `Property '${key}' was added with value: ${stringifyValue(values.newValue)}`;
  },
  'deleted' : (key, values) => {
    return `Property '${key}' was removed`;
  },
}

const isComplex = value => typeof value === 'object';

const stringifyValue = value => isComplex(value) ? '[complex value]' : `'${value}'`;

const render = (data, root) => {
  const differences = data.reduce((acc, {key, type, values, children}) => {
    if (children) {
      return root === undefined ?
        [...acc, render(children, key)] :
        [...acc, render(children, root + `.${key}`)];
    }
    if (type === 'unchanged') return acc;
    return root === undefined ?
      [...acc, renders[type](key, values)] :
      [...acc, renders[type](root + `.${key}`, values)];
  }, []);
  return `${differences.join(`\n`)}`;
}

export default render;
