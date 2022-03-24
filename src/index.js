import parser from './parsers.js';
import differ from './differ.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);
  const tree = differ(obj1, obj2);
  return format(tree, formatter);
};

export default genDiff;
