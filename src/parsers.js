import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

const getParsedData = (data, type) => parsers[type](data);

export default (configPath) => {
  const data = fs.readFileSync(configPath, 'utf-8');
  const dataType = path.extname(configPath).replace(/\./g, '');

  const result = getParsedData(data, dataType);

  return result;
};
