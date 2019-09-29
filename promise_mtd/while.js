/**
 * while
 * @param  {Function} condition: condition() => boolean, sync action
 * @param  {Function} action:     action() => Promise
 * @return {Promise}
 */
module.exports = function (condition, action) {
  return wrap(function loop(actionResult) {
    if (condition(actionResult)) {
      return wrap(action).then(loop);
    }
  });
}

// EXAMPLE USE:
/*promise_api.while() => {
  return count < 5;
}, () => {
  count++;
}).then(() => {
  console.log(count);
  //=> 5
});*/


/**
 * wrap - fn to Promise
 * @param  {Function} fn() => Promise
 * @return {Promise}
 */
const wrap = function(fn) {
  return new Promise((resolve) => {
    resolve(fn());
  });
};