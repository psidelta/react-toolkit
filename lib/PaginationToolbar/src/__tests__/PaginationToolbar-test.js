'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _testUtils = require('../../../common/testUtils');

var _PaginationToolbar = require('../PaginationToolbar');

var _PaginationToolbar2 = _interopRequireDefault(_PaginationToolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getPageInput = function getPageInput(toolbar) {
  return (0, _reactDom.findDOMNode)(toolbar).querySelector('input.zippy-react-pagination-toolbar__current-page');
};

var getIcon = function getIcon(iconName, toolbar) {
  return (0, _reactDom.findDOMNode)(toolbar).querySelector('svg.zippy-react-pagination-toolbar__icon--named--' + iconName);
};

var getIcons = function getIcons(toolbar) {
  return {
    REFRESH: getIcon('REFRESH', toolbar),
    NEXT_PAGE: getIcon('NEXT_PAGE', toolbar),
    PREV_PAGE: getIcon('PREV_PAGE', toolbar),
    LAST_PAGE: getIcon('LAST_PAGE', toolbar),
    FIRST_PAGE: getIcon('FIRST_PAGE', toolbar)
  };
};

describe('PaginationToolbar', function () {
  it('should work correctly with simple uncontrolled behavior', function (done) {
    var lastSkip = -1;
    var skipCalls = 0;

    var onSkipChange = function onSkipChange(skip) {
      lastSkip = skip;
      skipCalls++;
    };
    var toolbar = (0, _testUtils.render)(_react2.default.createElement(_PaginationToolbar2.default, {
      totalCount: 100,
      defaultLimit: 10,
      defaultSkip: 0,
      onSkipChange: onSkipChange
    }));

    var pageInput = getPageInput(toolbar);

    expect(pageInput.value).to.equal('1');

    var _getIcons = getIcons(toolbar),
        NEXT_PAGE = _getIcons.NEXT_PAGE;

    (0, _testUtils.simulateMouseEvent)('click', NEXT_PAGE);
    expect(pageInput.value).to.equal('2');
    expect(lastSkip).to.equal(10);
    expect(skipCalls).to.equal(1);

    (0, _testUtils.simulateMouseEvent)('click', NEXT_PAGE);
    expect(pageInput.value).to.equal('3');
    expect(lastSkip).to.equal(20);
    expect(skipCalls).to.equal(2);

    toolbar.unmount();

    done();
  });

  it('should work correctly when on the last page', function (done) {
    var lastSkip = -1;
    var skipCalls = 0;

    var onSkipChange = function onSkipChange(skip) {
      lastSkip = skip;
      skipCalls++;
    };
    var toolbar = (0, _testUtils.render)(_react2.default.createElement(_PaginationToolbar2.default, {
      totalCount: 100,
      defaultLimit: 10,
      defaultSkip: 80,
      onSkipChange: onSkipChange
    }));

    var pageInput = getPageInput(toolbar);

    expect(pageInput.value).to.equal('9');

    var _getIcons2 = getIcons(toolbar),
        NEXT_PAGE = _getIcons2.NEXT_PAGE,
        PREV_PAGE = _getIcons2.PREV_PAGE;

    (0, _testUtils.simulateMouseEvent)('click', NEXT_PAGE);
    expect(pageInput.value).to.equal('10');
    expect(lastSkip).to.equal(90);
    expect(skipCalls).to.equal(1);

    // on another click do nothing, as there is no next page
    (0, _testUtils.simulateMouseEvent)('click', NEXT_PAGE);
    expect(pageInput.value).to.equal('10');
    expect(lastSkip).to.equal(90);
    expect(skipCalls).to.equal(1);

    // expect the next button have the disabled className
    expect(('' + NEXT_PAGE.classList).indexOf('disabled') > 0).to.equal(true);

    // now to go page 5
    toolbar.gotoPage(5);
    expect(pageInput.value).to.equal('5');
    expect(lastSkip).to.equal(40);
    expect(skipCalls).to.equal(2);

    // now set limit to 25 and make sure we're on page 4
    toolbar.setPageSize(25);
    expect(pageInput.value).to.equal('4');
    expect(lastSkip).to.equal(75);
    expect(skipCalls).to.equal(3);

    (0, _testUtils.simulateMouseEvent)('click', PREV_PAGE);
    expect(pageInput.value).to.equal('3');
    expect(lastSkip).to.equal(50);
    expect(skipCalls).to.equal(4);

    toolbar.unmount();

    done();
  });

  it('should update current page from 0 to a value when totalCount goes from 0 to a value', function (done) {
    var Wrapper = function (_React$Component) {
      _inherits(Wrapper, _React$Component);

      function Wrapper(props) {
        _classCallCheck(this, Wrapper);

        var _this = _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

        _this.state = { totalCount: 0 };
        return _this;
      }

      _createClass(Wrapper, [{
        key: 'render',
        value: function render() {
          var _this2 = this;

          return _react2.default.createElement(_PaginationToolbar2.default, {
            ref: function ref(t) {
              _this2.toolbar = t;
            },
            totalCount: this.state.totalCount,
            defaultLimit: 10,
            defaultSkip: 0
          });
        }
      }, {
        key: 'setTotalCount',
        value: function setTotalCount(c) {
          this.setState({ totalCount: c });
        }
      }]);

      return Wrapper;
    }(_react2.default.Component);

    var app = (0, _testUtils.render)(_react2.default.createElement(Wrapper, null));
    var toolbar = app.toolbar;

    var pageInput = getPageInput(toolbar);

    expect(pageInput.value).to.equal('0');

    app.setTotalCount(100);

    expect(pageInput.value).to.equal('1');

    app.unmount();

    done();
  });
});