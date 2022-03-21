'use strict';

/**
 * filterParallel
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
  const list = [];
  const handler = (res, el) => {
    if (res) {
      list.push(el);
    } else {
      return;
    }
  };
  const next = () => {
    if (current in data) {
      const el = data[current];
      let index = current;
      current++;
      return promise_handler(el, index).then(res => handler(res, el)).then(next);
    } else {
      return;
    }
  };

  var current = pool;
  var arr = [];
  for (let i = 0, l = data.length; i < l; i++) {
    if (i < pool) {
      const el = data[i];
      arr.push(
        Promise.resolve().then(() => promise_handler(el, i)).then(res => handler(res, el)).then(next)
      );
    } else {
      break;
    }
  }
  return Promise.all(arr).then(() => list);
};
