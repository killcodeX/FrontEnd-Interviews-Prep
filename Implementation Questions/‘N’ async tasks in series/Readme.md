# ‘N’ async tasks in series

Implement a function that takes a list of async functions as input and executes them in a series that is one at a time. The next task is executed only when the previous task is completed.

## Example

```
Input: [asyncTask(3), asyncTask(1), asyncTask(2)]

Output: 3 1 2
```

## Solution

### 1. Async and Await Method

async/await is the new keyword introduced in ES6 that helps us to handle the promises by avoiding the callback chaining.

For…of loop allows using await keyword performing the next iteration only when the previous one is finished.

To handle the rejection, we wrap the async/await in the try-catch block.

```javascript
const asyncTask = (n) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(n), n * 1000);
  });
};

async function seriesTask(promises) {
  for (let promise of promises) {
    let res = await promise;
    console.log(res);
  }
}

let promises = [asyncTask(5), asyncTask(2), asyncTask(3)];

seriesTask(promises);
```
