'use strict';

const timeout = require('../timeout/timeout.js');

/*
TODO:
Perhaps it's worth implementing algorithm "increasing timeout":
Given: attemp = 3, step = 100ms
attemp = 1, timeout = 1 * 100ms
attemp = 2, timeout = 2 * 100ms
attemp = 3, timeout = 3 * 100ms
*/

/**
 * retry
 * @param  {AsyncFunction} fn
 * @param  {{ [attemp=2]: number, [delay]: { ms: number }, [ifError]: Error }} settings: ifError - if parameter not exist then intercept all errors and make retry. If exist check type error via instaceof
 * @return {any} - result of fn
 */
module.exports = function (fn, settings = { attemp: 2, delay: { ms: null }, ifError }) {
  settings.delay = settings.delay || { ms: null };
  const exec = function (...argv) {
    try {
      return fn.apply(fn, argv);
    } catch (err) {
      const call = () => exec.apply(exec, argv);

      if (settings.ifError) {
        if (err instanceof settings.ifError && settings.attemp - 1) {
          return repeat(settings, call);
        }
      } else {
        if (settings.attemp - 1) {
          return repeat(settings, call);
        }
      }
      throw err;
    }
  };

  return exec;
}


function repeat(settings, call) {
  const delay = settings.delay;
  settings.attemp--;
  if (delay.ms) {
    return timeout(delay.ms).then(call);
  }
  return call();
}