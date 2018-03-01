'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _join = require('../../../common/join');

var _join2 = _interopRequireDefault(_join);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getClassNames = function getClassNames(props, state, CLASS_NAME) {
  var className = props.className,
      theme = props.theme,
      orientation = props.orientation,
      rtl = props.rtl,
      showButtons = props.showButtons,
      tickBarPosition = props.tickBarPosition;
  var focused = state.focused;


  return (0, _join2.default)(CLASS_NAME, className, CLASS_NAME + '--' + orientation + '-orientation', tickBarPosition === '' + tickBarPosition ? CLASS_NAME + '--tick-bar-' + orientation + '-' + tickBarPosition : '', CLASS_NAME + '--theme-' + theme, focused && CLASS_NAME + '--focused', rtl && CLASS_NAME + '--rtl', showButtons && CLASS_NAME + '--with-buttons');
};

exports.default = getClassNames;