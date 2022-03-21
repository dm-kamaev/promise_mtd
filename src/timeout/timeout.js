'use strict';


/**
 * timeout
 * @param {number} ms
 */
module.exports = function (ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}