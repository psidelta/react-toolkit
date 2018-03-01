'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDom = require('react-dom');

var renderInDOM = function renderInDOM(comp) {
  var domTarget = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

  var target = document.createElement('div');
  domTarget.appendChild(target);

  var wrapper = (0, _reactDom.render)(comp, target);

  return {
    wrapper: wrapper,
    wrapperNode: (0, _reactDom.findDOMNode)(wrapper),
    target: target,
    unmount: function unmount() {
      (0, _reactDom.unmountComponentAtNode)(target);
      document.body.removeChild(target);
    }
  };
};

exports.default = renderInDOM;