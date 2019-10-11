import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse
}

export default (configPath) => {
  const ext = path.extname(configPath);
  const data = fs.readFileSync(configPath, 'utf-8');

  const parse = parsers[ext];
  console.log(parse(data));
  return parse(data);
}
