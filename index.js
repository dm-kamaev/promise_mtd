'use strict';

const promise_mtd = module.exports;

promise_mtd.foreach = promise_mtd.forEach = require('./promise_mtd/foreach.js');

promise_mtd.map = require('./promise_mtd/map.js');

promise_mtd.transform = require('./promise_mtd/transform.js');

promise_mtd.while = require('./promise_mtd/while.js');

promise_mtd.parallel = require('./promise_mtd/parallel.js');

promise_mtd.all = require('./promise_mtd/all.js');

promise_mtd.setImmediate = promise_mtd.set_immediate = require('./promise_mtd/setImmediate.js');

// void async function() {
  // let i = 0;
  // await promise_mthds.while(() => i < 5, async function () {
  //   console.log(i);
  //   i++;
  // });
  // console.log(i);
  // var ar = new Array(1000000);
  // ar.fill(6732478247827842874872347823347823742378);
  // // console.log(ar);
  // setInterval(() => {
  //   console.log('i am here' + Date.now());
  // }, 100000);
  // await promise_mthds.foreach(ar, async function (el) {
  //   await el;
  //   await promise_mthds.set_immediate();
  // });
  // console.log('STOP handle array');
// }();


// void async function() {
//   try {
//     var t1 = new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(2000);
//       }, 2000);
//     });

//     var t2 = new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(1000);
//       }, 1000);
//     });


//     // { t1: 2000, t2: 1000 }
//     console.log(await promise_mtd.all({ t1, t2 }));

//     // as Promise.all
//     // [ 2000, 1000 ]
//     console.log(await promise_mtd.all([ t1, t2 ]));
//   } catch (err) {
//     console.log('Raise', err);
//   }
// }();
