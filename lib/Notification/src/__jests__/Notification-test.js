'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _CloseButton = require('../CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _Notification = require('../Notification');

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Notification', function () {
  describe('autoHideDelay', function () {
    it('calls onHide after a delay', function (done) {
      var onHide = jest.fn();

      (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { autoHideDelay: 300, onHide: onHide, id: 'test' }));

      expect(onHide).toHaveBeenCalledTimes(0);
      setTimeout(function () {
        expect(onHide).toHaveBeenCalledTimes(1);
        expect(onHide.mock.calls[0][0].id).toEqual('test');
        done();
      }, 300);
    });
  });

  describe('classname', function () {
    it('adds correct stacking className', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { stacking: ['left', 'top'] }));

      expect(wrapper.find('.zippy-react-toolkit-notification--stacking-left-top')).toHaveLength(1);
    });
    it('adds --move-transition clasname when true', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { moveTransition: true }));

      expect(wrapper.find('.zippy-react-toolkit-notification--move-transition')).toHaveLength(1);
    });
    it('adds non-blocking clasname when true', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { nonBlocking: true }));

      expect(wrapper.find('.zippy-react-toolkit-notification--non-blocking')).toHaveLength(1);
    });
  });

  describe('style', function () {
    it('adds style prop', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { style: { color: 'red' } }));
      expect(wrapper.find('.zippy-react-toolkit-notification').at(0).props().style.color).toEqual('red');
    });
  });

  describe('border', function () {
    it('adds border on notification', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { border: '1px solid red' }));
      expect(wrapper.find('.zippy-react-toolkit-notification').at(0).props().style.border).toEqual('1px solid red');
    });
  });

  describe('borderRadius', function () {
    it('adds borderRadius on notification', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { borderRadius: '1px solid red' }));
      expect(wrapper.find('.zippy-react-toolkit-notification').at(0).props().style.borderRadius).toEqual('1px solid red');
    });
  });

  describe('background', function () {
    it('adds background on notification', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { background: 'blue' }));
      expect(wrapper.find('.zippy-react-toolkit-notification').at(0).props().style.background).toEqual('blue');
    });
  });

  describe('padding', function () {
    it('adds padding on notification', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { padding: 20 }));
      expect(wrapper.find('.zippy-react-toolkit-notification').at(0).props().style.padding).toEqual(20);
    });
  });

  describe('width', function () {
    it('adds width on notification', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { width: 20 }));
      expect(wrapper.find('.zippy-react-toolkit-notification').at(0).props().style.width).toEqual(20);
    });
  });

  describe('height', function () {
    it('adds height on notification', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { height: 20 }));
      expect(wrapper.find('.zippy-react-toolkit-notification').at(0).props().style.height).toEqual(20);
    });
  });

  describe('opacity', function () {
    it('adds opacity on notification', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { opacity: 20 }));
      expect(wrapper.find('.zippy-react-toolkit-notification').at(0).props().style.opacity).toEqual(20);
    });
  });

  describe('height and width', function () {
    it('if both are set it should not call onSizeChange', function () {
      var onSizeChange = jest.fn();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { onSizeChange: onSizeChange, width: 20, height: 20 }));

      expect(onSizeChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('minSize, maxSize', function () {
    it('adds correct minWidth, minHeight, maxWidth, maxHeight', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, {
        minSize: { width: 20, height: 30 },
        maxSize: { width: 20, height: 30 }
      }));
      var style = wrapper.find('.zippy-react-toolkit-notification').at(0).props().style;

      var minWidth = style.minWidth,
          maxWidth = style.maxWidth,
          minHeight = style.minHeight,
          maxHeight = style.maxHeight;

      expect({ minWidth: minWidth, maxWidth: maxWidth, minHeight: minHeight, maxHeight: maxHeight }).toEqual({
        minWidth: 20,
        maxWidth: 20,
        minHeight: 30,
        maxHeight: 30
      });
    });
  });

  describe('shadow', function () {
    it('adds correct minWidth, minHeight, maxWidth, maxHeight', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { shadow: true }));
      expect(wrapper.find('.zippy-react-toolkit-notification--shadow')).toHaveLength(1);
    });
  });

  describe('clearOpacityOnMouseEnter', function () {
    it('removes opacity when mouse enters notification', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { clearOpacityOnMouseEnter: true, opacity: 3 }));
      expect(wrapper.find('.zippy-react-toolkit-notification').at(0).props().style.opacity).toEqual(3);

      wrapper.find('.zippy-react-toolkit-notification').at(0).simulate('mouseEnter');
      expect(wrapper.find('.zippy-react-toolkit-notification').at(0).props().style.opacity).toEqual(1);
    });
  });

  describe('hideOnClick', function () {
    it('should trigger on click when Notification is clicked', function () {
      var onHide = jest.fn();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Notification2.default, { hideOnClick: true, onHide: onHide }));
      expect(onHide).toHaveBeenCalledTimes(0);
      wrapper.find('.zippy-react-toolkit-notification').at(0).simulate('click');
      expect(onHide).toHaveBeenCalledTimes(1);
    });
  });

  describe('title', function () {
    describe('jsx', function () {
      it('renders jsx', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Notification2.default, { title: 'hello world' }));
        var title = wrapper.find('.zippy-react-toolkit-notification__title');

        expect(title).toHaveLength(1);
        expect(title.text()).toEqual('hello world');

        wrapper.setProps({ title: _react2.default.createElement('div', { id: 'helloWorld' }) });
        expect(wrapper.find('#helloWorld')).toHaveLength(1);
      });
    });
    describe('function', function () {
      it('renders what it returns', function () {
        var title = _react2.default.createElement(
          'div',
          { id: 'childId' },
          'hello world'
        );

        var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Notification2.default, { title: title }));
        expect(wrapper.find('#childId')).toHaveLength(1);
      });
      it('can mutate props', function () {
        var title = function title(domProps) {
          domProps.id = 'mutatedId';
        };
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Notification2.default, { title: title }));
        expect(wrapper.find('#mutatedId')).toHaveLength(1);
      });
    });
  });

  describe('closeButton', function () {
    it('renders closeButton when true', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Notification2.default, { closeButton: true }));
      expect(wrapper.find('.zippy-react-toolkit-notification__close-button')).toHaveLength(1);
      expect(wrapper.find(_CloseButton2.default)).toHaveLength(1);
    });
    it('renders custom jsx', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Notification2.default, {
        closeButton: _react2.default.createElement(
          'div',
          { id: 'customCloseButton' },
          'hello world'
        )
      }));
      expect(wrapper.find('#customCloseButton')).toHaveLength(1);
    });
    it('render when is a function', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Notification2.default, {
        closeButton: function closeButton(domProps) {
          domProps.id = 'customMutatedId';
        }
      }));
      expect(wrapper.find('#customMutatedId')).toHaveLength(1);
    });
    it('renders when a function what it returns', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Notification2.default, {
        closeButton: function closeButton(domProps) {
          return _react2.default.createElement(
            'div',
            { id: 'closeButtonCustom' },
            'close Icon'
          );
        }
      }));
      expect(wrapper.find('#closeButtonCustom')).toHaveLength(1);
    });
    it('calls onHide when clicked', function () {
      var onHide = jest.fn();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Notification2.default, { closeButton: true, onHide: onHide }));
      wrapper.find(_CloseButton2.default).at(0).simulate('click');
      expect(onHide).toHaveBeenCalledTimes(1);
    });
  });

  describe('icon', function () {
    it('renders jsx', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Notification2.default, { icon: _react2.default.createElement('div', { id: 'icon' }) }));
      expect(wrapper.find('#icon')).toHaveLength(1);
    });
  });

  describe('content', function () {
    it('renders jsx', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Notification2.default, { content: _react2.default.createElement('div', { id: 'content' }) }));
      expect(wrapper.find('#content')).toHaveLength(1);
    });
  });
});