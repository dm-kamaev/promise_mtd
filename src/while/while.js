/**
 * while
 * @return {Promise}
 */
module.exports = function () {
  if ((arguments.length === 3 && typeof arguments[arguments.length - 1] === 'object') || (arguments.length === 2 && typeof arguments[arguments.length - 1] === 'function')) {
    const condition = arguments[0], action = arguments[1], params = arguments[2] || { number: Infinity };
    return v1(condition, action, params);
  } else {
    const action = arguments[0], params = arguments[1] || { number: Infinity };
    return v2(action, params);
  }
};

/**
 * v1- while
 * @param  {Function} condition - condition() => boolean, sync action
 * @param  {Function} action -     action() => Promise
 * @param  {{ limit: number }}} params -  limit: number
 * @return {Promise}
 */
function v1(condition, action, { limit = Infinity }) {
  const result = condition();

  let count_iteration = 1;

  if (!result) {
    return;
  }

  const next = () => {
    if (count_iteration > limit) {
      throw new Error('Too many iterations for. Limit - '+limit);
    }
    if (!condition()) {
      return;
    } else {
      count_iteration++;
      return action().then(next);
    }
  };
  return action().then(next);
}


/**
 * v2 - while
 * @param  {Function} action - action() => Promise
 * @param  {{ limit: number }} params - -  limit of iterations
 * @return {Promise}
 */
function v2(action, { limit = Infinity }) {
  let count_iteration = 1;

  const next = (res) => {
    if (count_iteration > limit) {
      throw new Error('Too many iterations for. Limit - '+limit);
    }
    if (res) {
      count_iteration++;
      return action().then(next);
    } else {
      return;
    }
  };

  return action().then(next);
}