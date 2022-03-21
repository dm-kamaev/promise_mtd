
const { parallel } = require('../../index.js');

describe('parallel', function () {

  it('call with pool = 3 (deprecated variant)', async function () {
    const list = [6,1,3, 0.5, 7];

    const result = [];
    await parallel(list, 3, function (el) {
      return new Promise((resolve) => {
        setTimeout(() => {
          result.push(el);
          resolve(el);
        }, el*1000);
      });
    });
    expect(result).toEqual([1, 0.5, 3, 6, 7]);
  });

  it('call with pool = 3', async function () {
    const list = [6,1,3, 0.5, 7];

    const result = [];
    await parallel(list, { pool: 3 }, function (el) {
      return new Promise((resolve) => {
        setTimeout(() => {
          result.push(el);
          resolve(el);
        }, el*1000);
      });
    });
    expect(result).toEqual([1, 0.5, 3, 6, 7]);
  });


});