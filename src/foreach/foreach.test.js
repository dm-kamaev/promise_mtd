
const { forEach } = require('../../index.js');

describe('forEach', function () {

  it('only even', async function () {
    const input = [1, 2, 3, 4, 5, 6];
    const output = [];
    await forEach(input, function (el) {
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