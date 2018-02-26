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
    expect(component.instance()).to.be.instanceOf(_FileExtensionIcon2.default);
  });

  it('should render with given file object', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileExtensionIcon2.default, { file: { name: 'myfile.png' } }));
    expect(component.text()).to.contain('png');
  });

  it('should render with given extension object', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileExtensionIcon2.default, { extension: 'torrent' }));
    expect(component.text()).to.contain('torrent');
  });

  it('should render with given extension and file object', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileExtensionIcon2.default, { file: { name: 'myfile.png' }, extension: 'torrent' }));
    expect(component.text()).to.contain('torrent');
  });

  it('should support hidden dot for file extension', function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileExtensionIcon2.default, { showStartingDot: false, extension: '.torrent' }));
    expect(component.text()).to.contain('torrent');
  });

  it('should support custom color mapping prop for file extensions', function () {
    var colorMapping = {
      'torrent': 'blue',
      '.pdf': 'red'
    };

    var component = void 0;

    component = (0, _enzyme.shallow)(_react2.default.createElement(_FileExtensionIcon2.default, { colors: colorMapping, extension: '.torrent' }));
    expect(component.node.props.children.props.style).to.have.property('backgroundColor', 'blue');

    component = (0, _enzyme.shallow)(_react2.default.createElement(_FileExtensionIcon2.default, { colors: colorMapping, extension: 'torrent' }));
    expect(component.node.props.children.props.style).to.have.property('backgroundColor', 'blue');

    component = (0, _enzyme.shallow)(_react2.default.createElement(_FileExtensionIcon2.default, { colors: colorMapping, extension: 'somethingelse' }));
    expect(component.node.props.children.props.style || {}).to.not.have.property('backgroundColor');
  });

  it('should support custom rendering via renderExtensionBox prop', function () {
    var renderSpy = sinon.spy();
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_FileExtensionIcon2.default, { renderExtensionBox: renderSpy, extension: '.torrent' }));

    expect(renderSpy).to.have.been.calledOnce;
  });
});