// import promise_mtd = require('./index');
// import promise_mtd from './index.js';
// import promise_mtd from './index.js';

// import * as promise_mtd from './index.js';
// const promise_mtd = require('../index.js');
// const promise_mtd = require('./index.js');
// import promise_mtd from './index';
import promise_mtd from '../index';

void async function () {
  await promise_mtd.foreach([1,2,3], async function (el, i) {
    console.log(el, i);
  });

  await promise_mtd.forEachParallel([1,2,3], { pool:23 }, async function (el, i) {
    console.log(el, i);
  });

  let list = await promise_mtd.map([1,2,3], async function (el, i) {
    console.log(el, i);
    return el**2;
  });

  let listParallel = await promise_mtd.mapParallel([1,2,3], { pool: 4 }, async function (el, i) {
    console.log(el, i);
    return el**2;
  });

  let list3 = await promise_mtd.transform([1,2,3], async function (el, i) {
    if (el % 2 === 0) {
      return el;
    } else {
      return null;
    }
  });

  let list32 = await promise_mtd.transformParallel([1,2,3], { pool: 3 }, async function (el, i) {
    if (el % 2 === 0) {
      return el;
    } else {
      return null;
    }
  });

  let list2 = await promise_mtd.filter([1,2,3], async function (el, i) {
    console.log(el, i);
    return Boolean((el % 2) === 0);
  });

  let list23 = await promise_mtd.filterParallel([1,2,3], { pool: 3 }, async function (el, i) {
    console.log(el, i);
    return Boolean((el % 2) === 0);
  });

  let list42 = await promise_mtd.find([1,2,3], async function (el, i) {
    return el === 2;
  });
  console.log({ list42 })

  let list52 = await promise_mtd.findParallel([1,2,3], { pool: 3 }, async function (el, i) {
    return el === 2;
  });
  console.log({ list52 })

  let i = 0;
  let j = 0;
  promise_mtd.while_(() => i < 5, async function () {
    console.log(j);
  }, { limit: 2 }).catch((err) => console.log(err));

  await promise_mtd.while_(() => i < 5, async function () {
    console.log(i);
    i++;
  });

  await promise_mtd.while_(async function () {
    console.log(i);
    return false;
  });

  await promise_mtd.while_(async function () {
    console.log(i);
    return false;
  });

  await promise_mtd.while_(async function () {
    console.log(i);
    return false;
  }, { limit: 1000 });

  await promise_mtd.while_(() => i < 5, async function () {
    console.log(i);
  }, { limit: 1000 });


  let list5 = await promise_mtd.all([ new Promise((resolve) => resolve(1)), new Promise((resolve) => resolve(2)) ]);
  let [ a, b] = await promise_mtd.all([
    new Promise<number[]>((resolve) => {
      resolve([ 1, 2 ]);
    }),
    new Promise<string>((resolve) => {
      resolve('1');
    })
  ]);

  console.log({ list5 , a, b })

  let { k1, k2 } = await promise_mtd.all({ k1:
    new Promise<{ ok: boolean }>((resolve) => {
      resolve({ ok: true });
    }),
    k2: new Promise<string[]>((resolve) => {
      resolve(['1', '2']);
    })
  });
  console.log({ k1, k2 });


  var result = await promise_mtd.reduce([0, 1, 2, 3, 4], function (previousValue, currentValue, index, array) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(previousValue + currentValue);
      }, currentValue * 1000);
    });
  }, 0);
  console.log(result);

  await promise_mtd.timeout(30);

  class CustomError extends Error {};
  const fn = promise_mtd.retry(async function main(a: number, b: string[]) {
    return a+2+b[0];
  }, { attemp: 30, delay: { ms: 200 }, ifError: CustomError });
  const result5 = await fn(1, ['dsfsd']);
  console.log({ result5 });

  const fn2 = promise_mtd.retry(async function main(a: number, b: string[]) {
    return a+2+b[0];
  }, { attemp: 30 });
  const result6 = await fn(1, ['dsfsd']);
  console.log({ result6 });

}();


