import renderToJson from './json';
import renderToPlain from './plain';
import renderToSimple from './simple';

const formats = {
  simple: renderToSimple,
  plain: renderToPlain,
  json: renderToJson,
};

export default (format) => formats[format];
