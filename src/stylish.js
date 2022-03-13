import _ from 'lodash';

const stringify = (value, replacer = '  ', spacesCount = 1) => {
  const iter = (data, treeDepth = 1) => {
    if (!_.isObject(data)) {
      return `${data}`;
    };
    const indent = replacer.repeat(spacesCount * treeDepth);
    const indentSize = spacesCount * treeDepth;
    const closingIndent = () => _.isEqual(value, data) ? `` : `${replacer.repeat(indentSize - spacesCount)}`;
    const lines = Object
      .entries(data)
      .map(([ key, object ]) => `${indent}${key}: ${iter(object, treeDepth + 1)}`);
    return [ '{', ...lines, `${closingIndent()}}` ].join('\n');
  };
  return iter(value);
};

export default stringify;
