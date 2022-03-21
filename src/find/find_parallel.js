'use strict';

const Stop = require('../lib/Stop.js');

/**
 * findParallel
 * @param  {Array<any>} data
 * @param  {{ pool: number }} params
 * @param  {function(el, i): Promise } promise_handler
 * @return {Promise}
 */
module.exports = function (data, params, promise_handler) {
  let pool;
  pool = params.pool;

  if (!pool) {
    throw new Error('required pool');
  }

  let found = false;
  const handler = (res, el) => {
    if (res) {
      found = true;
      throw new Stop(el);
    }
  }

  const next = () => {
    if (found) {
      return;
    } else if (current in data) {
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
      arr.push(
        Promise.resolve().then(() => promise_handler(data[i], i)).then(res => handler(res, data[i])).then(next)
      );
    } else {
      break;
    }
  }

  return Promise.all(arr).catch(err => {
    if (err instanceof Stop) {
      return err.value;
    } else {
      throw err;
    }
  });
};
