import _ from 'lodash';

const isInFirstObjectOnly = (object1, object2, key) => {
  if (_.has(object1, key) && !_.has(object2, key)) {
    return true;
  }
  return false;
};

const isInSecondObjectOnly = (object1, object2, key) => {
  if (!_.has(object1, key) && _.has(object2, key)) {
    return true;
  }
  return false;
};

const isInBothObjects = (object1, object2, key) => {
  if (_.has(object1, key) && _.has(object2, key)) {
    return true;
  }
  return false;
};

export { isInFirstObjectOnly, isInSecondObjectOnly, isInBothObjects };
