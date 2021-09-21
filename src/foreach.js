'use strict';

/**
 * forEach foreach –– call promise step by step
 * @param  {Array<any>} data
 * @param  {Function(el, index)}
 * @return {Promise<null>}
 */
module.exports = function (data, promise_handler) {
  var start = Promise.resolve();
  for (let i = 0, l = data.length; i < l; i++) {
    start = start.then(() => promise_handler(data[i], i));
  }
  return start;
}