
const { filterParallel } = require('../../index.js');

describe('filterParallel', function () {

  it('only even', async function () {
    const output = await filterParallel([1,2,3,4,5,6], { pool: 3 }, function (el) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve((el % 2) === 0);
        }, el*1000);
      });
    });
    expect(output).toEqual([2, 4, 6]);
  });

  it('call without pool', async function () {

    await expect(async () => {
      return await filterParallel([1, 2, 3, 4, 5, 6], function (el) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve((el % 2) === 0);
          }, el * 1000);
        });
    })}).rejects.toThrow(Error);
  });

});