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

export { isInFirstObjectOnly, isInSecondObjectOnly, isInBothObjects };
