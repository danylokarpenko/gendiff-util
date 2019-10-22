const renderByType = {
  'changed' : (key, values) => {
    return `Property '${key}' was updated. From ${stringify(values.oldValue)} to ${stringify(values.newValue)}`;
  },
  'added' : (key, values) => {
    return `Property '${key}' was added with value: ${stringify(values.newValue)}`;
  },
  'deleted' : (key, values) => {
    return `Property '${key}' was removed`;
  },
}

const stringify = value => {
  if (typeof value === 'object') {
    return '[complex value]';
  } else {
    return `'${value}'`;
  }
}

const astToString = (data, root) => {
  const diff = data.reduce((acc, {key, type, values, children}) => {
    if (!values) {
      return root === undefined ?
        [...acc, astToString(children, key)] :
        [...acc, astToString(children, root + `.${key}`)];
    }
    if (type === 'unchanged') return acc;
    return root === undefined ?
      [...acc, renderByType[type](key, values)] :
      [...acc, renderByType[type](root + `.${key}`, values)];
  }, []);
  return `${diff.join(`\n`)}`;
}

export default astToString;
