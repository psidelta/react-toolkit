'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ComboBox = require('../ComboBox');

var _ComboBox2 = _interopRequireDefault(_ComboBox);

var _List = require('../List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
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

describe('expanded/collapse', function () {
  describe('controled', function () {
    it('should be used insted of state', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { defaultExpanded: false, expanded: true }));
      expect(wrapper.instance().getExpanded()).to.be.true;
    });
    it('doesn\'t change when a change is triggered', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { defaultExpanded: false, expanded: true }));
      wrapper.instance().setExpanded(false);
      expect(wrapper.instance().getExpanded()).to.be.true;
      // state should not be changed
      expect(wrapper.state().expanded).to.be.false;
    });
  });

  describe('uncontroled', function () {
    it('changes state when changeExpanded is called', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { defaultExpanded: false }));
      expect(wrapper.instance().getExpanded()).to.be.false;
      wrapper.instance().setExpanded(true);
      expect(wrapper.instance().getExpanded()).to.be.true;
    });
  });

  describe('onExpandedChange', function () {
    it('is called when expanded changes', function () {
      var onExpandedChange = sinon.spy();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { onExpandedChange: onExpandedChange }));
      expect(onExpandedChange.called).to.be.false;
      wrapper.instance().setExpanded(true);
      expect(onExpandedChange.called).to.be.true;
    });
  });

  describe('list', function () {
    it('renders only when expanded is true', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { expanded: true }));
      expect(wrapper.find(_List2.default)).to.have.length(1);
      wrapper.setProps({ expanded: false });
      expect(wrapper.find(_List2.default)).to.have.length(0);
    });
  });

  describe('expandOnClick', function () {
    it('changes expanded from false to true when combo is clicked', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { defaultExpanded: false }));
      expect(wrapper.find(_List2.default)).to.have.length(0);
      wrapper.simulate('click');
      expect(wrapper.find(_List2.default)).to.have.length(1);
    });
  });

  describe('collapseOnEscape', function () {
    it('changes expanded from false to true when combo is clicked', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { defaultExpanded: true }));
      expect(wrapper.find(_List2.default)).to.have.length(1);
      wrapper.simulate('keyDown', { key: 'Escape' });
      expect(wrapper.find(_List2.default)).to.have.length(0);
    });
  });

  describe('onCollapse', function () {
    it('is called when exapnded changes from true to false', function () {
      var onCollapse = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { onCollapse: onCollapse, defaultExpanded: true }));
      wrapper.instance().collapse();
      expect(onCollapse.called).to.be.true;
    });
  });

  describe('onExpand', function () {
    it('is called when exapnded changes from true to false', function () {
      var onExpand = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { onExpand: onExpand, defaultExpanded: false }));
      wrapper.instance().expand();
      expect(onExpand.called).to.be.true;
    });
  });

  describe('expandOnTextChange', function () {
    it('expands list when text is changed by input', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { defaultExpanded: false }));
      expect(wrapper.find(_List2.default)).to.have.length(0);
      wrapper.instance().handleTextChange('hello');
      expect(wrapper.find(_List2.default)).to.have.length(1);
    });
  });

  describe('ArrowUp and ArrowDown', function () {
    it('expands list if collapseed', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, { defaultExpanded: false }));
      wrapper.instance().navigateToNextItem();
      expect(wrapper.instance().getExpanded()).to.be.true;
    });
  });

  describe('collapseOnSelectWithEnter', function () {
    it('collapses when there is an active item selected, list is expanded', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, {
        collapseOnSelectWithEnter: true,
        enableListNavigation: true,
        defaultExpanded: true,
        enableNavigation: true,
        multiple: false,
        defaultActiveItem: 1,
        dataSource: [{ id: 1 }]
      }));
      wrapper.simulate('keyDown', { key: 'Enter' });
      expect(wrapper.instance().getExpanded()).to.be.false;
    });
  });
});