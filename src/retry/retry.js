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
  const iterationWithRetry = function (...argv) {
    return fn.apply(fn, argv).catch(err => {
      if ((settings.attemp - 1) < 0) {
        throw err;
      }
      if (!((settings.ifError && err instanceof settings.ifError) || !settings.ifError)) {
        throw err;
      }
      return Promise.resolve().then(() => {
        if (settings.delay.ms) {
          return timeout(settings.delay.ms);
        }
      }).then(() => {
        settings.attemp--;
        return iterationWithRetry.apply(iterationWithRetry, argv)
      });
    });
  };

  return iterationWithRetry;
}


