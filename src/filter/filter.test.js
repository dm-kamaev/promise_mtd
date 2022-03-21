
const { filter } = require('../../index.js');

describe('filter', function () {

  it('only even', async function () {
    const output = await filter([1,2,3,4,5,6], function (el) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve((el % 2) === 0);
        }, el*1000);
      });
    });
    expect(output).toEqual([2, 4, 6]);
  });

});