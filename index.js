'use strict';

const promise_mtd = module.exports;

promise_mtd.foreach = promise_mtd.forEach = require('./src/foreach/foreach.js');
promise_mtd.forEachParallel = require('./src/foreach/foreach_parallel.js');

promise_mtd.map = require('./src/map/map.js');
promise_mtd.mapParallel = require('./src/map/map_parallel.js');

promise_mtd.filter = require('./src/filter/filter.js');
promise_mtd.filterParallel = require('./src/filter/filter_parallel.js');

promise_mtd.find = require('./src/find/find.js');
promise_mtd.findParallel = require('./src/find/find_parallel.js');

promise_mtd.reduce = require('./src/reduce/reduce.js');

promise_mtd.transform = require('./src/transform/transform.js');
promise_mtd.transformParallel = require('./src/transform/transform_parallel.js');

promise_mtd.while_ = require('./src/while/while.js');

promise_mtd.all = require('./src/all/all.js');

promise_mtd.retry = require('./src/retry/retry.js');

promise_mtd.setImmediate = promise_mtd.set_immediate = require('./src/setImmediate/setImmediate.js');

promise_mtd.timeout = require('./src/timeout/timeout.js');
