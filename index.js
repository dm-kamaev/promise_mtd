#!/usr/local/bin/node

'use strict';

const promise_mthds = module.exports;

promise_mthds.foreach = promise_mthds.forEach = require('./promise_mtd/foreach.js');

promise_mthds.map = require('./promise_mtd/map.js');

promise_mthds.transform = require('./promise_mtd/transform.js');

promise_mthds.while = require('./promise_mtd/while.js');

promise_mthds.parallel = require('./promise_mtd/parallel.js')


