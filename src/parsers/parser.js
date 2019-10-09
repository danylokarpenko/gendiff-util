import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
// import { parse } from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad
}

export default (configPath) => {
  const ext = path.extname(configPath);
  const data = fs.readFileSync(configPath);

  const parse = parsers[ext];
  
  return parse(data);
}
