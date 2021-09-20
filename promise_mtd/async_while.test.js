
const async_while = require('./async_while.js');

describe('async_while', function () {

  it('emulation cycle for (0..9) via 2 arguments', async function () {
    const result = [];
    let i = 0;
    await async_while(() => i < 10, function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          result.push(i++);
          resolve();
        }, i*1000);
      });
    });
    expect(result).toEqual([0,1,2,3,4,5,6,7,8,9]);
  });


  it('emulation cycle for (0..9) - via 1 arguments', async function () {
    const result = [];
    let i = 0;
    await async_while(function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          result.push(i++);
          resolve(i < 10);
        }, i * 1000);
      });
    });
    expect(result).toEqual([0,1,2,3,4,5,6,7,8,9]);
  });


});