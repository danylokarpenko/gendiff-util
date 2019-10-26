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
  const pairs = keys.map(key => {
    if (typeof obj[key] === 'object') {
      return `${indicators.unchanged}${key}: ${stringifyObj(obj[key], level + 2)}`;
    };
    return `${indicators.unchanged}${key}: ${obj[key]}`;
  });
  return `{\n${makeIndent(level + 2)}${pairs.join(`\n${makeIndent(level + 2)}`)}\n${makeIndent(level + 1)}}`
};

const renders = {
  unchanged: (key, oldValue, newValue, level) => {
    return [`${makeIndent(level)}${indicators.unchanged}${key}: ${oldValue}`];
  },
  changed: (key, oldValue, newValue, level) => {
    return [`${makeIndent(level)}${indicators.added}${key}: ${newValue}`, `${makeIndent(level)}${indicators.deleted}${key}: ${oldValue}`];
  },
  deleted: (key, oldValue, newValue, level) => {
    return [`${makeIndent(level)}${indicators.deleted}${key}: ${oldValue}`];
  },
  added: (key, oldValue, newValue, level) => {
    return [`${makeIndent(level)}${indicators.added}${key}: ${newValue}`];
  },
  father: (key, oldValue, newValue, level, children) => {
    return [`${makeIndent(level)}${indicators.father}${key}: ${render(children, level + 2)}`];
  },
};

const render = (ast, level = 1) => {
  const differences = ast.reduce((acc, {key, type, oldValue, newValue, children}) => {

    if (_.isPlainObject(oldValue)) {
      oldValue = stringifyObj(oldValue, level);
    } else if (_.isPlainObject(newValue)) {
      newValue = stringifyObj(newValue, level);
    };

    return [...acc, ...renders[type](key, oldValue, newValue, level, children)];
  }, []);
  return `{\n${differences.join('\n')}\n${makeIndent(level - 1)}}`;
};

export default render;
