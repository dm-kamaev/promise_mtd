
const { async_while } = require('../index.js');

describe('async_while', function () {

  it('emulation cycle for (0..9) v1', async function () {
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


  it('emulation cycle for (0..9) v2', async function () {
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


  it('set limit iteration for v1', async function () {
    let i = 0;
    expect.assertions(1);
    try {
      await async_while(() => true, function () {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, (i++)*1000);
        });
      }, { limit: 20 });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });


  it('set limit iteration for v2', async function () {
    let i = 0;
    expect.assertions(1);
    try {
      await async_while(function () {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, (i++)*1000);
        });
      }, { limit: 20 });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

});