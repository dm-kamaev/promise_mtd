/**
 * while
 * @param  {Function} condition - condition() => boolean, sync action
 * @param  {Function} action -     action() => Promise
 * @return {Promise}
 */
module.exports = function (condition, action) {
  var result = condition();

  var next = () => {
    if (!condition()) {
      return;
    } else {
      return action().then(next);
    }
  };
  return action().then(next);
};

