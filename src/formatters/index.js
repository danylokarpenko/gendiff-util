import toJsonFormat from './jsonFormat';
import toPlainFormat from './plainFormat';
import toDiffFormat from './diffFormat';

const formates = {
  'diff': toDiffFormat,
  'plain': toPlainFormat,
  'json': toJsonFormat
}

export default format => formates[format];
