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

var bodyClassName = '.' + rootClassName + '__title-bar';

describe('titleBar', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, null));
  });

  it('should not render titleBar if false', function () {
    expect(wrapper.find(bodyClassName)).to.have.length(1);
    wrapper.setProps({ titleBar: false });
    expect(wrapper.find(bodyClassName)).to.have.length(0);
  });

  xdescribe('jsx', function () {
    it('should render jsx insted of titlebar', function () {
      wrapper.setProps({ titleBar: _react2.default.createElement('div', { id: 'customTitleBarId' }) });
      expect(wrapper.find('#customTitleBarId')).to.have.length(1);
      expect(wrapper.find(bodyClassName)).to.have.length(0);
    });
  });

  describe('function', function () {
    it('should be called with domProps and props', function () {
      var titleBar = sinon.spy();
      wrapper.setProps({ data: 'customData' });
      wrapper.setProps({ titleBar: titleBar });

      expect(titleBar.called).to.be.true;
      expect(titleBar.args[0][0].className).to.equal(rootClassName + '__title-bar');
      expect(titleBar.args[0][1].data).to.equal('customData');
    });

    it('should render titlebar with mutated domProps', function () {
      var titleBar = function titleBar(domProps) {
        domProps.id = 'titleBarId';
      };
      wrapper.setProps({ titleBar: titleBar });
      expect(wrapper.find('#titleBarId')).to.have.length(1);
    });
  });
});