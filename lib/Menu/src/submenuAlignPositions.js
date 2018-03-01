'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var alignPositionLTR = [
// align to right
'tl-tr', 'bl-br',

// align to left
'tr-tl', 'br-bl'];

var alignPositionRTL = [
// align to left
'tr-tl', 'br-bl',

// align to right
'tl-tr', 'bl-br'];

var alignOffsetLTR = [{ x: -7, y: 5 }, // ok
{ x: -7, y: -5 }, // ok
{ x: 7, y: 5 }, // ok
{ x: 7, y: -5 // ok
}];
var alignOffsetRTL = [{ x: 7, y: 5 }, // ok
{ x: 7, y: -5 }, // ok
{ x: -7, y: 5 }, // ok
{ x: -7, y: -5 // ok
}];

exports.alignPositionLTR = alignPositionLTR;
exports.alignPositionRTL = alignPositionRTL;
exports.alignOffsetLTR = alignOffsetLTR;
exports.alignOffsetRTL = alignOffsetRTL;