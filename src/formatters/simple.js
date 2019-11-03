import _ from 'lodash';

const indicators = {
  unchanged: '  ',
  deleted: '- ',
  added: '+ ',
  father: '  ',
};

const makeIndent = (lvl) => '  '.repeat(lvl);

const stringifyObj = (obj, level) => {
  const keys = Object.keys(obj);
  const pairs = keys.map((key) => {
    if (typeof obj[key] === 'object') {
      return `${indicators.unchanged}${key}: ${stringifyObj(obj[key], level + 2)}`;
    }
    return `${indicators.unchanged}${key}: ${obj[key]}`;
  });
  return `{\n${makeIndent(level + 2)}${pairs.join(`\n${makeIndent(level + 2)}`)}\n${makeIndent(level + 1)}}`;
};

const stringify = (value, level) => (_.isPlainObject(value) ? stringifyObj(value, level) : value);

const renders = {
  unchanged: (key, oldValue, newValue, level) => `${makeIndent(level)}${indicators.unchanged}${key}: ${oldValue}`,
  changed: (key, oldValue, newValue, level) => `${makeIndent(level)}${indicators.added}${key}: ${stringify(newValue, level)}\n${makeIndent(level)}${indicators.deleted}${key}: ${stringify(oldValue, level)}`,
  deleted: (key, oldValue, newValue, level) => `${makeIndent(level)}${indicators.deleted}${key}: ${stringify(oldValue, level)}`,
  added: (key, oldValue, newValue, level) => `${makeIndent(level)}${indicators.added}${key}: ${(stringify(newValue, level))}`,
  father: (key, oldValue, newValue, level, children) => `${makeIndent(level)}${indicators.father}${key}: ${children}`,
};

const render = (ast, level = 1) => {
  const differences = ast.map(({
    key, type, oldValue, newValue, children,
  }) => renders[type](key, oldValue, newValue, level, render(children || [], level + 2)));
  return `{\n${differences.join('\n')}\n${makeIndent(level - 1)}}`;
};

export default render;
