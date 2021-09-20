/**
 * while
 * @param  {Function} condition - condition() => boolean, sync action
 * @param  {Function} action -     action() => Promise
 * @return {Promise}
 */
module.exports = function (condition, action) {
  if (arguments.length === 2) {
    return v1(arguments[0], arguments[1]);
  } else {
    return v2(arguments[0]);
  }
};


function v1(condition, action) {
  var result = condition();

  if (!result) {
    return;
  }

  var next = () => {
    if (!condition()) {
      return;
    } else {
      return action().then(next);
    }
  };
  return action().then(next);
}

function v2(action) {
  var next = (res) => {
    if (res) {
      return action().then(next);
    } else {
      return;
    }
  };

  return action().then(next);
}