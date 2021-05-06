# promise_mtd
Set of methods allowing to simplify work with promises in cycle.

* Implementation of ```forEach```, ```map```, ```filter``` for working with array data when it's needed to apply asynchronous function to each element.
* Method ```transform``` allows to iterate asynchronously over an array similarly to ```map```, but also it can skip unnecessary data.
* Implementation of cycle  while as ```asyncWhile```(while is reserved word) for using with promise.
* Method ```parallel``` allows to run concurrently promises similarly to method ```Promise.all```, but with limit.
* Method ```all``` allows to run concurrently promises similarly to method ```Promise.all```, but supports receipt of parameter such as object ```{ k1: Promise, k2: Promise }``` not only as array.

The library has no dependencies 😀.


```sh
npm i promise_mtd -S
```

### foreach(Array<any>, Function(el, index)) || forEach(Array<any>, Function(el, index))
```Foreach``` over promises serially
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


### map(Array<any>, Function(el, index): Promise<any>)
```Map``` over promises serially
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


### filter(Array<any>, Function(el, index): Promise<Boolean>)
```Filter```
```js
const promiseMtd = require('promise_mtd');

void async function () {
  let res = await promiseMtd.filter([ 0, 1, 2, 3 ], function(time, i) {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve(Boolean(i));
      }, time * 1000);
    });
  });
  console.log(res); // [ 1, 2, 3 ]
}();
```

### parallel(Array<any>, Function(el, index))
Equivalent of ```Promise.all``` but with limit
```js
const promiseMtd = require('promise_mtd');

void async function() {
  await promiseMtd.parallel([ 3000, 3000, 3000, 2000, 2000, 2000, 1000], 3, async function(el, i) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(el);
        resolve();
      }, t);
    });
  });
}();
```



### transform(Array<any>, Function(el, index))
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



### whileTrue(condition: Function(): Boolean, Function)
```While``` over promises serially
```js
const promiseMtd = require('promise_mtd');

void async function() {
  let i = 0;
  await promiseMtd.asyncWhile(() => i < 5, async function () {
    console.log(i);
    i++;
  });
  console.log(i); // 5
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