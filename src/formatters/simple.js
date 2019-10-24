import _ from 'lodash';

const indicators = {
  'unchanged': '  ',
  'deleted': '- ',
  'added': '+ ',
}

const makeIndent = lvl => '  '.repeat(lvl);

const stringifyObj = (obj, level) => {
  const keys = Object.keys(obj);
  const pairs = keys.map(key => {
    if (typeof obj[key] === 'object') {
      return `${indicators['unchanged']}${key}: ${stringifyObj(obj[key], level + 2)}`;
    }
    return `${indicators['unchanged']}${key}: ${obj[key]}`;
  })
  return `{\n${makeIndent(level + 2)}${pairs.join(`\n${makeIndent(level + 2)}`)}\n${makeIndent(level + 1)}}`
}

const renders = {
  'unchanged': (key, values, level) => {
    return [`${makeIndent(level)}${indicators.unchanged}${key}: ${values.oldValue}`];
  },
  'changed': (key, values, level) => {
    return [`${makeIndent(level)}${indicators.added}${key}: ${values.newValue}`, `${makeIndent(level)}${indicators.deleted}${key}: ${values.oldValue}`];
  },
  'deleted': (key, values, level) => {
    return [`${makeIndent(level)}${indicators.deleted}${key}: ${values.oldValue}`];
  },
  'added': (key, values, level) => {
    return [`${makeIndent(level)}${indicators.added}${key}: ${values.newValue}`];
  }
}

const render = (ast, level = 1) => {
  const differences = ast.reduce((acc, {key, type, values, children}) => {
    if (children) {
      const processedValues = { oldValue: render(children, level + 2) };
      return [...acc, ...renders[type](key, processedValues, level)];
    }
    if ( _.isPlainObject(values.oldValue) ) {
      values.oldValue = stringifyObj(values.oldValue, level);
    } else if ( _.isPlainObject(values.newValue) ) {
      values.newValue = stringifyObj(values.newValue, level);
    }
    return [...acc, ...renders[type](key, values, level)];
  }, []);
  return `{\n${differences.join(`\n`)}\n${makeIndent(level - 1)}}`;
}

export default render;
