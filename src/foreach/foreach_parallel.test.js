
const { forEachParallel } = require('../../index.js');

describe('forEachParallel', function () {

  it('call with pool = 3', async function () {
    const list = [6,1,3, 0.5, 7];

    const result = [];
    await forEachParallel(list, { pool: 3 }, function (el) {
      return new Promise((resolve) => {
        setTimeout(() => {
          result.push(el);
          resolve(el);
        }, el*1000);
      });
    });
    expect(result).toEqual([1, 0.5, 3, 6, 7]);
  });

  it('call without pool', async function () {

    await expect(async () => { return await forEachParallel([6, 1, 3, 0.5, 7], function (el) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, el * 1000);
      });
    })}).rejects.toThrow(Error);
  });


});