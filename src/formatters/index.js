import toJsonFormat from './jsonFormat';
import toPlainFormat from './plainFormat';

export default (format) => {
  if (format === 'json') {
    return toJsonFormat;
  } else if (format === 'plain') {
    return toPlainFormat;
  }
}
