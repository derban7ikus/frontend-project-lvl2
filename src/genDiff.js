import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const isInFirstObjectOnly = (object1, object2, key) => {
  if (Object.hasOwn(object1, key) && !Object.hasOwn(object2, key)) {
    return true;
  }
  return false;
};

const isInSecondObjectOnly = (object1, object2, key) => {
  if (!Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
    return true;
  }
  return false;
};

const isInBothObjects = (object1, object2, key) => {
  if (Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
    return true;
  }
  return false;
};

const genDiff = (filepath1, filepath2) => {
  const absolutePath = (partPath) => path.resolve(process.cwd(), partPath);

  const obj1 = JSON.parse(readFileSync(absolutePath(filepath1), 'utf8'));
  const obj2 = JSON.parse(readFileSync(absolutePath(filepath2), 'utf8'));

  const mergedObject = _.merge({}, obj1, obj2);
  const mergedKeys = Object.keys(mergedObject);
  const sortedKeys = _.sortBy(mergedKeys);

  const diffSeeker = (keys) => {
    const result = [];
    for (const key of keys) {
      if (isInFirstObjectOnly(obj1, obj2, key)) {
        result.push([ `- ${key}: ${obj1[ key ]}` ])
      } else if (isInSecondObjectOnly(obj1, obj2, key)) {
        result.push([ `+ ${key}: ${obj2[ key ]}` ])
      } else if (isInBothObjects(obj1, obj2, key) && obj1[ key ] === obj2[ key ]) {
        result.push([ `  ${key}: ${obj1[ key ]}` ])
      } else {
        result.push([ `- ${key}: ${obj1[ key ]}` ]);
        result.push([ `+ ${key}: ${obj2[ key ]}` ])
      }
    };
    return result.join(`
    `);
  };
  return `{
    ${diffSeeker(sortedKeys)}
}`
};

export default genDiff;
