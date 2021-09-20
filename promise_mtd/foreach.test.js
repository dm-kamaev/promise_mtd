
const foreach = require('./foreach.js');

describe('foreach', function () {

  it('only even', async function () {
    const input = [1, 2, 3, 4, 5, 6];
    const output = [];
    await foreach(input, function (el) {
      return new Promise((resolve) => {
        setTimeout(() => {
          output.push(el);
          resolve();
        }, el*1000);
      });
    });
    expect(output).toEqual(input);
  });

});