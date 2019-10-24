import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

const parser = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse
}

export default (configPath) => {
  const ext = path.extname(configPath);
  const data = fs.readFileSync(configPath, 'utf-8');
  const parse = parser[ext];

  return parse(data);
}
