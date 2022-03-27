
const { transformParallel } = require('../../index.js');

describe('transformParallel', function () {

  it('only even', async function () {
    var result = await transformParallel([ 1, 2, 3, 4, 5, 6], { pool: 3 }, function (el) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (el % 2 === 0) {
            resolve(el);
          } else {
            resolve(null);
          }
        }, el*1000);
      });
    });
    expect(result).toEqual([2,4, 6]);
  });

  it('call without pool', async function () {

    await expect(async () => {
      return await transformParallel([1, 2, 3, 4, 5, 6], function (el) {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (el % 2 === 0) {
              resolve(el);
            } else {
              resolve(null);
            }
          }, el * 1000);
        });
    })}).rejects.toThrow(Error);
  });


});