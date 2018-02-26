'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootClassName = _Panel2.default.defaultProps.rootClassName; /**
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

var titleBarClassName = rootClassName + '__title-bar';

describe('titleBarPosition', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
  });

  it('should default to left', function () {
    expect(wrapper.props().titleBarPosition).to.equal('top');
  });

  it('adds correct classname', function () {
    var topClassName = '.' + rootClassName + '--title-bar-position-top';
    wrapper.setProps({ titleBarPosition: 'top' });
    expect(wrapper.find(topClassName)).to.have.length(1);

    var leftClassName = '.' + rootClassName + '--title-bar-position-left';
    wrapper.setProps({ titleBarPosition: 'left' });
    expect(wrapper.find(leftClassName)).to.have.length(1);

    var rightClassName = '.' + rootClassName + '--title-bar-position-right';
    wrapper.setProps({ titleBarPosition: 'right' });
    expect(wrapper.find(rightClassName)).to.have.length(1);

    var bottomClassName = '.' + rootClassName + '--title-bar-position-bottom';
    wrapper.setProps({ titleBarPosition: 'bottom' });
    expect(wrapper.find(bottomClassName)).to.have.length(1);
  });

  describe('rotated', function () {
    it('titleBar width should be equal to container height', function () {
      wrapper.setProps({ titleBarPosition: 'left' });
      wrapper.instance().onResize({ width: 20, height: 20 });
      expect(wrapper.find('.' + titleBarClassName).first().props().style.width).to.equal(20);
    });

    describe('left', function () {
      it('content paddingLeft should be equal to titleBar height', function () {
        wrapper.setProps({ titleBarPosition: 'left' });
        wrapper.instance().onTitleBarResize({ width: 20, height: 20 });
        expect(wrapper.find('.' + rootClassName).props().style.paddingLeft).to.equal(20);
      });
    });
    describe('right', function () {
      it('content paddingRight should be equal to titleBar height', function () {
        wrapper.setProps({ titleBarPosition: 'right' });
        wrapper.instance().onTitleBarResize({ width: 20, height: 20 });
        expect(wrapper.find('.' + rootClassName).props().style.paddingRight).to.equal(20);
      });
    });
  });
});