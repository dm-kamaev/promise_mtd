
const find = require('./find.js');

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