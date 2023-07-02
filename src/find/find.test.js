
const { find } = require('../../index.js');

describe('find', function () {

  it('find 2', async function () {
    const result = await find([0, 1, 2, 3, 4], function (el) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(el === 2);
        }, el*1000);
      });
    });

    expect(result).toEqual(2);
  });

  it('find 2 without timeout', async function () {
    const result = await find([1,2,3], async function (el, i) {
      return el === 2;
    });

    expect(result).toEqual(2);
  });

  it('find first 2', async function () {
    const list = [{ id: 'a', val: 0 }, { id: 'b', val: 1 }, { id: 'c', val: 2 }, { id: 'd', val: 3 }, { id: 'e', val: 4 }, { id: 'f', val: 2 }, { id: 'g', val: 10 },]
    const result = await find(list, function (el, i) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(el.val === 2);
        }, (list.length-i)*1000);
      });
    });

    expect(result.val).toEqual(2);
    expect(result.id).toEqual('c');
  });

  it('find undefined', async function () {
    const result = await find([0, 1, 2, 3, 4], function (el) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(el === 100);
        }, el*1000);
      });
    });

    expect(result).toBeUndefined();
  });

  it('reject error', async function () {
    expect.assertions(1);
    try {
      await find([0, 1, 2, 3, 4], function (el) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (el === 4) {
              reject(new Error('stop'));
            } else {
              resolve();
            }
          }, el*1000);
        });
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

});