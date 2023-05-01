# Piping function

Given an object which can have a function as a value at a nested level, create a function that will accept arguments as input and pass it through all the functions in the input object and return the computed value.

## Example

```
Input:

{
  a : {
    b : (a,b,c) => a+b+c,
    c : (a,b,c) => a+b-c,
  },
  d : (a,b,c) => a-b-c
}

Fn(obj)(1,1,1);

Output:

{
  a : {
    b : 3,
    c : 1
  },
  d: -1
}
```

## Solution

We can solve this by forming a closure, creating a function that will accept the object as input, and from this function returning another function that will accept the arguments.

Inside the inner function. Iterate all the keys of the object, if the value of the key is a function, pass the arguments to it and store its computed value on that key. Else recursively call the same function for nested processing.

At the end return the original input object as we are doing the processing in-place.

```javascript
let obj = {
  a: {
    b: (a, b, c) => a + b + c,
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
};

function Fn(obj) {
  return (a, b, c) => {
    for (let key in obj) {
      if (typeof obj[key] === "function") {
        obj[key] = obj[key](a, b, c);
      } else {
        obj[key] = Fn(obj[key])(a, b, c);
      }
    }

    return obj;
  };
}

let res = Fn(obj)(1, 1, 1);

console.log(res);
```
