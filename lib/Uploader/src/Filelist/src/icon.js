'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileIcon = function fileIcon(_ref) {
  var style = _ref.style,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? 24 : _ref$size,
      className = _ref.className,
      _ref$extension = _ref.extension,
      extension = _ref$extension === undefined ? 'unknown' : _ref$extension;
  return _react2.default.createElement(
    'svg',
    {
      height: 24,
      viewBox: '0 0 24 24',
      className: className,
      width: 24,
      style: style,
      xmlns: 'http://www.w3.org/2000/svg'
    },
    _react2.default.createElement(
      'g',
      { fill: 'none', fillRule: 'evenodd' },
      _react2.default.createElement(
        'g',
        { fill: '#495E85', transform: 'translate(2)' },
        _react2.default.createElement('path', { d: 'M-4.28101998e-13,0 L12.6923077,0 L20,9.01694915 L20,28 L-4.28101998e-13,28 L-4.28101998e-13,0 Z M1,1 L1,27 L19,27 L19,9.21052632 L12.52,1 L1,1 Z' }),
        _react2.default.createElement('path', { d: 'M12,0 L20,10 L12,10 L12,0 Z M13,2 L13,9 L19,9 L13,2 Z' })
      ),
      _react2.default.createElement('rect', { width: '24', height: '12', y: '14', fill: '#5C8EEB' }),
      _react2.default.createElement(
        'text',
        { fill: '#E6EEFF', fontSize: '8', fontWeight: '700' },
        _react2.default.createElement(
          'tspan',
          { x: '4', y: '23' },
          extension
        )
      )
    )
  );
}; /**
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

exports.default = fileIcon;