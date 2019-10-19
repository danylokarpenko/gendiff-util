import _ from 'lodash';

const indicators = {
  'unchanged': '  ',
  'deleted': '- ',
  'added': '+ ',
}

const makeIndent = (indent, times) => indent.repeat(times);

const objToStr = (obj, level) => {
  const keys = Object.keys(obj);
  const arrOfPairsStr = keys.map(key => {
    if (typeof obj[key] === 'object') {
      return `${indicators['unchanged']}${key}: ${objToStr(obj[key], level + 2)}`
    }
    return `${indicators['unchanged']}${key}: ${obj[key]}`;
  })
  return `{\n${makeIndent('  ', level + 2)}${arrOfPairsStr.join(`\n${makeIndent('  ', level + 2)}`)}\n${makeIndent('  ', level + 1)}}`
}

const renderByType = {
  'unchanged': (key, values, level) => {
    return [`${makeIndent('  ', level)}${indicators.unchanged}${key}: ${values.oldValue}`];
  },
  'changed': (key, values, level) => {
    return [`${makeIndent('  ', level)}${indicators.added}${key}: ${values.newValue}`, `${makeIndent('  ', level)}${indicators.deleted}${key}: ${values.oldValue}`];
  },
  'deleted': (key, values, level) => {
    return [`${makeIndent('  ', level)}${indicators.deleted}${key}: ${values.oldValue}`];
  },
  'added': (key, values, level) => {
    return [`${makeIndent('  ', level)}${indicators.added}${key}: ${values.newValue}`];
  }
}

const astToString = (ast, level = 1) => {
  const pairs = ast.reduce((acc, {key, type, values, children}) => {
    if (!values) {
      const processedValues = { oldValue: astToString(children, level + 2) };
      return [...acc, ...renderByType[type](key, processedValues, level)];
    }
    if (typeof values.oldValue === 'object') {
      values.oldValue = objToStr(values.oldValue, level);
    } else if (typeof values.newValue === 'object') {
      values.newValue = objToStr(values.newValue, level);
    }
    return [...acc, ...renderByType[type](key, values, level)];
  }, []);
  return `{\n${pairs.join(`\n`)}\n${makeIndent('  ', level - 1)}}`;
}

export default astToString;
