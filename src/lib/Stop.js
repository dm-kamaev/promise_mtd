'use strict';

module.exports = class Stop extends Error {
  constructor(val) {
    super(val);
    this._val = val;
  }

  get value() {
    return this._val;
  }
};

