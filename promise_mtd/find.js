'use strict';

/**
 * find –– call promise step by step, and push res in array
 * @param  {Array<any>} data
 * @param  {function(el, index)}
 * @return {Promise<any> | Promise<undefined>}
 */
module.exports = function (data, promiseHandler) {
  var start = Promise.resolve();
  for (let i = 0, l = data.length; i < l; i++) {
    let el = data[i];
    start = start.then(() => {
      return promiseHandler(el, i);
    }).then((res) => {
      if (res) {
        throw new Stop(el);
      }
    });
  }

  return start.then(() => list).catch(err => {
    if (err instanceof Stop) {
      return err.value;
    } else {
      throw err;
    }
  });
};


class Stop extends Error {
  constructor(val) {
    super(val);
    this._val = val;
  }

  get value() {
    return this._val;
  }
}