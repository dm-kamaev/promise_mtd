# promise_mtd

[![Actions Status](https://github.com/dm-kamaev/promise_mtd/workflows/Build/badge.svg)](https://github.com/dm-kamaev/promise_mtd/actions) ![Coverage](https://github.com/dm-kamaev/promise_mtd/blob/master/badges/coverage.svg)

Set of methods allowing to simplify work with promises in cycle. The library has support TypeScript.

Methods:
  * `forEach`
  * `forEachParallel`
  * `map`
  * `mapParallel`
  * `filter`
  * `filterParallel`
  * `find`
  * `findParallel`
  * `reduce`
  * `while_`
  * `transform`
  * `all`
  * `retry`
  * `timeout`

List:
* Implementation of ```forEach```, ```map```, ```filter```, ```reduce```, ```find``` for working with array data when it's needed to apply asynchronous function to each element.

The library has no dependencies 😀.


```sh
npm i promise_mtd -S
```
 How import:
```js
const promiseMtd = require('promise_mtd');

import promiseMtd from 'promise_mtd';
```

### forEach(Array, function(el, index))
It's analog standard method `forEach` of array, but for asynchronous sequence actions based on promises.
```js
await promiseMtd.forEach([ 300, 200, 100], async function (el, i) {
  await promiseMtd.timeout(el); // inbuilt promifisified version for setTimeout
  console.log(el); // 300 then 200 then 100
});
```

### forEachParallel(Array, { pool: number }, function(el, index))
It's method same as `forEach`, but actions executed parallel. The `pool` is maximum number of promises executed parallel. In other words, number promises which may be executed simutalneously equal or less value of `pool`.
Method `parallel` allows to run concurrently promises similarly to method ```Promise.all```, but with limit.
```js

await promiseMtd.forEach([ 300, 200, 100], { pool: 2 }, async function (el, i) {
  await promiseMtd.timeout(el); // inbuilt promifisified version for setTimeout
  console.log(el); // 300 then 200 then 100
});
```


### map(Array<any>, function(el, index): Promise<any>): Promise<Array<any>>
It's analog standard method `map` of array, but for asynchronous sequence actions based on promises.
```js
const result = await promiseMtd.map([ 300, 200, 100 ], async function (el, i) {
  await promiseMtd.timeout(el); // inbuilt promifisified version for setTimeout
  return el*2;
});
console.log(result); // [ 600, 400, 200 ]
```

### mapParallel(Array<any>, { pool: number }, function(el, index): Promise<any>): Promise<Array<any>>
It's method same as `map`, but actions executed parallel. The `pool` is maximum number of promises executed parallel. In other words, number promises which may be executed simutalneously equal or less value of `pool`.
```js
const result = await promiseMtd.mapParallel([ 300, 200, 100 ], { pool: 2 }, async function (el, i) {
  await promiseMtd.timeout(el); // inbuilt promifisified version for setTimeout
  return el*2;
});
console.log(result); // [ 600, 400, 200 ]
```


### reduce(Array, function(previousValue, currentValue, index, array): Promise)
It's analog standard method `reduce` of array, but for asynchronous sequence actions based on promises.
```js
const result = await promiseMtd.reduce([0, 1, 2, 3, 4], async function (previousValue, currentValue, index, array) {
  await promiseMtd.timeout(currentValue * 1000); // inbuilt promifisified version for setTimeout
  return previousValue + currentValue;
}, 0);
console.log(result); // 10
```


### filter(Array<any>, function(el, index): Promise<Boolean>): Array<any>
It's analog standard method `filter` of array, but for asynchronous sequence actions based on promises.
```js
const result = await promiseMtd.filter([ 1, 2, 3, 4 ], async function(el, i) {
  await promiseMtd.timeout(el * 1000); // inbuilt promifisified version for setTimeout
  return i % 2 === 0;
});
console.log(result); // [ 2, 4 ]
```

### filterParallel(Array, { pool: number }, function(el, index): Promise<Boolean>): Array<any>
It's method same as `filter`, but actions executed parallel. The `pool` is maximum number of promises executed parallel. In other words, number promises which may be executed simutalneously equal or less value of `pool`.
```js
const result = await promiseMtd.filterParallel([ 1, 2, 3, 4 ], { pool: 2 }, async function(el, i) {
  await promiseMtd.timeout(el * 1000); // inbuilt promifisified version for setTimeout
  return i % 2 === 0;
});
console.log(result); // [ 2, 4 ]
```

### find(Array, function(el, index): Promise)
It's analog standard method `find` of array, but for asynchronous sequence actions based on promises.
```js
const result = await promiseMtd.find([0, 1, 2, 3, 4], async function (el, i) {
  await promiseMtd.timeout(el * 1000); // inbuilt promifisified version for setTimeout
  return el === 2;
});
console.log(result); // 2
```

### findParallel(Array, { pool: number }, function(el, index): Promise)
It's method same as `find`, but actions executed parallel. The `pool` is maximum number of promises executed parallel. In other words, number promises which may be executed simutalneously equal or less value of `pool`.
```js
const result = await promiseMtd.findParallel([0, 1, 2, 3, 4], { pool: 2 }, async function (el, i) {
  await promiseMtd.timeout(el * 1000); // inbuilt promifisified version for setTimeout
  return el === 2;
});
console.log(result); // 2
```


### transform(Array, function(el, index): Promise<any>): Array
Method `transform` allows to iterate asynchronously over an array similarly to `map`, but also it can skip unnecessary data. Iterating over an array and filter over promises.
```js
const res = await promiseMtd.transform([ 1, 2, 3, 4 ], async function (el, i) {
  if (el <= 2) {
    await promiseMtd.timeout(i*1000); // inbuilt promifisified version for setTimeout
    return { el, i };
  }
});
console.log(res); // [ { el: 1, i: 0 }, { el: 2, i: 1 } ]
```

### transformParallel(Array, { pool: number }, function(el, index): Promise<any>): Array
It's method same as `transform`, but actions executed parallel. The `pool` is maximum number of promises executed parallel. In other words, number promises which may be executed simutalneously equal or less value of `pool`.
```js
const res = await promiseMtd.transformParallel([ 1, 2, 3, 4 ], { pool: 2 }, async function (el, i) {
  if (el <= 2) {
    await promiseMtd.timeout(i*1000); // inbuilt promifisified version for setTimeout
    return { el, i };
  }
});
console.log(res); // [ { el: 1, i: 0 }, { el: 2, i: 1 } ]
```


### while_(condition: () => boolean, function(), params?: { limit: number }) | while_(condition: () => Promise<boolean>, params?: { limit: number })
Implementation of cycle `while` as `while_` (while is reserved word) for using with promise.
`while_` over promises serially. This method supports limit of iterations (protection from forever cycle) via third parameter.

Example with two arguments: first argument is function which return condition, second is asynchronous action.
```js
let i = 0;
let result = [];
await promiseMtd.while_(() => i < 10, async function () {
  await promiseMtd.timeout(i*1000); // inbuilt promifisified version for setTimeout
  result.push(i++);
});
console.log(result); // [0,1,2,3,4,5,5,6,7,8,9]
```

Example with one argument, asynchronous function is executing until then will return false.
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


### all(data: Array | Object<{ key: Promise }>): Array<any> | Object<{ key: any }>
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


### retry(fn: Function, { attempt: number, delay?: { ms: number }, ifError: Error }): Function
This method allows create wrapper for asynchronous function which repeat calling if it return error.
* `attempt`is parameter which setting number of attempts for executing.
* `delay.ms` is parameter which setting number milliseconds for delaying between attempts.
* `ifError`  is parameter which setting class of errors because of which function must be called repeatedly. In other words, if your function throw error which is not instance of `ifError` then it will throwing error immediately.
```js
function req() {
  return axios.get('http://example.com/inreliable-path');
}

const request = promiseMtd.retry(req, { attempt: 3 });
// throw error after 3 attempts
await request();
```
This code throws error after 3 attempts and make 300 ms delaying before every attempt.
```js
const request = promiseMtd.retry(req, { attempt: 3, delay: { ms: 300 } });
await request();
```

This code make retry if error type instance of `RateLimitError` otherwise throw error immediately.
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

### timeout(ms: number)
It's promifisified version for `setTimeout`.
```js
await promiseMtd.timeout(2000);
```


## Tests
```sh
npm test
```