'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('children', function () {
  // inject the HTML fixture for the tests
  beforeEach(function () {
    var fixture = '\n      <div id="fixture">\n        <div id="target1" class="childrenTooltip" data-tooltip="<div id=\'customId\'></div>">\n          target 1\n        </div>\n        <div id="target2" class="childrenTooltip"> target 2 </div>\n      </div>\n    ';

    document.body.insertAdjacentHTML('afterbegin', fixture);
  });

  // remove the html fixture from the DOM
  afterEach(function () {
    document.body.removeChild(document.getElementById('fixture'));
  });

  it('should render jsx', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { children: _react2.default.createElement('div', { id: 'child' }) }));
    expect(wrapper.find('#child')).to.have.length(1);
  });

  describe('function', function () {
    it('accepts a function as children and it is called with activeTargetNode', function () {
      var children = sinon.spy();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { children: children }));
      expect(children.called).to.be.true;
    });
    it('called with correct param', function () {
      var children = sinon.spy();
      var mouseenterEvent = new CustomEvent('mouseenter', { bubbles: true });
      var target1 = document.getElementById('target1');
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { children: children, target: '.childrenTooltip' }));
      target1.dispatchEvent(mouseenterEvent);

      expect(children.args[1][0].targetNode).to.equal(target1);
    });
  });

  describe('defaults to data-tooltip', function () {
    it('renders what data-tooltip from active target', function () {
      var target1 = document.getElementById('target1');
      var mouseenterEvent = new CustomEvent('mouseenter', { bubbles: true });
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { target: '.childrenTooltip' }));
      target1.dispatchEvent(mouseenterEvent);
      var test = wrapper.instance().getChildrenProps();

      expect(test.dangerouslySetInnerHTML.__html).to.contain('customId');
    });
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