
const { setImmediate } = require('../index.js');

describe('setImmediate', function () {

  it('call', async function () {
    expect.assertions(1);
    await setImmediate();
    expect(true).toEqual(true);
  });

});