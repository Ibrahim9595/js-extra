const counter = () => {
  let counter = 0;

  return {
    increment: () => counter++,
    decrement: () => counter--,
    get: () => {
        return counter
    },
  };
};


// const {increment, decrement, get} = counter()

// console.log(get())
// increment()
// increment()
// console.log(get())
// Currying, Partial applications

const add = (x, y) => x + y
const add_curried = (x) => (y) => add(x, y)

const add2 = add_curried(2)
const add10 = add_curried(10)

console.log(add_curried(2)(10))