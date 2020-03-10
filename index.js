'use strict';

const promise_mthds = module.exports;

promise_mthds.foreach = promise_mthds.forEach = require('./promise_mtd/foreach.js');

promise_mthds.map = require('./promise_mtd/map.js');

promise_mthds.transform = require('./promise_mtd/transform.js');

promise_mthds.while = require('./promise_mtd/while.js');

promise_mthds.parallel = require('./promise_mtd/parallel.js')

promise_mthds.setImmediate = promise_mthds.set_immediate = require('./promise_mtd/setImmediate.js');

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


