'use strict';

const promise_mtd = module.exports;

promise_mtd.foreach = promise_mtd.forEach = require('./src/foreach.js');

promise_mtd.map = require('./src/map.js');

promise_mtd.filter = require('./src/filter.js');

promise_mtd.find = require('./src/find.js');

promise_mtd.reduce = require('./src/reduce.js');

promise_mtd.transform = require('./src/transform.js');

promise_mtd.async_while = promise_mtd.asyncWhile = require('./src/async_while.js');

promise_mtd.parallel = require('./src/parallel.js');

promise_mtd.all = require('./src/all.js');

promise_mtd.setImmediate = promise_mtd.set_immediate = require('./src/setImmediate.js');
