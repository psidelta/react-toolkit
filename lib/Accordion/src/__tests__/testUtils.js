'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = undefined;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = function render(cmp) {
  var targetNode = document.createElement('div');

  targetNode.style.height = '600px';
  targetNode.style.width = '1000px';
  document.body.appendChild(targetNode);

  var instance = _reactDom2.default.render(cmp, targetNode);

  instance.unmount = function () {
    _reactDom2.default.unmountComponentAtNode(targetNode);
    document.body.removeChild(targetNode);
  };

  return instance;
};

exports.default = render;
exports.render = render;