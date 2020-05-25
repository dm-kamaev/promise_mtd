'use strict';


/**
 * all
 * @param  {Array<Promise> | Object<{ key: Promise }>} data
 * @return {Promise}
 */
module.exports = function (data) {
  if (data instanceof Array) {
    return Promise.all(data);
  }

  var keys = Object.keys(data);
  var values = keys.map(k => data[k]);

  var res = {};
  return Promise.all(values).then(list => {
    list.forEach((el, i) => res[keys[i]] = el);
    return res;
  });
};


// EXAMPLE
// void async function() {
//   try {
//     var t1 = new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(2000);
//       }, 2000);
//     });

//     var t2 = new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(1000);
//       }, 1000);
//     });



//     console.log(await promise_mtd.all({ t1, t2 }));

//     // as Promise.all
//     console.log(await promise_mtd.all([ t1, t2 ]));
//   } catch (err) {
//     console.log('Raise', err);
//   }
// }();
