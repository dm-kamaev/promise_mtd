
const { all } = require('../../index.js');

describe('all', function () {

  it('array', async function () {
    const list = [1, 2, 3, 4, 5, 6];
    const input = list.map(el => {
      return new Promise((resolve) => {
        expect(el).toEqual(expect.any(Number));
        setTimeout(() => {
          resolve(el);
        }, el*1000);
      });
    });

    expect.assertions(6+1);

    const output = await all(input);
    expect(output).toEqual(list);
  });


  it('hash', async function () {
    const list = [1, 2, 3, 4, 5, 6];
    const input =  {};
    list.forEach(el => {
      input[el] = new Promise((resolve) => {
        expect(el).toEqual(expect.any(Number));
        setTimeout(() => {
          resolve(el);
        }, el*1000);
      });
    });

    expect.assertions(6+1);

    const output = await all(input);
    expect(output).toEqual({ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 });
  });

});