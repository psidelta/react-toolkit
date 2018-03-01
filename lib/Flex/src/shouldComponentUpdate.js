'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shallowequal = require('../../common/shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (inst, nextProps, nextState) {
  var props = inst.props;
  var state = inst.state;

  if (nextProps.shouldComponentUpdate) {
    return nextProps.shouldComponentUpdate({
      nextProps: nextProps,
      props: props,
      nextState: nextState,
      state: state
    });
  }

  return true;
  // return !equal(nextProps, props) || !equal(nextState, state);
};