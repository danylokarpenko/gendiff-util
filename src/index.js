import parse from './parsers';
import buildAst from './astBuilder';
import getFormater from './formatters';

export default (configPath1, configPath2, format) => {
  const data1 = parse(configPath1);
  const data2 = parse(configPath2);

  const ast = buildAst(data1, data2);
  const render = getFormater(format);

  return render(ast);
};
