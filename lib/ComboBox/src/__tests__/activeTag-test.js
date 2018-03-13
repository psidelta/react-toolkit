'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ComboBox = require('../ComboBox');

var _ComboBox2 = _interopRequireDefault(_ComboBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('activeTag', function () {
  it('should work controlled and uncontrolled behaviour of active tag', function () {
    var onActiveTagChange = sinon.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { defaultActiveTag: 20, onActiveTagChange: onActiveTagChange }));
    expect(wrapper.instance().getActiveTag()).to.equal(20);
    expect(onActiveTagChange.called).to.be.false;
    wrapper.instance().setActiveTag(30);
    expect(onActiveTagChange.called).to.be.true;
    expect(onActiveTagChange.args[0][0]).to.equal(30);
    expect(wrapper.instance().getActiveTag()).to.equal(30);
    wrapper.setProps({ activeTag: 25 });
    expect(wrapper.instance().getActiveTag()).to.equal(25);
    wrapper.instance().setActiveTag(30);
    expect(wrapper.instance().getActiveTag()).to.equal(25);
  });
});

describe('tagNavigation', function () {
  it('should update correct activeTag when arrowLeft and arrowRight are pressed', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
      enableTagNavigation: true,
      multiple: true,
      defaultActiveTag: 4,
      value: [1, 2, 3, 4, 5]
    }));
    var instance = wrapper.instance();

    instance.navigateToNextTag(-1);
    expect(instance.getActiveTag()).to.equal(3);
    instance.navigateToNextTag(-1);
    expect(instance.getActiveTag()).to.equal(2);
    instance.navigateToNextTag(-1);
    expect(instance.getActiveTag()).to.equal(1);
    instance.navigateToNextTag(-1);
    expect(instance.getActiveTag()).to.equal(null);
    instance.navigateToNextTag(-1);
    expect(instance.getActiveTag()).to.equal(5);

    instance.setActiveTag(3);
    instance.navigateToNextTag(1);
    expect(instance.getActiveTag()).to.equal(4);
    instance.navigateToNextTag(1);
    expect(instance.getActiveTag()).to.equal(5);
    instance.navigateToNextTag(1);
    expect(instance.getActiveTag()).to.equal(null);
    instance.navigateToNextTag(1);
    expect(instance.getActiveTag()).to.equal(null);
  });
  it('should remove active tag when Escape is pressed and list is already closed', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
      enableTagNavigation: true,
      multiple: true,
      expanded: false,
      defaultActiveTag: 4,
      value: [1, 2, 3, 4, 5]
    }));
    wrapper.simulate('keyDown', { key: 'Escape' });
    expect(wrapper.instance().getActiveTag()).to.be.null;
  });
});