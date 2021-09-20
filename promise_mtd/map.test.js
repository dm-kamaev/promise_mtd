
const map = require('./map.js');

describe('map', function () {

  it('square it up', async function () {
    const result = await map([0, 1, 2, 3, 4], function (el) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(el**2);
        }, el*1000);
      });
    });
    expect(result).toEqual([0, 1, 4, 9, 16]);
  });

});