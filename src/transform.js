'use strict';

/**
 * transform - you can return 'null || undefined' for skipping element
 * @param  {} data
 * @param  {Array<any>} promiseHandler
 * @return {Promise<Array<any>>}
 * @example
 * void async function() {
 *  let res = await promiseMtd.transform([ 1, 2, 3, 4 ], function (el, i) {
 *    if (el <= 2) {
 *      return new Promise((resolve) => {
 *        setTimeout(() => resolve({ el, i }), 1000);
 *      });
 *    }
 *  });
 *  console.log(res); // => [ { el: 1, i: 0 }, { el: 2, i: 1 } ]
 * }();
 */
module.exports = function (data, promiseHandler) {
  var list = [];
  var start = Promise.resolve();
  for (let i = 0, l = data.length; i < l; i++) {
    start = start.then(() => {
      return promiseHandler(data[i], i);
    }).then((res) => {
      if (res !== undefined && res !== null) {
        list.push(res);
      }
      return;
    });
  }
  return start.then(() => list);
};