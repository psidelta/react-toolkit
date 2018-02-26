'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Item = require('../Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Item', function () {
  it('calls onclick with id', function () {
    var onClick = sinon.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Item2.default, { className: 'item', id: 20, onClick: onClick }));
    wrapper.find('.item').at(0).simulate('click');
    expect(onClick.called).to.be.true;
    expect(onClick.args[0][0]).to.equal(20);
  });

  describe('selectedClassName and selectedStyle', function () {
    it('adds className and style only on selected items', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Item2.default, {
        selected: true,
        selectedClassName: 'selected',
        rootClassName: 'root',
        selectedStyle: { color: 'red' }
      }));
      expect(wrapper.find('.root--selected')).to.have.length(1);
      expect(wrapper.find('.root--selected').at(0).props().style.color).to.equal('red');
    });
  });

  describe('className', function () {
    it('adds correct state classnames and style', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Item2.default, { active: true, rootClassName: 'root' }));
      expect(wrapper.find('.root--active')).to.have.length(1);
    });
  });

  describe('disabled', function () {
    it('adds correct className', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Item2.default, { item: { disabled: true }, rootClassName: 'root' }));
      expect(wrapper.find('.root--disabled')).to.have.length(1);
    });

    it('does\'t call onClick', function () {
      var onClick = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Item2.default, { item: { disabled: true }, onClick: onClick }));
      wrapper.simulate('click');
      expect(onClick.called).to.be.false;
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