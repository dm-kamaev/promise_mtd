'use strict';

/**
 * reduce –– call promise step by step, and push res in array
 * @param  {Array<any>} data
 * @param  {function(previousValue, currentValue, index, array)}
 * @param  {any} - initialValue
 * @return {Promise<any>}
 */
module.exports = function (data, promiseHandler, initialValue) {
  var result = initialValue;
  var start = Promise.resolve();
  for (let i = 0, l = data.length; i < l; i++) {
    start = start.then(() => {
      return promiseHandler(result, data[i], i, data);
    }).then(temp => {
      return result = temp;
    });
  }
  return start.then(() => result);
};

