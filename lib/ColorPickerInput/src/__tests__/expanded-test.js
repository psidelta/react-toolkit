'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ColorPickerInput = require('../ColorPickerInput');

var _ColorPickerInput2 = _interopRequireDefault(_ColorPickerInput);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('expanded', function () {
  it('uses defaultExpanded as default value', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPickerInput2.default, {
      defaultExpanded: true
    }));
    expect(wrapper.instance().getExpanded()).to.be.true;
  });
  it('updates exapnded when uncontrolled', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPickerInput2.default, {
      defaultExpanded: true
    }));
    wrapper.instance().handleExpandButtonClick();
    expect(wrapper.instance().getExpanded()).to.be.false;
  });
  it('doesn\'t update expanded when controlled', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPickerInput2.default, {
      defaultExpanded: true,
      expanded: true
    }));
    wrapper.instance().handleExpandButtonClick();
    expect(wrapper.instance().getExpanded()).to.be.true;
  });
  it('collapses when value changes if `collapseOnValueChange` is true', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPickerInput2.default, {
      collapseOnValueChange: true,
      defaultExpanded: true
    }));
    expect(wrapper.instance().getExpanded()).to.be.true;
    wrapper.instance().setValue('#fff');
    expect(wrapper.instance().getExpanded()).to.be.false;
  });
  it('onExpandChange is called when expand changes', function () {
    var onExpandChange = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPickerInput2.default, {
      defaultExpanded: true,
      onExpandChange: onExpandChange
    }));
    wrapper.instance().setExpanded(false);
    expect(onExpandChange.called).to.be.true;
  });
  it('expandOnFocus expands the component when it receives focus', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPickerInput2.default, {
      expandOnFocus: true,
      defaultExpanded: false
    }));
    wrapper.instance().handleFocus();
    expect(wrapper.instance().getExpanded()).to.be.true;
  });

  it('renderExpandButton overwrites expand button by returning jsx', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPickerInput2.default, {
      renderExpandButton: function renderExpandButton() {
        return _react2.default.createElement('div', { id: 'customExpandButton' });
      }
    }));
    expect(wrapper.find('#customExpandButton')).to.have.length(1);
  });

  it('renderExpandButton overwrites expand button my mutating buttonProps', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ColorPickerInput2.default, {
      renderExpandButton: function renderExpandButton(_ref) {
        var buttonProps = _ref.buttonProps;

        buttonProps.id = "customExpandButton";
      }
    }));
    expect(wrapper.find('#customExpandButton')).to.have.length(1);
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