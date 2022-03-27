
const { while_ } = require('../../index.js');

describe('while_', function () {

  it('emulation cycle for (0..9) v1', async function () {
    const result = [];
    let i = 0;
    await while_(() => i < 10, function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          result.push(i++);
          resolve();
        }, i*1000);
      });
    });
    expect(result).toEqual([0,1,2,3,4,5,6,7,8,9]);
  });

  it('nothing action v1', async function () {
    let i = 0;
    await while_(() => false, async function () {
      await timeout(i * 1000);
      i++;
    });
    expect(i).toBe(0);
  });


  it('emulation cycle for (0..9) v2', async function () {
    const result = [];
    let i = 0;
    await while_(function () {
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
      await while_(() => true, function () {
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
      await while_(function () {
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