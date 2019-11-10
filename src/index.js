import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAst from './astBuilder';
import getFormater from './formatters';

export default (configPath1, configPath2, format) => {
  const fileData1 = fs.readFileSync(configPath1, 'utf-8');
  const fileData2 = fs.readFileSync(configPath2, 'utf-8');

  const fileFormat1 = path.extname(configPath1).slice(1);
  const fileFormat2 = path.extname(configPath2).slice(1);

  const data1 = parse(fileData1, fileFormat1);
  const data2 = parse(fileData2, fileFormat2);

  const ast = buildAst(data1, data2);
  const render = getFormater(format);

  return render(ast);
};
