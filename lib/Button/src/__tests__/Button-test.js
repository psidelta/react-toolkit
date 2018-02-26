'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Button', function () {
  it('onClick is called when button is clicked', function () {
    var onClick = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { onClick: onClick }));
    wrapper.simulate('click');
    expect(onClick.called).to.be.true;
  });
  it('toggles between pressed true and false onclick when pressed has value', function () {
    var onToggle = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { onToggle: onToggle, defaultPressed: false }));
    expect(wrapper.instance().isPressed()).to.be.false;
    wrapper.simulate('click');
    expect(wrapper.instance().isPressed()).to.be.true;
    expect(onToggle.called).to.be.true;
  });
  it('onActivate is called when the button receives mouse down', function () {
    var onActivate = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { onActivate: onActivate }));
    wrapper.simulate('mouseDown');
    expect(onActivate.called).to.be.true;
  });
  it('onDeactivate is called whe button is active and registeres a mouseUp on global', function () {
    var mouseupEvent = new CustomEvent('mouseup', { bubbles: true });
    var onDeactivate = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { onDeactivate: onDeactivate }));
    wrapper.simulate('mouseDown');
    global.dispatchEvent(mouseupEvent);
    expect(onDeactivate.called).to.be.true;
  });
  it('style is applied on buton', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Button2.default, { id: 'button', style: { color: 'red' } }));
    expect(wrapper.find('#button').props().style.color).to.equal('red');
  });
  it('calls style if a function and applies the style on button', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Button2.default, { id: 'button', style: function style() {
        return { color: 'red' };
      } }));
    expect(wrapper.find('#button').props().style.color).to.equal('red');
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