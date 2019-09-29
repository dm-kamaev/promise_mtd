'use strict';

/**
 * map –– call promise step by step, and push res in array
 * @param  {Array<any>} data
 * @param  {function(el, index)}
 * @return {Promise<Array<any>>}
 */
module.exports = function (data, promiseHandler) {
  let list = [];
  let start = Promise.resolve();
  for (let i = 0, l = data.length; i < l; i++) {
    start = start.then(() => {
      return promiseHandler(data[i], i);
    }).then((res) => {
      return list.push(res);
    });
  }
  return start.then(() => list);
};
// EXAMPLE:
// promiseMtd.map([3000, 2000, 1000], function(time, i) {
//  return new Promise((resolve, reject) => {
//    setTimeout(function() {
//      console.log('HERE=', time, i);
//      resolve('Result='+i);
//      // reject(new Error('stop'));
//    }, time);
//  });
// }).then(res => console.log(res)).catch(err => console.log(err));


