'use strict';

/**
 * map –– call promise step by step, and push res in array
 * @param  {Array<any>} data
 * @param  {function(el, index)}
 * @return {Promise<Array<any>>}
 */
module.exports = function (data, promiseHandler) {
  var list = [];
  var start = Promise.resolve();
  for (let i = 0, l = data.length; i < l; i++) {
    start = start.then(() => {
      return promiseHandler(data[i], i);
    }).then((res) => {
      if (res) {
        list.push(res);
      } else {
        return;
      }
    });
  }
  return start.then(() => list);
};
// EXAMPLE:
// module.exports([ 0, 1, 2, 3 ], function(time, i) {
//  return new Promise((resolve, reject) => {
//    setTimeout(function() {
//      resolve(i);
//      // reject(new Error('stop'));
//    }, time*1000);
//  });
// }).then(res => console.log(res)).catch(err => console.log(err));


