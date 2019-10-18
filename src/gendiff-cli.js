import parse from './parsers';
import buildAst from './astBuilder';
import astToString from './render'

export default (configPath1, configPath2) => {
  const data1 = parse(configPath1);
  const data2 = parse(configPath2);

  const dataAst = buildAst(data1, data2);
  // console.log(astToString(dataAst));
  return astToString(dataAst);
};
