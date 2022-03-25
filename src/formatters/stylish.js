const indent = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2);
const stringify = (data, treeDepth) => {
  if (typeof data !== 'object') {
    return `${data}`;
  }
  if (data === null) { return null; }
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${indent(treeDepth + 1)}  ${key}: ${stringify(value, treeDepth + 1)}`);
  return [
    '{',
    ...lines,
    `${indent(treeDepth)}  }`,
  ].join('\n');
};
const stylish = (innerTree) => {
  const iter = (tree, depth) => tree.map((node) => {
    const getValue = (value, sign) => `${indent(depth)}${sign} ${node.key}: ${stringify(value, depth)}\n`;
    switch (node.type) {
      case 'secondObject':
        return getValue(node.val, '+');
      case 'firstObject':
        return getValue(node.val, '-');
      case 'bothEqual':
        return getValue(node.val, ' ');
      case 'bothNonEqual':
        return `${getValue(node.val1, '-')}${getValue(node.val2, '+')}`;
      case 'recursion':
        return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${indent(depth)}  }\n`;
      default:
        throw new Error(`Этого типа не существует: ${node.type}`);
    }
  });
  return `{\n${iter(innerTree, 1).join('')}}`;
};

export default stylish;
