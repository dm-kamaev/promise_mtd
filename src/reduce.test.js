
const { reduce } = require('../index.js');

describe('reduce', function () {

  it('sum up numbers', async function () {
    var result = await reduce([0, 1, 2, 3, 4], function (previousValue, currentValue, index, array) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(previousValue + currentValue);
          }, currentValue*1000);
        });
      }, 0);
    expect(result).toEqual(10);
  });

});