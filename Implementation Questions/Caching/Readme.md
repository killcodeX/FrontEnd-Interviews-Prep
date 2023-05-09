# Caching/Memozing function

Given an function which does a expensive business logic everytime it gets called, so inorder to avoid that you need to implement a memoize function to cache a value.

```javascript
function expensive(a, b) {
  for (let i = 1; i < 1000000; i++);

  return a * b;
}

console.time("First call");
console.log(expensive());
console.timeEnd("First call"); // first call: 1.5812 ms
```

Let us now create a memoize function to store the data!!

```javascript
function memoize(fn, context) {
  let cacheObject = {};

  return (...args) => {
    let argsCache = JSON.stringify(args);

    if (!cacheObject[argsCache]) {
      cacheObject[argsCache] = fn.call(context || this, ...args);
    }

    return cacheObject[argsCache];
  };
}

function expensive(a, b) {
  for (let i = 1; i < 1000000; i++);

  return a * b;
}

let memoizResult = memoize(expensive);

console.time("First call");
console.log(memoizResult(8, 5)); // 1.6989 ms
console.timeEnd("First call");

/* once cache done */
console.time("Second call");
console.log(memoizResult(8, 5)); // 0.02
console.timeEnd("Second call");
```
