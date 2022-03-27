
const { mapParallel } = require('../../index.js');

describe('mapParallel', function () {

  it('square it up', async function () {
    const result = await mapParallel([4,3,2,1,0], { pool: 3 }, function (el) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(el**2);
        }, el*1000);
      });
    });
    expect(result).toEqual([16, 9, 4, 1, 0]);
  });

  it('call without pool', async function () {

    await expect(async () => {
      return await mapParallel([4, 3, 2, 1, 0], function (el) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(el**2);
          }, el * 1000);
        });
    })}).rejects.toThrow(Error);
  });


});