# promise_mtd
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

void async function () {
  await promiseMtd.forEach([ 300, 200, 100], async function (el, i) {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        console.log(el);
        resolve();
      }, el+i);
    });
  });
}();
```


### map(Array<any>, function(el, index): Promise<any>): Promise<Array<any>>
```map``` over promises serially
```js
const promiseMtd = require('promise_mtd');

void async function () {
  let res = await promiseMtd.map([ 300, 200, 100], async function (el, i) {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve(el*2);
      }, el*2);
    });
  });
  console.log(res); // [ 600, 400, 200 ]
}();
```


### reduce()
```reduce``` over promises serially
```js
const promiseMtd = require('promise_mtd');

void async function () {
  var result = await promiseMtd.reduce([0, 1, 2, 3, 4], function (previousValue, currentValue, index, array) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(previousValue + currentValue);
          }, currentValue*1000);
        });
      }, 0);
  }();
  console.log(result); // 10
```


### filter(Array<any>, Function(el, index): Promise<Boolean>): Array<any>
```filter``` over promises serially
```js
const promiseMtd = require('promise_mtd');

void async function () {
  let res = await promiseMtd.filter([ 1, 2, 3, 4 ], function(time, i) {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve(i % 2 === 0);
      }, time * 1000);
    });
  });
  console.log(res); // [ 2, 4 ]
}();
```

### find(Array, function(el, index))
```find``` over promises serially
```js
const promiseMtd = require('promise_mtd');

void async function () {
  const result = await promiseMtd.find([0, 1, 2, 3, 4], function (previousValue, currentValue, index, array) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(el === 2);
          }, el*1000);
        });
      });
  }();
  console.log(result); // 2
```

### parallel(Array<any>, { pool: number }, Function(el, index))
Equivalent of ```Promise.all``` but with limit
```js
const promiseMtd = require('promise_mtd');

void async function() {
  await promiseMtd.parallel([ 3000, 3000, 3000, 2000, 2000, 2000, 1000], { pool: 3 }, async function(el, i) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(el);
        resolve();
      }, t);
    });
  });
}();
```



### transform(Array<any>, Function(el, index): Promise<any>): Array
Iterating over an array and filter over promises
```js
const promiseMtd = require('promise_mtd');

void async function() {
  let res = await promiseMtd.transform([ 1, 2, 3, 4 ], function (el, i) {
    if (el <= 2) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ el, i }), 1000);
      });
    }
  });
  console.log(res); // [ { el: 1, i: 0 }, { el: 2, i: 1 } ]
}();
```



### asyncWhile(condition: () => boolean, function()) | asyncWhile(condition: () => Promise<boolean>)
```while``` over promises serially
```js
const promiseMtd = require('promise_mtd');

void async function() {
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
}();
```


### all(data: Array<Promise> | Object<{ key: Promise }>): Array<any> | Object<{ key: any }>
```All``` over promises serially
```js
const promiseMtd = require('promise_mtd');

void async function() {
  var t1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2000);
    }, 2000);
  });

  var t2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1000);
    }, 1000);
  });


  // { t1: 2000, t2: 1000 }
  console.log(await promiseMtd.all({ t1, t2 }));

  // as Promise.all
  // [ 2000, 1000 ]
  console.log(await promiseMtd.all([ t1, t2 ]));
}();
```


## Test
```sh
npm run test
```