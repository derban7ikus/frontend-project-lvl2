import stylish from './stylish.js';
import plain from './plain.js';

const format = (tree, formatter) => {
  if (formatter === 'plain') {
    return plain(tree);
  } if (formatter === 'json') {
    return JSON.stringify(tree);
  } return stylish(tree);
};

export default format;
