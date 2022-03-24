import _ from 'lodash';

const prep = (tree) => {
  const result = tree.reduce((acc, element) => {
    const key = element.keey;
    const val = element.value;
    const value1 = element.val1;
    const value2 = element.val2;

    switch (element.type) {
      case 'recursion':
        acc[ `${key}` ] = prep(val);
        return { ...acc };
      case 'firstObject':
        acc[ `- ${key}` ] = val;
        return { ...acc };
      case 'secondObject':
        acc[ `+ ${key}` ] = val;
        return { ...acc };
      case 'bothEqual':
        acc[ `${key}` ] = val;
        return { ...acc };
      case 'bothNonEqual':
        acc[ `- ${key}` ] = value1;
        acc[ `+ ${key}` ] = value2;
        return { ...acc };
      default:
        throw new Error('That type does not exist');
    };
  }, {});

  return result;
};

const stylish = (obj, replacer = ' ', spacesCount = 4) => {
  const object = prep(obj);
  const iter = (data, treeDepth = 1) => {
    if (!_.isObject(data)) {
      return `${data}`;
    };
    const indentSize = spacesCount * treeDepth;
    const indent = replacer.repeat(indentSize);
    const closingIndent = () => _.isEqual(object, data) ? `` : `${replacer.repeat(indentSize - spacesCount)}`;
    const lines = Object
      .entries(data)
      .map(([ key, value ]) => {
        if (key.startsWith('+') || key.startsWith('-')) {
          return `${replacer.repeat(indentSize - 2)}${key}: ${iter(value, treeDepth + 1)}`;
        } return `${indent}${key}: ${iter(value, treeDepth + 1)}`
      });
    return [ '{', ...lines, `${closingIndent()}}` ].join('\n');
  };
  return iter(object);
};

export default stylish;
