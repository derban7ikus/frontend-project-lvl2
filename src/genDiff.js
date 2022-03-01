import _ from 'lodash';
import { isInFirstObjectOnly, isInSecondObjectOnly, isInBothObjects } from './objectKeySeeker.js';
import parser from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);

  const mergedObject = _.merge({}, obj1, obj2);
  const mergedKeys = Object.keys(mergedObject);
  const sortedKeys = _.sortBy(mergedKeys);

  const diffSeeker = (keys) => {
    const result = [];
    for (const key of keys) {
      if (isInFirstObjectOnly(obj1, obj2, key)) {
        result.push([ `- ${key}: ${obj1[ key ]}` ]);
      } else if (isInSecondObjectOnly(obj1, obj2, key)) {
        result.push([ `+ ${key}: ${obj2[ key ]}` ]);
      } else if (isInBothObjects(obj1, obj2, key) && obj1[ key ] === obj2[ key ]) {
        result.push([ `  ${key}: ${obj1[ key ]}` ]);
      } else {
        result.push([ `- ${key}: ${obj1[ key ]}` ]);
        result.push([ `+ ${key}: ${obj2[ key ]}` ]);
      }
    }
    return result.join(`
    `);
  };

  return `{
    ${diffSeeker(sortedKeys)}
}`;
};

export default genDiff;
