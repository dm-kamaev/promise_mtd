const { retry, timeout } = require('../../index.js');

describe('timeout', function () {

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('call with tries', async function () {
    let counter = 0;
    function main() {
      return new Promise((resolve, reject) => {
        if (++counter < 3) {
          return reject(new Error('STOP'));
        }
        resolve();
      }).then(() => timeout(100));
    }
    const fn = retry(main, { attemp: 3 });
    await fn();
    expect(counter).toBe(3);
  });

  it('call with tries with params', async function () {
    let counter = 0;
    function main(a, b) {
      return new Promise((resolve, reject) => {
        if (++counter < 3) {
          return reject(new Error('STOP'));
        }
        resolve();
      }).then(() => timeout(100)).then(() => a+b);
    }
    const fn = retry(main, { attemp: 3 });
    expect(await fn(1, 2)).toBe(3);
    expect(counter).toBe(3);
  });

  it('call with tries (reject error)', async function () {
    let counter = 0;
    function main() {
      return new Promise((resolve, reject) => {
        if (++counter < 10) {
          return reject(new Error('STOP'));
        }
        resolve();
      }).then(() => timeout(100));
    }
    const fn = retry(main, { attemp: 3 });

    await expect(fn).rejects.toThrow(Error);
  });

  // it('call with tries [success version]', async function () {
  //   let counter = 0;
  //   function main() {
  //     if (++counter < 3) {
  //       throw new Error('STOP');
  //     }
  //     return timeout(100);
  //   };
  //   const fn = retry(main, { attemp: 3 });
  //   await fn();
  //   expect(counter).toBe(3);
  // });

  it('call with tries and timeout: we catch checked specific type error [success version]', async function () {
    let counter = 0;
    class CustomError extends Error {}
    function main() {
      return new Promise((resolve, reject) => {
        if (++counter < 3) {
          return reject(new CustomError('STOP'));
        }
        resolve();
      }).then(() => timeout(100));
    }

    const fn = retry(main, { attemp: 3, delay: { ms: 200 }, ifError: CustomError, });
    await fn();
    expect(counter).toBe(3);
    expect(setTimeout).toHaveBeenCalledTimes(2+1);
  });

  it('call with tries and timeout: we catch checked specific type error [fail version]', async function () {
    class CustomError extends Error { }
    class CustomError2 extends Error { }
    function main() {
      return new Promise((_, reject) => {
        return reject(new CustomError2('STOP'));
      }).then(() => timeout(100));
    }

    const fn = retry(main, { attemp: 3, delay: { ms: 200 }, ifError: CustomError });
    await expect(fn).rejects.toThrow(CustomError2);
  });

});