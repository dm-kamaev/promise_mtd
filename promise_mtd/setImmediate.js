'use strict';


/**
 * setImmediate
 * @return {Promise<null>}
 */
module.exports = function () {
  return new Promise((resolve, reject) => {
    setImmediate(resolve);
  });
}