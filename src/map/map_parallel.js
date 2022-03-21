'use strict';

/**
 * mapParallel
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
  const list = new Array(data.length);
  const set_result = (res, i) => {
    list[i] = res;
  };
  const next = () => {
    if (current in data) {
      var d = data[current];
      let index = current;
      current++;
      return promise_handler(d, index).then((res) => set_result(res, index)).then(next);
    } else {
      return;
    }
  };

  var current = pool;
  var arr = [];
  for (let i = 0, l = data.length; i < l; i++) {
    if (i < pool) {
      // console.log('DEBUG', { i });
      arr.push(
        Promise.resolve().then(() => promise_handler(data[i], i)).then((res) => set_result(res, i)).then(next)
      );
    } else {
      break;
    }
  }
  return Promise.all(arr).then(() => list);
};
