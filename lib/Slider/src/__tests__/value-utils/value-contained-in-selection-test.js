'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _valueUtils = require('../../utils/value-utils');

describe('isValueContainedBySelection logic', function () {
  var isContained = void 0;

  describe('normal range', function () {
    var baseConfig = {
      startValue: 0,
      endValue: 100
    };

    it('shuold support value in between currentValue and limit', function () {
      isContained = (0, _valueUtils.isValueContainedBySelection)(15, _extends({
        currentValue: 10,
        trackFillPosition: 'end'
      }, baseConfig));
      expect(isContained).to.be.true;

      isContained = (0, _valueUtils.isValueContainedBySelection)(15, _extends({
        currentValue: 10,
        trackFillPosition: 'start'
      }, baseConfig));

      expect(isContained).to.be.false;

      isContained = (0, _valueUtils.isValueContainedBySelection)(5, _extends({
        currentValue: 10,
        trackFillPosition: 'start'
      }, baseConfig));
      expect(isContained).to.be.true;
    });

    it('shuold return true for value on edges', function () {
      isContained = (0, _valueUtils.isValueContainedBySelection)(10, _extends({
        currentValue: 10
      }, baseConfig, {
        trackFillPosition: 'end'
      }));
      expect(isContained).to.be.true;

      isContained = (0, _valueUtils.isValueContainedBySelection)(100, _extends({
        currentValue: 10
      }, baseConfig, {
        trackFillPosition: 'end'
      }));

      expect(isContained).to.be.true;
    });
  });

  describe('reversed range', function () {
    var baseConfig = {
      startValue: 100,
      endValue: 0
    };

    it('shuold return true for value in between reversed range', function () {
      isContained = (0, _valueUtils.isValueContainedBySelection)(5, _extends({
        currentValue: 10
      }, baseConfig, {
        trackFillPosition: 'end'
      }));
      expect(isContained).to.be.true;

      isContained = (0, _valueUtils.isValueContainedBySelection)(5, _extends({
        currentValue: 10
      }, baseConfig, {
        trackFillPosition: 'start'
      }));
      expect(isContained).to.be.false;
    });

    it('shuold return true for value on reversed range edges', function () {
      isContained = (0, _valueUtils.isValueContainedBySelection)(0, _extends({
        currentValue: 10
      }, baseConfig, {
        trackFillPosition: 'end'
      }));
      expect(isContained).to.be.true;

      isContained = (0, _valueUtils.isValueContainedBySelection)(10, _extends({
        currentValue: 10
      }, baseConfig, {
        trackFillPosition: 'end'
      }));
      expect(isContained).to.be.true;
    });
  });
});