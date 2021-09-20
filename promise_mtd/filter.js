'use strict';

/**
 * filter –– call promise step by step, and push res in array
 * @param  {Array<any>} data
 * @param  {function(el, index)}
 * @return {Promise<Array<any>>}
 */
module.exports = function (data, promiseHandler) {
  var list = [];
  var start = Promise.resolve();
  for (let i = 0, l = data.length; i < l; i++) {
    let el = data[i];
    start = start.then(() => {
      return promiseHandler(el, i);
    }).then((res) => {
      if (res) {
        list.push(el);
      } else {
        return;
      }
    });
  }
  return start.then(() => list);
};