'use strict';

var _valueUtils = require('../../utils/value-utils');

describe('getPossitionOfValueBasedOnLimits logic', function () {
  it('should return procentual position of tick between start and end values', function () {
    var tickValue = 5,
        startValue = -15,
        endValue = 15;
    var tickPosition = (0, _valueUtils.getPossitionOfValueBasedOnLimits)(tickValue, { startValue: startValue, endValue: endValue });
    expect(tickPosition).to.equal(0.667);
  });

  it('should return procentual position of tick between reversed start and end values', function () {
    var tickValue = 5,
        startValue = 15,
        endValue = -15;
    var tickPosition = (0, _valueUtils.getPossitionOfValueBasedOnLimits)(tickValue, { startValue: startValue, endValue: endValue });
    expect(tickPosition).to.equal(0.333);
  });

  it('should support ticks outside of range', function () {
    var tickValue = 1000;
    var startValue = 15,
        endValue = -15;
    var tickPosition = (0, _valueUtils.getPossitionOfValueBasedOnLimits)(tickValue, { startValue: startValue, endValue: endValue });
    expect(tickPosition).to.equal(0);

    tickValue = -1000;
    tickPosition = (0, _valueUtils.getPossitionOfValueBasedOnLimits)(tickValue, { startValue: startValue, endValue: endValue });
    expect(tickPosition).to.equal(1);
  });

  it('should support ticks on the edge', function () {
    var tickValue = void 0,
        tickPosition = void 0;
    var startValue = 15,
        endValue = -15;

    tickValue = 15;
    tickPosition = (0, _valueUtils.getPossitionOfValueBasedOnLimits)(tickValue, { startValue: startValue, endValue: endValue });
    expect(tickPosition).to.equal(0);

    tickValue = -15;
    tickPosition = (0, _valueUtils.getPossitionOfValueBasedOnLimits)(tickValue, { startValue: startValue, endValue: endValue });
    expect(tickPosition).to.equal(1);
  });
}); /**
     * Copyright 2015-present Zippy Technologies
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *   http://www.apache.org/licenses/LICENSE-2.0
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */