'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var normalizeRegionOffset = function normalizeRegionOffset(offset) {
  if (typeof offset === 'number') {
    return {
      top: offset,
      left: offset,
      right: offset,
      bottom: offset
    };
  }

  return offset;
};

exports.default = normalizeRegionOffset;