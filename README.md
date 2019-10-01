# promise_mtd
Set of methods allowing to simplify work with promises in cycle.
Implementation of ```forEach``` and ```map``` for working with array data when it's needed to apply asynchronous function to each element.
Method ```transform``` allows to iterate asynchronously over an array just like ```map```, but also it can skip unnecessary data.
Implementation of cycle  ```while``` for using with promise.
Method ```parallel``` allows to run concurrently promises such as method ```Promise.all```, but with limit.
The library has no dependencies 😀.


```sh
npm i promise_mtd -S
```

### foreach(Array<any>, Function(el, index)) || forEach(Array<any>, Function(el, index))
Foreach over promises serially
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
Map over promises serially
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


### parallel(Array<any>, Function(el, index))
Equalent Promise.all, but with limit
```js
const promiseMtd = require('promise_mtd');
void async function() {
  try {
    await promiseMtd.parallel([ 3000, 3000, 3000, 2000, 2000, 2000, 1000], 3, async function(t, i) {
      return new Promise((resolve) => {
        // if (i === 4) {
        //   throw new Error('stop');
        // }
        setTimeout(() => {
          console.log(t);
          resolve();
        }, t);
      });
    });
  } catch (err) {
    console.log('Raise', err);
  }
}();
```


### transform(Array<any>, Function(el, index))
Iterate array and filter over promises
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


### while(condition: Function(): Boolean, Function)
While over promises serially
```js
const promiseMtd = require('promise_mtd');
void async function() {
  let count = 5;
  await promiseMtd.while(() => count <= 0, async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(count);
        count--;
        resolve();
      }, count * 1000);
    });
  })
  console.log(count); // 0
}();
```