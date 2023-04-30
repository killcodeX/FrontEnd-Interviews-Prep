# ‘N’ async tasks in series

Implement a function that takes a list of async functions as input and executes them in a series that is one at a time. The next task is executed only when the previous task is completed.

## Example

```
Input: [asyncTask(3), asyncTask(1), asyncTask(2)]

Output: 3 1 2
```