import _ from 'lodash';
import { isInFirstObjectOnly, isInSecondObjectOnly, isInBothObjects } from './objectKeySeeker.js';

const differ = (object1, object2) => {
  const mergedObject = _.merge({}, object1, object2);
  const mergedKeys = Object.keys(mergedObject);
  const sortedKeys = _.sortBy(mergedKeys);

  const temp = sortedKeys.map((key) => {
    const value1 = object1[ key ];
    const value2 = object2[ key ];
    if (_.isObject(value1) && _.isObject(value2)) {
      return { type: 'recursion', keey: key, value: differ(value1, value2) };
    } if (isInFirstObjectOnly(object1, object2, key)) {
      return { type: 'firstObject', keey: key, value: value1 };
    } if (isInSecondObjectOnly(object1, object2, key)) {
      return { type: 'secondObject', keey: key, value: value2 };
    } if (isInBothObjects(object1, object2, key) && object1[ key ] === object2[ key ]) {
      return { type: 'bothEqual', keey: key, value: value1 };
    }
    return { type: 'bothNonEqual', keey: key, val1: value1, val2: value2 };

  });
  return temp;
};

export default differ;