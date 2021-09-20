var original = global.setTimeout;
global.setTimeout = function (cb, ms) {
  original(cb, ms / 100);
};
