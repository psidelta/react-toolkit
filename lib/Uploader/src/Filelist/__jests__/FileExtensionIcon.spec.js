'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _FileExtensionIcon = require('../src/FileExtensionIcon');

var _FileExtensionIcon2 = _interopRequireDefault(_FileExtensionIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('FileExtensionIcon', function () {
  it('should create instance of FileExtensionIcon', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileExtensionIcon2.default, null));
    expect(component.instance()).toBeInstanceOf(_FileExtensionIcon2.default);
  });

  it('should render with given file object', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileExtensionIcon2.default, { file: { name: 'myfile.png' } }));
    expect(component.text()).toContain('PNG');
  });

  it('should render with given extension object', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileExtensionIcon2.default, { extension: 'torrent' }));
    expect(component.text()).toContain('TORRENT');
  });

  it('should render with given extension and file object', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileExtensionIcon2.default, { file: { name: 'myfile.png' }, extension: 'torrent' }));
    expect(component.text()).toContain('TORRENT');
  });

  it('should support hidden dot for file extension', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileExtensionIcon2.default, { showStartingDot: false, extension: '.torrent' }));
    expect(component.text()).toContain('TORRENT');
  });

  xit('should support custom color mapping prop for file extensions', function () {
    var colorMapping = {
      torrent: 'blue',
      '.pdf': 'red'
    };

    var component = void 0;

    component = (0, _enzyme.mount)(_react2.default.createElement(_FileExtensionIcon2.default, { colors: colorMapping, extension: '.torrent' }));
    expect(component.props().children.props.style).toHaveProperty('backgroundColor', 'blue');

    component = (0, _enzyme.mount)(_react2.default.createElement(_FileExtensionIcon2.default, { colors: colorMapping, extension: 'torrent' }));
    expect(component.props().children.props.style).toHaveProperty('backgroundColor', 'blue');

    component = (0, _enzyme.mount)(_react2.default.createElement(_FileExtensionIcon2.default, { colors: colorMapping, extension: 'somethingelse' }));
    expect(component.props.children.props.style || {}).not.toHaveProperty('backgroundColor');
  });

  it('should support custom rendering via renderExtensionBox prop', function () {
    var renderSpy = jest.fn();
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileExtensionIcon2.default, { renderExtensionBox: renderSpy, extension: '.torrent' }));

    expect(renderSpy).toHaveBeenCalledTimes(1);
  });
});