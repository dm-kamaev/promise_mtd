'use strict';

/**
 * parallel
 * @param  {Array<any>} data
 * @param  {number | { pool: number }} params
 * @param  {function(el, i): Promise } promise_handler]
 * @return {Promise}
 */
module.exports = function (data, params, promise_handler) {
  let pool;
  if (typeof params === 'number') {
    console.warn('Warning: You shoulds use { pool: ' + params+' } instead of simple number');
    pool = params;
  } else {
    pool = params.pool;
  }

  if (!pool) {
    throw new Error('required pool');
  }
  var next = () => {
    if (data[current]) {
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
    }
  }
  return Promise.all(arr);
};


