const map = (arr, cb) => {
  const newArr = [];

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    newArr[index] = cb(element);
  }

  return newArr;
};

const reduce = (arr, cb, initialContainer) => {
  let newContainer = initialContainer;

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    newContainer = cb(newContainer, element);
  }

  return newContainer;
};

const filter = (arr, predicate) => {
  const newArray = [];

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (predicate(element)) newArray.push(element);
  }

  return newArray;
};

