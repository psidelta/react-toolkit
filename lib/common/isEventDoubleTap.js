"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dblTouchTapMaxDelay = 300;
var latestTouchTap = {
  time: 0,
  target: null
};

function isEventDoubleTap(event) {
  var touchTap = {
    time: new Date().getTime(),
    target: event.currentTarget
  };
  var isFastDblTouchTap = touchTap.target === latestTouchTap.target && touchTap.time - latestTouchTap.time < dblTouchTapMaxDelay;
  latestTouchTap = touchTap;
  return isFastDblTouchTap;
}

exports.default = isEventDoubleTap;