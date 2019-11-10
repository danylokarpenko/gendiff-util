const isComplex = (value) => typeof value === 'object';

const stringifyValue = (value) => (isComplex(value) ? '[complex value]' : `'${value}'`);

const renders = {
  changed: (key, oldValue, newValue) => `Property '${key}' was updated. From ${stringifyValue(oldValue)} to ${stringifyValue(newValue)}`,
  added: (key, oldValue, newValue) => `Property '${key}' was added with value: ${stringifyValue(newValue)}`,
  deleted: (key) => `Property '${key}' was removed`,
  father: (key, oldValue, newValue, children, processChildren) => processChildren(children, key),
};

const render = (ast, root) => {
  const differences = ast.filter(({ type }) => type !== 'unchanged').map(({
    key, type, oldValue, newValue, children,
  }) => {
    const newKey = root === undefined ? key : `${root}.${key}`;
    return renders[type](newKey, oldValue, newValue, children, render);
  });
  return `${differences.join('\n')}`;
};

export default render;
