
const { transform } = require('../../index.js');

describe('transform', function () {

  it('only even', async function () {
    var result = await transform([ 1, 2, 3, 4, 5, 6], function (el) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (el % 2 === 0) {
            resolve(el);
          } else {
            resolve(null);
          }
        }, el*1000);
      });
    });
    expect(result).toEqual([2,4, 6]);
  });

});