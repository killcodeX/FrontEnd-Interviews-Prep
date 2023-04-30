# Flatten Object

Flattening a javascript object is a very common question asked in UI Interviews.

Flattening deeply nested object can be easily achieved by using recursive technique.

## Type 1

```
// input
var user = {
  a: 'jack',
    b: {
        c: 'sparrow',
        d: {
           e: 'hahaha'
        }
    }
};

//output
{
    'a': 'jack',
    'b.c': 'sparrow',
    'b.d.e': 'hahaha'
}
```

```javascript
let obj = {
  a: "jack",
  b: {
    c: "sparrow",
    d: {
      e: "hahaha",
    },
  },
};

const flatObj = (obj) => {
  let obj1 = {};
  function recur(obj, st) {
    for (let ob in obj) {
      if (typeof obj[ob] === "object" && obj[ob] !== null) {
        recur(obj[ob], st + ob);
      } else {
        obj1[(st + ob).split("").join(".")] = obj[ob];
      }
    }
  }
  recur(obj, "");

  return obj1;
};

let res = flatObj(obj);

console.log(res);
```

## Type 2

```
// input
var user = {
  name: "Vishal",
  address: {
    primary: {
      house: "109",
      street: {
        main: "21",
        cross: "32"
      }
    }
  }
};

//output
{
  user_name: "Vishal",
  user_address_primary_house: "109",
  user_address_primary_street_main: "21",
  user_address_primary_street_cross: "32",
}
```

### Solution

```javascript
var user = {
  name: "Vishal",
  address: {
    primary: {
      house: "109",
      street: {
        main: "21",
        cross: "32",
      },
    },
  },
};

const flatObj = (obj, name) => {
  let obj1 = {};
  function recur(obj, st) {
    for (let ob in obj) {
      if (typeof obj[ob] === "object" && obj[ob] !== null) {
        recur(obj[ob], st + "_" + ob);
      } else {
        obj1[st + "_" + ob] = obj[ob];
      }
    }
  }
  recur(obj, name);

  return obj1;
};

let res = flatObj(user, "user");

console.log(res);
```
