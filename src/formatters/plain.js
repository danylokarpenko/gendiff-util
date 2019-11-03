const isComplex = (value) => typeof value === 'object';

const stringifyValue = (value) => (isComplex(value) ? '[complex value]' : `'${value}'`);

const renders = {
  changed: (key, oldValue, newValue) => `Property '${key}' was updated. From ${stringifyValue(oldValue)} to ${stringifyValue(newValue)}`,
  added: (key, oldValue, newValue) => `Property '${key}' was added with value: ${stringifyValue(newValue)}`,
  deleted: (key) => `Property '${key}' was removed`,
  father: (key, oldValue, newValue, children) => children,
};

const render = (data, root) => {
  const differences = data.reduce((acc, {
    key, type, oldValue, newValue, children,
  }) => {
    if (type === 'unchanged') return acc;
    const newKey = root === undefined ? key : `${root}.${key}`;
    return [...acc, renders[type](newKey, oldValue, newValue, render(children || [], newKey))];
  }, []);
  return `${differences.join('\n')}`;
};

export default render;
