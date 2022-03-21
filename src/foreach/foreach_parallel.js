'use strict';

/**
 * forEachParallel
 * @param  {Array<any>} data
 * @param  {{ pool: number }} params
 * @param  {function(el, i): Promise } promise_handler]
 * @return {Promise}
 */
module.exports = function (data, params, promise_handler) {
  let pool;
  pool = params.pool;

  if (!pool) {
    throw new Error('required pool');
  }
  var next = () => {
    if (current in data) {
      var d = data[current];
      current++;
      return promise_handler(d, current).then(next);
    } else {
      return;
    }
  };

  var current = pool;
  var arr = [];
  for (let i = 0, l = data.length; i < l; i++) {
    if (i < pool) {
      arr.push(
        Promise.resolve().then(() => promise_handler(data[i], i)).then(next)
      );
    } else {
      break;
    }
  }
  return Promise.all(arr);
};


