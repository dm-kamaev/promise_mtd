# promise_mtd

[![Actions Status](https://github.com/dm-kamaev/promise_mtd/workflows/Build/badge.svg)](https://github.com/dm-kamaev/promise_mtd/actions) ![Coverage](https://github.com/dm-kamaev/promise_mtd/blob/master/badges/coverage.svg)

Set of methods allowing to simplify work with promises in cycle: `forEach, map, find, filter, reduce, while, transform`. Besides there are methods for comfortable work with promises or asynchronous  operations:  `all, retry, timeout`.
The library supports TypeScript.

## Methods:


Methods:
  - [forEach](#foreach)
  - [forEachParallel](#foreachparallel)
  - [map](#map)
  - [mapParallel](#mapparallel)
  - [reduce](#reduce)
  - [filter](#filter)
  - [filterParallel](#filterparallel)
  - [find](#find)
  - [findParallel](#findparallel)
  - [transform](#transform)
  - [transformParallel](#transformparallel)
  - [while](#while_)
  - [all](#all)
  - [retry](#retry)
  - [timeout](#timeout)

The library has no dependencies 😀

Install:
```sh
npm i promise_mtd -S
```
 How to import:
```js
const promiseMtd = require('promise_mtd');

import promiseMtd from 'promise_mtd';
```

### forEach
`forEach(Array, function(el, index))`
It's analog of standard method `forEach` of array, but for asynchronous sequent actions based on promises.
```js
await promiseMtd.forEach([ 300, 200, 100], async function (el, i) {
  await promiseMtd.timeout(el); // inbuilt promifisified version for setTimeout
  console.log(el); // 300 then 200 then 100
});
```

### forEachParallel
`forEachParallel(Array, { pool: number }, function(el, index))`
It's the same method as `forEach`, but actions are executed in parallel. The `pool` is the maximum number of promises executed in parallel. In other words, number of promises which may be executed simutalneously is equal or less than value of `pool`.
```js

await promiseMtd.forEach([ 300, 200, 100], { pool: 2 }, async function (el, i) {
  await promiseMtd.timeout(el); // inbuilt promifisified version for setTimeout
  console.log(el); // 300 then 200 then 100
});
```


### map
`map(Array<any>, function(el, index): Promise<any>): Promise<Array<any>>`
It's analog of standard method `map` of array, but for asynchronous sequent actions based on promises.
```js
const result = await promiseMtd.map([ 300, 200, 100 ], async function (el, i) {
  await promiseMtd.timeout(el); // inbuilt promifisified version for setTimeout
  return el*2;
});
console.log(result); // [ 600, 400, 200 ]
```

### mapParallel
`mapParallel(Array<any>, { pool: number }, function(el, index): Promise<any>): Promise<Array>`
It's the same method as `map`, but actions are executed in parallel. The `pool` is the maximum number of promises executed in parallel. In other words, number of promises which may be executed simutalneously is equal or less than value of `pool`.
```js
const result = await promiseMtd.mapParallel([ 300, 200, 100 ], { pool: 2 }, async function (el, i) {
  await promiseMtd.timeout(el); // inbuilt promifisified version for setTimeout
  return el*2;
});
console.log(result); // [ 600, 400, 200 ]
```

### reduce
`reduce(Array, function(previousValue, currentValue, index, array): Promise)`
It's analog of standard method `reduce` of array, but for asynchronous sequent actions based on promises.
```js
const result = await promiseMtd.reduce([0, 1, 2, 3, 4], async function (previousValue, currentValue, index, array) {
  await promiseMtd.timeout(currentValue * 1000); // inbuilt promifisified version for setTimeout
  return previousValue + currentValue;
}, 0);
console.log(result); // 10
```


### filter
`filter(Array<any>, function(el, index): Promise<Boolean>): Array<any>`
It's analog of standard method `filter` of array, but for asynchronous sequent actions based on promises.
```js
const result = await promiseMtd.filter([ 1, 2, 3, 4 ], async function(el, i) {
  await promiseMtd.timeout(el * 1000); // inbuilt promifisified version for setTimeout
  return i % 2 === 0;
});
console.log(result); // [ 2, 4 ]
```

### filterParallel
`filterParallel(Array, { pool: number }, function(el, index): Promise<Boolean>): Array<any>`
It's the same method as `filter`, but actions are executed in parallel. The `pool` is the maximum number of promises executed in parallel. In other words, number of promises which may be executed simutalneously is equal or less than value of `pool`.
```js
const result = await promiseMtd.filterParallel([ 1, 2, 3, 4 ], { pool: 2 }, async function(el, i) {
  await promiseMtd.timeout(el * 1000); // inbuilt promifisified version for setTimeout
  return i % 2 === 0;
});
console.log(result); // [ 2, 4 ]
```

### find
`find(Array, function(el, index): Promise): any`
It's analog of standard method `find` of array, but for asynchronous sequent actions based on promises.
```js
const result = await promiseMtd.find([0, 1, 2, 3, 4], async function (el, i) {
  await promiseMtd.timeout(el * 1000); // inbuilt promifisified version for setTimeout
  return el === 2;
});
console.log(result); // 2
```

### findParallel
`findParallel(Array, { pool: number }, function(el, index): Promise): any`
It's the same method as `find`, but actions are executed in parallel. The `pool` is the maximum number of promises executed in parallel. In other words, number of promises which may be executed simutalneously is equal or less than value of `pool`.
```js
const result = await promiseMtd.findParallel([0, 1, 2, 3, 4], { pool: 2 }, async function (el, i) {
  await promiseMtd.timeout(el * 1000); // inbuilt promifisified version for setTimeout
  return el === 2;
});
console.log(result); // 2
```


### transform
`transform(Array, function(el, index): Promise): Array`
Method `transform` allows to iterate asynchronously over an array similarly to `map`, but also it can skip unnecessary data.
```js
const res = await promiseMtd.transform([ 1, 2, 3, 4 ], async function (el, i) {
  if (el <= 2) {
    await promiseMtd.timeout(i*1000); // inbuilt promifisified version for setTimeout
    return { el, i };
  }
});
console.log(res); // [ { el: 1, i: 0 }, { el: 2, i: 1 } ]
```

### transformParallel
`transformParallel(Array, { pool: number }, function(el, index): Promise): Array`
It's the same method  as `transform`, but actions are executed in parallel. The `pool` is the maximum number of promises executed in parallel. In other words, number of promises which may be executed simutalneously is equal or less than value of `pool`.
```js
const res = await promiseMtd.transformParallel([ 1, 2, 3, 4 ], { pool: 2 }, async function (el, i) {
  if (el <= 2) {
    await promiseMtd.timeout(i*1000); // inbuilt promifisified version for setTimeout
    return { el, i };
  }
});
console.log(res); // [ { el: 1, i: 0 }, { el: 2, i: 1 } ]
```


### while
`while_(condition: () => boolean, function(), params?: { limit: number }) | while_(condition: () => Promise<boolean>, params?: { limit: number })`
Implementation of cycle `while` as `while_` (`while` is reserved word in JavaScript) for using with promise.
`while_` iterates over promises sequentially. This method supports limit of iterations (protection from forever cycle) via third parameter.

Example with two arguments: the first argument is function which returns result of condition, the second is asynchronous action.
```js
let i = 0;
let result = [];
await promiseMtd.while_(() => i < 10, async function () {
  await promiseMtd.timeout(i*1000); // inbuilt promifisified version for setTimeout
  result.push(i++);
});
console.log(result); // [0,1,2,3,4,5,5,6,7,8,9]
```

Example with one argument, asynchronous function is executed until it returns `false`.
```js
let i = 0
let result = [];
await promiseMtd.while_(async function () {
  await promiseMtd.timeout(i*1000); // inbuilt promifisified version for setTimeout
  result.push(i++);
  return i < 10;
});
console.log(result); // [0,1,2,3,4,5,5,6,7,8,9]

```
Protection from forever cycle with the help of set `limit`. This code will throw error after 100 iterations.
```js
await promiseMtd.while_(() => true, async function () {
  await promiseMtd.timeout(i*1000); // inbuilt promifisified version for setTimeout
}, { limit: 100 }); // protection from forever cycle
```


### all
`all(data: Array | Object<{ key: Promise }>): Array<any> | Object<{ key: any }>`
Method `all` allows to run concurrently promises similarly to method `Promise.all`, but supports receipt of parameter such as object `{ k1: Promise, k2: Promise }` not only as array.
```js

const t1 = promiseMtd.timeout(2000).then(() => 2000);

const t2 = promiseMtd.timeout(1000).then(() => 1000);


// { t1: 2000, t2: 1000 }
console.log(await promiseMtd.all({ t1, t2 }));

// as Promise.all
// [ 2000, 1000 ]
console.log(await promiseMtd.all([ t1, t2 ]));
```


### retry
`retry(fn: Function, { attempt: number, delay?: { ms: number }, ifError: Error }): Function`
This method allows to create wrapper for asynchronous function which repeats calling if the function returns an error.
* `attempt`is parameter which sets number of attempts for executing.
* `delay.ms` is parameter which sets number of milliseconds for delaying between attempts.
* `ifError`  is parameter which sets class of errors because of which function must be called repeatedly. In other words, if your function throw error which is not instance of `ifError` then it will throw error immediately.
```js
function req() {
  return axios.get('http://example.com/inreliable-path');
}

const request = promiseMtd.retry(req, { attempt: 3 });
// throw error after 3 attempts
await request();
```
This code throws error after 3 attempts and makes 300 ms delay before every attempt.
```js
const request = promiseMtd.retry(req, { attempt: 3, delay: { ms: 300 } });
await request();
```

This code makes retry if error type instance of `RateLimitError` otherwise throws error immediately.
```js

class RateLimitError extends Error {}

function req() {
  return axios.get('http://example.com/auth').then(result => {
    if (result === 'rate-limit') {
      throw new RateLimitError();
    }
  }).then(() => axios.get('http://example.com/inreliable-path'));
}

const request = promiseMtd.retry(req, { attempt: 3, delay: { ms: 300 }, ifError: RateLimitError });
await request();
```

### timeout
`timeout(ms: number)`
It's promifisified version for `setTimeout`.
```js
await promiseMtd.timeout(2000);
```


## Tests
```sh
npm test
```