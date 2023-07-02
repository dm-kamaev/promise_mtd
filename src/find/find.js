'use strict';

/**
 * find –– call promise step by step, and push res in array
 * @param  {Array<any>} data
 * @param  {function(el, index)}
 * @return {Promise<any> | Promise<undefined>}
 */
module.exports = function (data, promiseHandler) {
  let start = Promise.resolve();
  let stop = false;
  let found = undefined;

  for (let i = 0, l = data.length; i < l; i++) {
    let el = data[i];
    start = start.then(() => {
      if (stop) {
        return;
      }
      return promiseHandler(el, i);
    }).then((res) => {
      if (!stop && res) {
        found = el;
        stop = true;
      }
    });
  }

  return start.then(() => found);
};


