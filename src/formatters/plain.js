import _ from "lodash";

const stringify = (value) => {
  if (_.isObject(value)) {
    return `[complex value]`;
  } if (typeof (value) === 'string') {
    return `'${value}'`;
  } return value;

}
const plain = (data) => {
  const format = (tree, parent) => tree
    .filter((element) => element.type !== 'bothEqual')
    .map((element) => {
      const key = parent ? `${parent}.${element.keey}` : element.keey;
      const {value} = element;
      const value1 = element.val1;
      const value2 = element.val2;

      switch (element.type) {
        case 'recursion':
          return format(value, key);
        case 'firstObject':
          return `Property '${key}' was removed`;
        case 'secondObject':
          return `Property '${key}' was added with value: ${stringify(value)}`;
        case 'bothNonEqual':
          return `Property '${key}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        default:
          throw new Error('That type does not exist');
      };
    }).join('\n');
  return format(data, 0);
};


export default plain;
