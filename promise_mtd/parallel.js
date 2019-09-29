'use strict';

/**
 * parallel
 * @param  {Array<any>} data
 * @param  {number} limit
 * @param  {function(el, i): Promise } promise_handler]
 * @return {Promise}
 */
module.exports = function (data, limit, promise_handler) {
  if (!limit) {
    throw new Error('required limit');
  }
  const next = () => {
    if (data[current]) {
      var d = data[current];
      current++;
      return promise_handler(d, current).then(next);
    } else {
      return;
    }
  };

  var current = limit;
  var arr = [];
  for (let i = 0, l = data.length; i < l; i++) {
    if (i < limit) {
      arr.push(
        Promise.resolve().then(() => promise_handler(data[i], i)).then(next)
      );
    }
  }
  return Promise.all(arr);
};

// EXAMPLE
// void async function() {
//   try {
//     await promise_mthds.parallel([ 3000, 3000, 3000, 2000, 2000, 2000, 1000], 3, async function(t, i) {
//       return new Promise((resolve) => {
//         // if (i === 4) {
//         //   throw new Error('stop');
//         // }
//         setTimeout(() => {
//           console.log(t);
//           resolve();
//         }, t);
//       });
//     });
//   } catch (err) {
//     console.log('Raise', err);
//   }
// }();
