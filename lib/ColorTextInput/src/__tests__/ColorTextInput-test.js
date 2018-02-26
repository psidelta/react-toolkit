'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ColorTextInput = require('../ColorTextInput');

var _ColorTextInput2 = _interopRequireDefault(_ColorTextInput);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('value', function () {
  describe('onChange', function () {
    it('is called only when a valid color is entered', function () {
      var onChange = sinon.spy();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorTextInput2.default, { onChange: onChange }));
      wrapper.instance().handleTextChange('hello');
      expect(onChange.called).to.be.false;
      wrapper.instance().handleTextChange('#hello');
      expect(onChange.called).to.be.false;
      wrapper.instance().handleTextChange('#fff');
      expect(onChange.called).to.be.true;
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

describe('onTextChange', function () {
  it('is called when ever text is changed', function () {
    var onTextChange = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorTextInput2.default, { onTextChange: onTextChange }));
    wrapper.instance().handleTextChange('#hello');
    expect(onTextChange.called).to.be.true;
  });
});

describe('input props', function () {
  it('inputProps get applied on input', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorTextInput2.default, { inputProps: { id: 'input' } }));
    expect(wrapper.find('#input')).to.have.length(1);
  });
  it('inputStyle get applied on input', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorTextInput2.default, {
      inputStyle: { color: 'red' },
      inputProps: { id: 'input' }
    }));
    expect(wrapper.find('#input').at(0).props().style.color).to.equal('red');
  });
});

describe('colorPreview props', function () {
  it('colorPreviewProps gets applied on color preview', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorTextInput2.default, {
      colorPreviewProps: { id: 'input' }
    }));
    expect(wrapper.find('#input')).to.have.length(1);
  });
  it('colorPreviewStyle gets applied on color preview', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorTextInput2.default, {
      colorPreviewProps: { id: 'input' },
      colorPreviewStyle: { color: 'red' }
    }));
    expect(wrapper.find('#input').at(0).props().style.color).to.equal('red');
  });
  it('renderColorPreview overwrites color preview render', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorTextInput2.default, {
      renderColorPreview: function renderColorPreview() {
        return _react2.default.createElement('div', { id: 'colorPreview' });
      }
    }));
    expect(wrapper.find('#colorPreview')).to.have.length(1);
  });
  it('renderColorPreview overwrites color preview by mutating domProps', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorTextInput2.default, {
      renderColorPreview: function renderColorPreview(_ref) {
        var domProps = _ref.domProps;

        domProps.id = "colorPreview";
      }
    }));
    expect(wrapper.find('#colorPreview')).to.have.length(1);
  });
});