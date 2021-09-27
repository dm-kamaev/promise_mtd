# promise_mtd

[![Actions Status](https://github.com/dm-kamaev/promise_mtd/workflows/Run_tests/badge.svg)]()

Set of methods allowing to simplify work with promises in cycle. The library has support TypeScript.

* Implementation of ```forEach```, ```map```, ```filter```, ```reduce```, ```find``` for working with array data when it's needed to apply asynchronous function to each element.
* Method ```transform``` allows to iterate asynchronously over an array similarly to ```map```, but also it can skip unnecessary data.
* Implementation of cycle  while as ```asyncWhile```(while is reserved word) for using with promise.
* Method ```parallel``` allows to run concurrently promises similarly to method ```Promise.all```, but with limit.
* Method ```all``` allows to run concurrently promises similarly to method ```Promise.all```, but supports receipt of parameter such as object ```{ k1: Promise, k2: Promise }``` not only as array.

The library has no dependencies 😀.


```sh
npm i promise_mtd -S
```

### forEach(Array, function(el, index))
```forEach``` over promises serially
```js
const promiseMtd = require('promise_mtd');

await promiseMtd.forEach([ 300, 200, 100], async function (el, i) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      console.log(el); // 300 then 200 then 100
      resolve();
    }, el+i);
  });
});
```


### map(Array<any>, function(el, index): Promise<any>): Promise<Array<any>>
```map``` over promises serially
```js
const promiseMtd = require('promise_mtd');

const result = await promiseMtd.map([ 300, 200, 100], async function (el, i) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(el*2);
    }, el*2);
  });
});
console.log(result); // [ 600, 400, 200 ]
```


### reduce(Array, function(previousValue, currentValue, index, array): Promise)
```reduce``` over promises serially
```js
const promiseMtd = require('promise_mtd');

const result = await promiseMtd.reduce([0, 1, 2, 3, 4], function (previousValue, currentValue, index, array) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(previousValue + currentValue);
    }, currentValue*1000);
  });
}, 0);
console.log(result); // 10
```


### filter(Array<any>, function(el, index): Promise<Boolean>): Array<any>
```filter``` over promises serially
```js
const promiseMtd = require('promise_mtd');

const result = await promiseMtd.filter([ 1, 2, 3, 4 ], function(time, i) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(i % 2 === 0);
    }, time * 1000);
  });
});
console.log(result); // [ 2, 4 ]
```

### find(Array, function(el, index): Promise)
```find``` over promises serially
```js
const promiseMtd = require('promise_mtd');

const result = await promiseMtd.find([0, 1, 2, 3, 4], function (previousValue, currentValue, index, array) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(el === 2);
    }, el*1000);
  });
});
console.log(result); // 2
```

### parallel(Array<any>, { pool: number }, function(el, index))
Equivalent of ```Promise.all``` but with limit
```js
const promiseMtd = require('promise_mtd');

await promiseMtd.parallel([ 3000, 3000, 3000, 2000, 2000, 2000, 1000], { pool: 3 }, async function(el, i) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(el);
      resolve();
    }, t);
  });
});
```



### transform(Array<any>, function(el, index): Promise<any>): Array
Iterating over an array and filter over promises
```js
const promiseMtd = require('promise_mtd');

const res = await promiseMtd.transform([ 1, 2, 3, 4 ], function (el, i) {
  if (el <= 2) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ el, i }), 1000);
    });
  }
});
console.log(res); // [ { el: 1, i: 0 }, { el: 2, i: 1 } ]
```



### asyncWhile(condition: () => boolean, function(), params?: { limit: number }) | asyncWhile(condition: () => Promise<boolean>, params?: { limit: number })
```while``` over promises serially. This method supports limit of iterations (protection from forever cycle) via third parameter&
```js
const promiseMtd = require('promise_mtd');

let i = 0;
let result = [];
await promiseMtd.asyncWhile(() => i < 10, function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      result.push(i++);
      resolve();
    }, i*1000);
  });
});
console.log(result); // [0,1,2,3,4,5,5,6,7,8,9]

// OR

i = 0
result = [];
await promiseMtd.asyncWhile(function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      result.push(i++);
      resolve(i < 10);
    }, i*1000);
  });
});
console.log(result); // [0,1,2,3,4,5,5,6,7,8,9]

// Example: forever cycle, method will throw error
await promiseMtd.asyncWhile(() => true, function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, i*1000);
  });
}, { limit: 100 }); // protection from forever cycle
```


### all(data: Array<Promise> | Object<{ key: Promise }>): Array<any> | Object<{ key: any }>
```All``` like ```Promise.all``` but it can handle object
```js
const promiseMtd = require('promise_mtd');

const t1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2000);
  }, 2000);
});

const t2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1000);
  }, 1000);
});


// { t1: 2000, t2: 1000 }
console.log(await promiseMtd.all({ t1, t2 }));

// as Promise.all
// [ 2000, 1000 ]
console.log(await promiseMtd.all([ t1, t2 ]));
```


## Tests
```sh
npm test
```