import renderToJson from './json';
import renderToPlain from './plain';
import renderToSimple from './simple';

const formates = {
  simple: renderToSimple,
  plain: renderToPlain,
  json: renderToJson,
};

export default (format) => formates[format];
