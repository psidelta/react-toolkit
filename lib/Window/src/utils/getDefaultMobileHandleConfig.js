"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getDefaultMobileHandleConfig(titlePosition) {
  return {
    top: {
      t: { outside: true },
      tl: { outside: false },
      tr: { outside: false },
      l: { outside: false },
      bl: { outside: false },
      b: { outside: false },
      br: { outside: false },
      r: { outside: false }
    },
    left: {
      t: { outside: false },
      tl: { outside: false },
      tr: { outside: false },
      l: { outside: true },
      bl: { outside: false },
      b: { outside: false },
      br: { outside: false },
      r: { outside: false }
    },
    right: {
      t: { outside: false },
      tl: { outside: false },
      tr: { outside: false },
      l: { outside: false },
      bl: { outside: false },
      b: { outside: false },
      br: { outside: false },
      r: { outside: true }
    },
    bottom: {
      t: { outside: false },
      tl: { outside: false },
      tr: { outside: false },
      l: { outside: false },
      bl: { outside: false },
      b: { outside: true },
      br: { outside: false },
      r: { outside: false }
    }
  }[titlePosition];
}

exports.default = getDefaultMobileHandleConfig;