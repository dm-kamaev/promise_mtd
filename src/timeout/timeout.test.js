const { timeout } = require('../../index.js');

jest.spyOn(global, 'setTimeout');

describe('timeout', function () {

  it('call', async function () {
    await timeout(500);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

});