import _ from 'lodash';
import { isInFirstObjectOnly, isInSecondObjectOnly, isInBothObjects } from './objectKeySeeker.js';
import parser from './parsers.js';
import stringify from './stylish.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);

  const differ = (object1, object2) => {
    const mergedObject = _.merge({}, object1, object2);
    const mergedKeys = Object.keys(mergedObject);
    const sortedKeys = _.sortBy(mergedKeys);

    const temp = (result, key) => {
      if (_.isObject(object1[ key ]) && _.isObject(object2[ key ])) {
        result[ `  ${key}` ] = differ(object1[ key ], object2[ key ]);
      } else if (isInFirstObjectOnly(object1, object2, key)) {
        result[ `- ${key}` ] = object1[ key ];
      } else if (isInSecondObjectOnly(object1, object2, key)) {
        result[ `+ ${key}` ] = object2[ key ];
      } else if (isInBothObjects(object1, object2, key) && object1[ key ] === object2[ key ]) {
        result[ `  ${key}` ] = object1[ key ];
      } else {
        result[ `- ${key}` ] = object1[ key ];
        result[ `+ ${key}` ] = object2[ key ];
      }
      return result;
    }
    return sortedKeys.reduce(temp, {});
  }
  return stringify(differ(obj1, obj2));
};

export default genDiff;
