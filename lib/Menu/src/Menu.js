'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactClass = require('@zippytech/react-class');

var _reactClass2 = _interopRequireDefault(_reactClass);

var _regionAlign = require('@zippytech/region-align');

var _regionAlign2 = _interopRequireDefault(_regionAlign);

var _uglified = require('@zippytech/uglified');

var _uglified2 = _interopRequireDefault(_uglified);

var _shallowequal = require('../../common/shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _ArrowScroller = require('../../ArrowScroller');

var _ArrowScroller2 = _interopRequireDefault(_ArrowScroller);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _MenuSeparator = require('./MenuSeparator');

var _MenuSeparator2 = _interopRequireDefault(_MenuSeparator);

var _containsNode = require('../../common/containsNode');

var _containsNode2 = _interopRequireDefault(_containsNode);

var _cleanProps = require('../../common/cleanProps');

var _cleanProps2 = _interopRequireDefault(_cleanProps);

var _join = require('../../common/join');

var _join2 = _interopRequireDefault(_join);

var _assign = require('../../common/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getConstrainRegion = require('../../common/getConstrainRegion');

var _getConstrainRegion2 = _interopRequireDefault(_getConstrainRegion);

var _isMobile = require('../../common/isMobile');

var _isMobile2 = _interopRequireDefault(_isMobile);

var _prepareStyle = require('./utils/prepareStyle');

var _prepareStyle2 = _interopRequireDefault(_prepareStyle);

var _getFirstNonDisabledItem = require('./utils/getFirstNonDisabledItem');

var _getFirstNonDisabledItem2 = _interopRequireDefault(_getFirstNonDisabledItem);

var _getNextNavigableItem = require('./utils/getNextNavigableItem');

var _getNextNavigableItem2 = _interopRequireDefault(_getNextNavigableItem);

var _getSeparatorIndexes = require('./utils/getSeparatorIndexes');

var _getSeparatorIndexes2 = _interopRequireDefault(_getSeparatorIndexes);

var _prepareAlignOffset = require('./utils/prepareAlignOffset');

var _prepareAlignOffset2 = _interopRequireDefault(_prepareAlignOffset);

var _getSingleSelectNames = require('./utils/getSingleSelectNames');

var _getSingleSelectNames2 = _interopRequireDefault(_getSingleSelectNames);

var _increaseColSpan = require('./utils/increaseColSpan');

var _getRegionRelativeToParent = require('./getRegionRelativeToParent');

var _getRegionRelativeToParent2 = _interopRequireDefault(_getRegionRelativeToParent);

var _shouldComponentUpdate2 = require('../../common/shouldComponentUpdate');

var _shouldComponentUpdate3 = _interopRequireDefault(_shouldComponentUpdate2);

var _getSubMenuStyle = require('./getSubMenuStyle');

var _getSubMenuStyle2 = _interopRequireDefault(_getSubMenuStyle);

var _getItemStyleProps = require('./utils/getItemStyleProps');

var _getItemStyleProps2 = _interopRequireDefault(_getItemStyleProps);

var _submenuAlignPositions = require('./submenuAlignPositions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function emptyFn() {}

var raf = global.requestAnimationFrame;

var getAlignToRegion = function getAlignToRegion(alignTo, node) {
  if (typeof alignTo === 'function') {
    alignTo = alignTo(node);
  }
  if (typeof alignTo == 'string') {
    alignTo = global.document ? global.document.querySelector(alignTo) : alignTo;
  }

  return _regionAlign2.default.from(alignTo);
};

var ZippyMenu = function (_Component) {
  _inherits(ZippyMenu, _Component);

  function ZippyMenu(props) {
    _classCallCheck(this, ZippyMenu);

    var _this = _possibleConstructorReturn(this, (ZippyMenu.__proto__ || Object.getPrototypeOf(ZippyMenu)).call(this, props));

    _this.state = {
      mouseOver: false,
      hidden: true,
      enableAnimation: false,
      transitionEnded: false,
      hasScroll: false,

      activeSubMenuIndex: null,
      nextActiveSubMenuIndex: null,

      /**
       * It is considered that if it has scroll
       * the top arrow will be initaly hidden
       * and the bottom arrow visible
       */
      showUpArrow: false,
      showDownArrow: true,

      // navigation
      focusedItem: props.enableKeyboardNavigation ? props.defaultFocusedItem : null,

      // selection
      selected: props.defaultSelected
    };

    _this.setupShowHideDelay();
    _this.setRootRef = function (ref) {
      _this.node = ref;
    };
    _this.setItemRef = function (index) {
      return function (ref) {
        if (!_this.childrenRefs) {
          _this.childrenRefs = [];
        }
        _this.childrenRefs[index] = ref;
      };
    };
    _this.setSubMenuRef = function (ref) {
      _this.subMenu = ref;
    };
    _this.setSubMenuWrapRef = function (ref) {
      _this.subMenuWrap = ref;
    };
    _this.setScrollerRef = function (ref) {
      _this.scroller = ref;
    };
    _this.setTableRef = function (ref) {
      _this.table = ref;
    };
    return _this;
  }

  _createClass(ZippyMenu, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return (0, _shouldComponentUpdate3.default)(this, nextProps, nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.componentIsMounted = false;
      this.chidrenRefs = null;

      this.props.componentWillUnmount({
        // used by parent to focust itself after
        // it's submenu has unmmounted
        hasFocus: this.hasFocus(),
        depth: this.props.depth
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      /**
       * if it has autoFocus
       * make sure it is visible before calling focus
       */
      if (this.props.autoFocus && prevState.hidden && !this.state.hidden) {
        this.focus();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.componentIsMounted = true;
      this.checkAlignment();
      this.setupEnterAnimation();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextState) {
      if (!this.props.visible && nextProps.visible || !(0, _shallowequal2.default)(this.props.alignTo, nextProps.alignTo) || nextProps.constrainTo != this.props.constrainTo) {
        this.checkAlignment(nextProps);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.state,
          props = this.props;

      var style = (0, _prepareStyle2.default)(props, state);
      var className = this.prepareClassName(props, state);
      var table = this.renderTable();
      var scrollerArrow = props.showScrollArrows === undefined ? 'auto' : !!props.showScrollArrows;

      return _react2.default.createElement(
        'div',
        _extends({}, (0, _cleanProps2.default)(props, ZippyMenu.propTypes), {
          tabIndex: 0,
          ref: this.setRootRef,
          onMouseLeave: this.handleMouseLeave,
          onMouseEnter: this.handleMouseEnter,
          onKeyDown: this.handleKeyDown,
          onBlur: this.handleOnBlur,
          className: className,
          style: style,
          onMouseOver: this.handleMouseOver
        }),
        this.state.activeSubMenuIndex !== null && this.renderSubMenu(props, state),
        props.disableScroller ? table : _react2.default.createElement(
          _ArrowScroller2.default,
          _extends({ scroller: scrollerArrow }, this.getScrollerProps()),
          table
        )
      );
    }

    // RENDERING LOGIC

  }, {
    key: 'renderTable',
    value: function renderTable() {
      var props = this.props,
          state = this.state;

      var className = (0, _join2.default)(props.rootClassName + '__table', props.tableClassName);

      return _react2.default.createElement(
        'table',
        {
          cellSpacing: 0,
          cellPadding: 0,
          className: className,
          ref: this.setTableRef
        },
        _react2.default.createElement(
          'tbody',
          null,
          this.renderItems()
        )
      );
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var _this2 = this;

      var props = this.props,
          state = this.state;


      if (!props.items) {
        return null;
      }

      var commonProps = this.getCommonItemProps();
      var siblingItemHasSubMenu = this.doesAnyItemHasSubMenu();
      var siblingItemHasSelectInput = this.dosAnyItemHaveSelectInput();
      var hasDescription = props.items.filter(function (item) {
        return !!item.secondaryLabel;
      }).length;
      var hasIcon = props.items.filter(function (item) {
        return !!item.icon;
      }).length;

      return props.items.map(function (item, index, items) {
        if (item === '-') {
          return _react2.default.createElement(_MenuSeparator2.default, {
            style: props.menuSeparatorStyle,
            key: index,
            rootClassName: props.rootClassName
          });
        }

        var columns = props.columns;
        if (hasDescription) {
          columns = [].concat(_toConsumableArray(columns), [{
            name: 'secondaryLabel',
            isDescription: true,
            style: _extends({}, props.secondaryLabelStyle, item.secondaryLabelStyle)
          }]);
        }
        if (hasIcon) {
          columns = [{
            name: 'icon',
            isIcon: true
          }].concat(_toConsumableArray(columns));
        }

        if (props.labelStyle || item.labelStyle) {
          columns = columns.map(function (column) {
            if (!column) {
              return column;
            }
            if (typeof column === 'string' && column === 'label') {
              return {
                name: 'label',
                style: _extends({}, props.labelStyle, item.labelStyle)
              };
            }
            if (column && column.name && column.name === 'label') {
              return _extends({}, column, {
                style: _extends({}, columns.style, props.labelStyle)
              });
            }

            return column;
          });
        }

        var hasSubMenu = item.items && !!item.items.length || item.children && !!item.children.length;
        var focused = state.focusedItem === index;
        var expanded = commonProps.expandedIndex === index;
        var className = props.itemClassName;
        var selectionProps = _this2.getSelectionProps(item);

        /**
         * If any items have a select input
         * it's sibling that doesn't have one
         * should have the adiacent column where whould
         * the input be colSpan 2
         */
        if (props.enableSelection && siblingItemHasSelectInput && !selectionProps) {
          if (props.selectionInputPosition === 'start') {
            columns = (0, _increaseColSpan.increaseFirstColumnColSpan)(columns);
          } else {
            columns = (0, _increaseColSpan.increaseLastColumnColSpan)(columns);
          }
        }

        // correct colspan on the last item
        // if any siblings have submenu (expander)
        if (!hasSubMenu && siblingItemHasSubMenu) {
          columns = (0, _increaseColSpan.increaseLastColumnColSpan)(columns);
        }

        var itemProps = _extends({
          index: index,
          item: item,
          hasSubMenu: hasSubMenu,
          items: items,
          focused: focused,
          expanded: expanded,
          className: className,
          columns: columns,
          key: index,
          disabled: item.disabled,
          ref: _this2.setItemRef(index)
        }, commonProps, selectionProps, item.props);

        var component = props.itemFactory || _MenuItem2.default;
        return _react2.default.createFactory(component)(itemProps);
      });
    }
  }, {
    key: 'getSelectionProps',
    value: function getSelectionProps(item) {
      var props = this.props;

      if (!props.items || props.items && !props.items.length) {
        return null;
      }
      var selected = this.getSelected();
      var singleSelectNames = (0, _getSingleSelectNames2.default)({
        items: props.items,
        nameProperty: props.nameProperty
      });
      var selectionProps = void 0;
      if (props.enableSelection) {
        var value = item[props.valueProperty];
        var name = item[props.nameProperty];

        // for an item to be selected its value can be any value (e.g 0)
        var multiple = singleSelectNames && !singleSelectNames[name];
        var checked = multiple ? value !== undefined ? selected[name] === value : selected[name] === name : selected[name] === value;

        // must have a name for the item to be selectable
        if (name) {
          selectionProps = {
            name: name,
            value: value,
            checked: checked,
            multiple: multiple,
            allowUnselect: props.allowUnselect,
            enableSelection: true,
            browserNativeSelectInputs: props.browserNativeSelectInputs,
            renderCheckInput: item.renderCheckInput !== undefined ? item.renderCheckInput : props.renderCheckInput,
            renderRadioInput: item.renderRadioInput !== undefined ? item.renderRadioInput : props.renderRadioInput,
            selectionInputPosition: item.selectionInputPosition !== undefined ? item.selectionInputPosition : props.selectionInputPosition
          };
        }
      }

      return selectionProps;
    }
  }, {
    key: 'getCommonItemProps',
    value: function getCommonItemProps() {
      var _extends2;

      var props = this.props;

      var menuHasSubmenu = !!props.items.filter(function (item) {
        return item.items && item.items.length;
      }).length;
      var itemStyleProps = (0, _getItemStyleProps2.default)(props);

      return _extends((_extends2 = {
        menuHasSubmenu: menuHasSubmenu,
        expanderStyle: props.expanderStyle,
        // columns: props.columns,
        expanderSize: props.expanderSize,
        globalCellStyle: props.cellStyle,
        itemDisabledStyle: props.itemDisabledStyle,
        itemDisabledClassName: props.itemDisabledClassName,
        itemOverStyle: props.itemOverStyle,
        itemActiveStyle: props.itemActiveStyle
      }, _defineProperty(_extends2, 'menuHasSubmenu', props.menuHasSubmenu), _defineProperty(_extends2, 'rootClassName', props.rootClassName), _defineProperty(_extends2, 'showWarnings', props.showWarnings), _defineProperty(_extends2, 'titleStyle', props.titleStyle), _defineProperty(_extends2, 'onClick', this.onMenuItemClick), _defineProperty(_extends2, 'onMouseOver', this.onMenuItemMouseEnter), _defineProperty(_extends2, 'onMouseOut', this.onMenuItemMouseLeave), _defineProperty(_extends2, 'submenuWillUnmount', this.onSubmenuWillUnmount), _defineProperty(_extends2, 'onExpanderClick', this.onMenuItemExpanderClick), _defineProperty(_extends2, 'onSelectChange', this.handleSelectionChange), _defineProperty(_extends2, 'selectOnClick', props.selectOnClick), _defineProperty(_extends2, 'expander', props.expander), _defineProperty(_extends2, 'rtl', props.rtl), _defineProperty(_extends2, 'height', props.itemHeight), _defineProperty(_extends2, 'checkIconSize', props.checkIconSize), _defineProperty(_extends2, 'radioIconSize', props.radioIconSize), _defineProperty(_extends2, 'closeSubmenuRecursively', this.closeSubmenuRecursively), _defineProperty(_extends2, 'closeSubMenu', this.closeSubMenu), _defineProperty(_extends2, 'expandedIndex', this.getExpandedIndex()), _extends2), itemStyleProps);
    }
  }, {
    key: 'renderSubMenu',
    value: function renderSubMenu(props, state) {
      var domNode = this.node;
      var menuProps = this.getSubMenuProps();

      var wrapperStyle = _getSubMenuStyle2.default.bind(this)(_extends({}, props, { alignPositions: this.getDefaultAlignPositions() }), state, domNode);

      var wrapperClassName = this.props.rootClassName + '__submenu-wrapper';

      return _react2.default.createElement(
        'div',
        {
          className: wrapperClassName,
          ref: this.setSubMenuWrapRef,
          style: wrapperStyle,
          onMouseEnter: this.handleSubMenuMouseEnter,
          onMouseLeave: this.handleSubMenuMouseLeave
        },
        _react2.default.createElement(ZippyMenu, _extends({ key: state.activeSubMenuIndex }, menuProps))
      );
    }
  }, {
    key: 'hasItemSubMenu',
    value: function hasItemSubMenu(index) {
      var items = this.getItemsByIndex(index);
      return items && items.length;
    }
  }, {
    key: 'getItemsByIndex',
    value: function getItemsByIndex(index) {
      var item = this.props.items && this.props.items[index];
      if (!item) {
        return null;
      }
      var items = item && item.items;

      return items;
    }
  }, {
    key: 'getSubMenuProps',
    value: function getSubMenuProps() {
      var props = this.props,
          state = this.state;

      var index = this.state.activeSubMenuIndex;
      var items = this.getItemsByIndex(index);
      var item = this.props.items[index];
      // const alignOffset = props.submenuAlignOffset;

      var overridingProps = _extends({}, this.props.submenuProps, item.menuProps);
      if (overridingProps.selected === undefined && overridingProps.defaultSelected === undefined) {
        overridingProps.selected = this.getSelected();
      }
      var menuProps = _extends({}, this.props, overridingProps, {
        // alignOffset,
        items: items,
        depth: props.depth + 1,
        ref: this.setSubMenuRef,
        subMenu: true,
        parentMenu: this,
        closeSubMenu: this.closeSubMenu,
        closeSubmenuRecursively: this.closeSubmenuRecursively,
        componentWillUnmount: this.submenuWillUnmount,
        parentIndex: index,
        maxHeight: state.submenuMaxHeight || props.submenuMaxHeight || state.maxHeight || props.maxHeight,
        onActivate: this.onSubMenuActivate,
        onInactivate: this.onSubMenuInactivate,
        scrollerProps: props.scrollerProps,
        constrainTo: props.constrainTo,
        expander: props.expander,
        onSelectionChange: this.handleSubmenuSelectionChange,
        alignPosition: state.submenuAlignPosition
        //    defaultFocusedItem: 0,
      });

      delete menuProps.autoFocus;
      delete menuProps.className;
      delete menuProps.onClick;
      delete menuProps.defaultFocusedItem;
      delete menuProps.onChildClick;
      delete menuProps.visible;

      return menuProps;
    }
  }, {
    key: 'getAlignPositions',
    value: function getAlignPositions(props) {
      if (props.alignPositions == null) {
        return this.getDefaultAlignPositions();
      }

      return props.alignPositions;
    }
  }, {
    key: 'getDefaultAlignPositions',
    value: function getDefaultAlignPositions() {
      var props = this.props;

      return props.rtl ? _submenuAlignPositions.alignPositionRTL : _submenuAlignPositions.alignPositionLTR;
    }
  }, {
    key: 'getScrollerProps',
    value: function getScrollerProps() {
      var _this3 = this;

      var props = this.props,
          state = this.state;

      var className = (0, _join2.default)(props.scrollerProps.className, props.rootClassName + '__scroll-container');

      var style = (0, _assign2.default)({}, props.scrollerProps.style);
      /**
       * Same height style (height|maxHeight) is used also on scroller
       */
      var maxHeight = state.maxHeight != undefined && props.submenu ? state.maxHeight : props.maxHeight;

      if (maxHeight != null) {
        (0, _assign2.default)(style, { maxHeight: maxHeight });
      }

      var scrollProps = _extends({}, props.scrollerProps, {
        renderScroller: props.renderScroller,
        className: className,
        notifyResizeDelay: props.notifyResizeDelay,
        ref: this.setScrollerRef,
        style: style,
        vertical: true,
        scrollOnMouseEnter: props.scrollOnMouseEnter,
        onHasScrollChange: function onHasScrollChange(hasScroll) {
          return _this3.setState({ hasScroll: hasScroll });
        }
      });

      return scrollProps;
    }
  }, {
    key: 'prepareClassName',
    value: function prepareClassName(props, state) {
      var hidden = props.visible != undefined ? !props.visible : state.hidden;

      var className = (0, _join2.default)(props.rootClassName, props.theme && props.rootClassName + '--theme-' + props.theme, props.className, !props.visible || props.items && !props.items.length && props.rootClassName + '--no-display', props.absolute && props.rootClassName + '--absolute', hidden && props.rootClassName + '--hidden', _isMobile2.default && props.rootClassName + '--mobile', props.subMenu && props.rootClassName + '__submenu', props.rootClassName + '--depth-' + props.depth, state.hasScroll && props.rootClassName + '--has-overflow', props.rtl && props.rootClassName + '--rtl', props.shadow && props.rootClassName + '--shadow', state.hasScroll && props.rootClassName + '--has-scroll');

      if (props.alignPosition !== undefined) {
        var position = props.alignPosition === 1 ? 'up' : 'down';
        className = (0, _join2.default)(className, props.rootClassName + '--position-' + position);
      }

      // animation
      if (state.enableAnimation) {
        className = (0, _join2.default)(className, props.rootClassName + '--animation-enabled', state.transitionEnded && props.rootClassName + '--transition-end', state.transitionStart && props.rootClassName + '--transition-start');
      }

      return className;
    }

    // BEHAVIOUR LOGIC

  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.setState({
        mouseInside: true
      });
      this.onActivate();
    }
  }, {
    key: 'handleMouseOver',
    value: function handleMouseOver(event) {
      // if (event.target === this.node) {
      //   this.onActivate();
      // }
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setNextSubmenu();

      this.setState({
        mouseInside: false
      });

      if (!this.state.activeSubMenuIndex && !this.state.nextActiveSubMenuIndex) {
        this.onInactivate({
          hasFocus: this.hasFocus(),
          /**
           * Used as indentifier for it's item parent
           */
          parentIndex: this.props.parentIndex
        });
      }
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      if (!this.props.enableKeyboardNavigation) {
        return;
      }

      /**
       * stop parent menu from getting this event
       * if it does, it will change focusedItem in the
       * same time
       */
      var stop = function stop(event) {
        event.stopPropagation();
        // event.preventDefault()
      };

      stop(event);

      switch (event.key) {
        case 'ArrowUp':
          this.handleArrowUp(event);
          break;
        case 'ArrowDown':
          this.handleArrowDown(event);
          break;
        case 'ArrowLeft':
          this.handleArrowLeft(event);
          break;
        case 'ArrowRight':
          this.handleArrowRight(event);
          break;
        case 'Enter':
          this.handleEnterOnFocusedItem(event);
          break;
        case ' ':
          this.handleSpaceOnFocusedItem(event);
          break;
      }
    }
  }, {
    key: 'handleArrowUp',
    value: function handleArrowUp(event) {
      var lastItemIndex = this.props.items && this.props.items.length ? this.props.items.length : null;
      var props = this.props;

      var focusedItemIndex = this.state.focusedItem != null ? this.state.focusedItem : lastItemIndex;
      var newFocusedItemIndex = (0, _getNextNavigableItem2.default)(props.items, focusedItemIndex, -1);

      if (newFocusedItemIndex == null) {
        return;
      }

      this.setFocusedIndex(newFocusedItemIndex);
    }
  }, {
    key: 'handleArrowDown',
    value: function handleArrowDown(event) {
      var props = this.props;

      var focusedItemIndex = this.state.focusedItem != null ? this.state.focusedItem : -1;
      var newFocusedItemIndex = (0, _getNextNavigableItem2.default)(props.items, focusedItemIndex, 1);

      if (newFocusedItemIndex == null) {
        return;
      }

      this.setFocusedIndex(newFocusedItemIndex);
    }
  }, {
    key: 'handleArrowLeft',
    value: function handleArrowLeft(event) {
      if (this.props.rtl) {
        this.openSubMenuAction(this.state.focusedItem);
      } else {
        this.closeSubMenuAction();
      }
    }
  }, {
    key: 'handleArrowRight',
    value: function handleArrowRight(event) {
      if (this.props.rtl) {
        this.closeSubMenuAction();
      } else {
        this.openSubMenuAction(this.state.focusedItem);
      }
    }
  }, {
    key: 'handleEnterOnFocusedItem',
    value: function handleEnterOnFocusedItem(event) {
      /**
       * Simulate onclick
       * event, props, index
       */
      var focusedItem = this.getFocusedItem();
      if (this.props.simulateClickOnEnterKeyPress && focusedItem != null && typeof focusedItem.handleClick === 'function') {
        focusedItem.handleClick({ stopPropagation: function stopPropagation() {} });
      }
    }
  }, {
    key: 'handleSpaceOnFocusedItem',
    value: function handleSpaceOnFocusedItem() {
      var activeItemProps = this.getFocusedItemProps();
      if (!activeItemProps) {
        return;
      }
      this.handleSelectionChange({
        name: activeItemProps.name,
        value: activeItemProps.value,
        checked: !activeItemProps.checked,
        multiple: activeItemProps.multiple
      });
    }
  }, {
    key: 'handleOnBlur',
    value: function handleOnBlur(event) {
      var _this4 = this;

      event.stopPropagation();

      /**
       * is prevented when it is closed bu mouse
       * action
       */
      if (this.preventOnBlurRecursiveClose) {
        return;
      }

      this.dismissTriggeredByBlur = true;

      setTimeout(function () {
        if (!_this4.hasGeneralFocus()) {
          _this4.dismiss(event);
        }
      });
    }
  }, {
    key: 'dismiss',
    value: function dismiss(event) {
      this.closeSubmenuRecursively();
      this.props.onDismiss(event);
    }
  }, {
    key: 'scrollItemIntoView',
    value: function scrollItemIntoView(index) {
      var itemNode = this.getItemDOMNodeByIndex(index);
      if (!this.scroller || !itemNode) {
        return;
      }

      this.scroller.scrollIntoView(itemNode);
    }
  }, {
    key: 'closeSubmenuRecursively',
    value: function closeSubmenuRecursively() {
      this.closeSubMenu();
      this.props.closeSubmenuRecursively();
    }
  }, {
    key: 'closeSubMenuAction',
    value: function closeSubMenuAction() {
      if (this.hasSubMenuOpened()) {
        this.closeSubMenu();
      } else if (this.isSubMenu()) {
        this.preventOnBlurRecursiveClose = true;
        this.props.closeSubMenu({ autoFocus: true });
      }
    }
  }, {
    key: 'openSubMenuAction',
    value: function openSubMenuAction(focusedItemIndex) {
      var focusedItem = this.getItemByIndex(focusedItemIndex);
      if (!focusedItem) {
        return;
      }

      if (focusedItem && !focusedItem.hasSubmenu()) {
        return;
      }

      // the same menu is already opened by mouse,
      // have to make first item focused
      if (focusedItemIndex === this.state.activeSubMenuIndex) {
        this.subMenu && this.subMenu.focusFirstItem();
        return;
      }

      var menuOffset = focusedItem && focusedItem.getOffset();
      this.setSubMenu({ menuOffset: menuOffset, index: focusedItemIndex });
    }
  }, {
    key: 'onActivate',
    value: function onActivate() {
      if (!this.state.activated) {
        this.setState({
          activated: true
        });

        if (this.props.onActivate) {
          this.props.onActivate();
        }
      }
    }
  }, {
    key: 'onInactivate',
    value: function onInactivate(options) {
      if (this.state.activated) {
        this.setState({
          activated: false
        });
        if (this.props.onInactivate) {
          this.props.onInactivate(options);
        }
      }
    }

    /**
     * we also need mouseOverSubMenu: Boolean
     * since when from a submenu we move back to a parent menu, we may move
     * to a different menu item than the one that triggered the submenu
     * so we should display another submenu
     */

  }, {
    key: 'handleSubMenuMouseEnter',
    value: function handleSubMenuMouseEnter() {
      this.setState({
        mouseOverSubMenu: true
      });
    }
  }, {
    key: 'handleSubMenuMouseLeave',
    value: function handleSubMenuMouseLeave() {
      this.setState({
        mouseOverSubMenu: false
      });
    }
  }, {
    key: 'isSubMenuActive',
    value: function isSubMenuActive() {
      return this.state.subMenuActive;
    }
  }, {
    key: 'onSubMenuActivate',
    value: function onSubMenuActivate() {
      this.setState({
        subMenuActive: true
      });
      if (this.closeSubmenuTimeout) {
        clearTimeout(this.closeSubmenuTimeout);
      }
    }
  }, {
    key: 'onSubMenuInactivate',
    value: function onSubMenuInactivate(submenuConfig) {
      var _this5 = this;

      var ts = +new Date();
      var nextItem = this.state.nextItem;
      var nextTimestamp = this.state.nextTimestamp || 0;

      this.setState({
        subMenuActive: false,
        timestamp: ts
      }, function () {
        setTimeout(function () {
          if (ts != _this5.state.timestamp || nextItem && ts - nextTimestamp < 100) {
            // a menu show has occured in the mean-time,
            // so skip hiding the menu
            _this5.setSubMenu({
              menuOffset: _this5.state.nextOffset,
              index: _this5.state.nextActiveSubMenuIndex
            });
            return;
          }

          var mouseHasEnteredSubmenuParentItem = submenuConfig && submenuConfig.parentIndex === _this5.itemOverIndex;

          if (!_this5.isSubMenuActive() && !mouseHasEnteredSubmenuParentItem) {
            _this5.closeSubMenu({
              autoFocus: submenuConfig && submenuConfig.hasFocus
            });
          }
        }, 10); // end of setTimeout
      });
    }

    /**
     * Called when mouseout happens on the item
     * for which there is a submenu displayed
     */

  }, {
    key: 'onMenuItemMouseEnter',
    value: function onMenuItemMouseEnter(_ref) {
      var menuOffset = _ref.menuOffset,
          index = _ref.index,
          hasSubMenu = _ref.hasSubMenu;

      if (!this.componentIsMounted) {
        return;
      }

      this.itemOverIndex = index;
      if (!hasSubMenu) {
        return;
      }

      if (this.state.activeSubMenuIndex == null) {
        // there is no menu visible, so it's safe to show the menu
        this.setSubMenu({ menuOffset: menuOffset, index: index });
      } else {
        // there is a menu visible, from the previous item that had mouse over
        // so we should queue this item's menu as the next menu to be shown
        this.setNextSubmenu({ menuOffset: menuOffset, index: index });
      }
    }
  }, {
    key: 'onMenuItemMouseLeave',
    value: function onMenuItemMouseLeave(_ref2) {
      var leaveOffset = _ref2.leaveOffset,
          index = _ref2.index,
          event = _ref2.event;

      if (this.itemOverIndex === index) {
        this.itemOverIndex = null;
      }

      // check if mouse is over a submenu
      var elementAtMousePosition = global.document.elementFromPoint(leaveOffset.x, leaveOffset.y);

      /**
       * If the submenu has a offset and it mounts
       * inbetween menu and mouse, menu will receive a
       * mouse leave but submenu will not get a mouseenter
       */
      if (elementAtMousePosition === this.subMenuWrap || (0, _containsNode2.default)(this.subMenuWrap, elementAtMousePosition)) {
        return;
      }

      if (this.state.activeSubMenuIndex !== null) {
        this.delayCloseSubmenu(leaveOffset);
      }

      if (this.showTimeout) {
        clearTimeout(this.showTimeout);
      }
    }
  }, {
    key: 'delayCloseSubmenu',
    value: function delayCloseSubmenu() {
      var _this6 = this;

      if (!this.componentIsMounted) {
        return;
      }

      if (this.closeSubmenuTimeoutId) {
        return;
      }

      this.closeSubmenuTimeout = setTimeout(function () {
        _this6.closeSubmenuTimeout = null;
        _this6.setSubMenu({
          menuOffset: _this6.state.nextOffset,
          index: _this6.state.nextActiveSubMenuIndex
        });
      }, 100);
    }
  }, {
    key: 'removeMouseMoveListener',
    value: function removeMouseMoveListener() {
      if (this.onWindowMouseMove) {
        global.removeEventListener('mousemove', this.onWindowMouseMove);
        this.onWindowMouseMove = null;
      }
    }
  }, {
    key: 'setSubMenu',
    value: function setSubMenu() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          menuOffset = _ref3.menuOffset,
          _ref3$index = _ref3.index,
          index = _ref3$index === undefined ? null : _ref3$index;

      this.removeMouseMoveListener();
      if (!this.componentIsMounted) {
        return;
      }

      if (this.state.activeSubMenuIndex === index) {
        return;
      }

      if (this.hasItemSubMenu(index) && !this.state.mouseInside) {
        this.onInactivate();
      }

      this.setState({
        menuOffset: menuOffset,
        activeSubMenuIndex: index,
        nextOffset: null,
        nextTimestamp: null,
        timestamp: +new Date()
      });
    }
  }, {
    key: 'setNextSubmenu',
    value: function setNextSubmenu() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$menuOffset = _ref4.menuOffset,
          menuOffset = _ref4$menuOffset === undefined ? null : _ref4$menuOffset,
          _ref4$index = _ref4.index,
          index = _ref4$index === undefined ? null : _ref4$index;

      var ts = +new Date();

      this.setState({
        timestamp: ts,
        nextOffset: menuOffset,
        nextActiveSubMenuIndex: index,
        nextTimestamp: +new Date()
      });
    }
  }, {
    key: 'closeSubMenu',
    value: function closeSubMenu(options) {
      this.setSubMenu();
      if (options && options.autoFocus) {
        this.focus();
      }
    }
  }, {
    key: 'onMenuItemExpanderClick',
    value: function onMenuItemExpanderClick(event) {
      event.nativeEvent.expanderClick = true;
    }
  }, {
    key: 'onMenuItemClick',
    value: function onMenuItemClick() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var itemProps = arguments[1];
      var index = arguments[2];
      var props = this.props;
      // refactor to itemProps

      var stopped = event && event.isPropagationStopped ? event.isPropagationStopped() : false;

      if (props.stopClickPropagation && event.stopPropagation) {
        event.stopPropagation();
      }

      if (_isMobile2.default && itemProps && event && event.nativeEvent && event.nativeEvent.expanderClick) {
        var offset = {
          x: event.pageX,
          y: event.pageY
        };
        var menuOffset = (0, _getRegionRelativeToParent2.default)(event.currentTarget, props.rootClassName);
        this.onMenuItemMouseEnter({
          hasSubMenu: itemProps.hasSubMenu,
          menuOffset: menuOffset,
          index: itemProps.index
        });
        return;
      }

      if (!stopped) {
        props.onClick(event, itemProps, index);
        if (_isMobile2.default && props.onTouchStart) {
          props.onTouchStart(event, itemProps, index);
        }
        // can be overwritten by item props
        var dismissOnClick = itemProps && itemProps.item && itemProps.item.dismissOnClick !== undefined ? itemProps.item.dismissOnClick : props.dismissOnClick;

        if (props.autoDismiss) {
          if (!itemProps.hasSubMenu) {
            this.dismiss();
          } else if (dismissOnClick) {
            props.closeSubmenuRecursively();
          }
        } else if (dismissOnClick) {
          props.closeSubmenuRecursively();
        }

        if (props.selectOnClick) {
          this.handleSelectionChange({
            name: itemProps.name,
            value: itemProps.value,
            checked: !itemProps.checked,
            multiple: itemProps.multiple
          });
        }

        this.onChildClick(event, itemProps);
      }

      // make item focused
      if (!this.isSeparator(index)) {
        this.setFocusedIndex(index);
      }
    }
  }, {
    key: 'onChildClick',
    value: function onChildClick(event, props) {
      if (this.props.onChildClick) {
        this.props.onChildClick(event, props);
      }

      if (this.props.parentMenu) {
        this.props.parentMenu.onChildClick(event, props);
      }
    }
  }, {
    key: 'setupShowHideDelay',
    value: function setupShowHideDelay() {
      var _this7 = this;

      var setSubMenu = this.setSubMenu;
      this.setSubMenu = function () {
        var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            menuOffset = _ref5.menuOffset,
            index = _ref5.index;

        if (_this7.showTimeout) {
          clearTimeout(_this7.showTimeout);
        }

        if (_this7.hideTimeout) {
          clearTimeout(_this7.hideTimeout);
        }

        // show
        if (index != null) {
          if (_this7.props.showSubMenuDelay) {
            _this7.showTimeout = setTimeout(function () {
              return setSubMenu({ menuOffset: menuOffset, index: index });
            }, _this7.props.showSubMenuDelay);
          } else {
            setSubMenu({ menuOffset: menuOffset, index: index });
          }
        } else {
          // hide
          if (_this7.props.hideSubMenuDelay) {
            _this7.hideTimeout = setTimeout(function () {
              return setSubMenu({ menuOffset: menuOffset, index: index });
            }, _this7.props.hideSubMenuDelay);
          } else {
            setSubMenu({ menuOffset: menuOffset, index: index });
          }
        }
      };
    }
  }, {
    key: 'setupEnterAnimation',
    value: function setupEnterAnimation() {
      var _this8 = this;

      // set hidden to false after check alignmetn,
      // to make sure it had time to position
      // submenu correctly

      setTimeout(function () {
        var enableAnimation = _this8.props.enableAnimation && _this8.props.subMenu || _this8.props.enableRootAnimation && !_this8.props.subMenu;

        if (_this8.componentIsMounted) {
          _this8.setState({
            hidden: false,
            enableAnimation: enableAnimation
          });
        }
        if (enableAnimation) {
          setTimeout(function () {
            if (_this8.componentIsMounted) {
              _this8.setState({
                transitionStart: true
              });
            }
            // trigger animation end
            setTimeout(function () {
              if (_this8.componentIsMounted) {
                _this8.setState({
                  transitionEnded: true
                  // transitionStart: false
                });
              }
            }, 16); // transition end
          }, 16); // transition start
        }
      }, 0);
    }

    /**
     * Checks if it fits inside the constrain
     * passed props can be `nextProps`
     */

  }, {
    key: 'checkAlignment',
    value: function checkAlignment(props) {
      var _this9 = this;

      props = props || this.props;
      if ((props.constrainTo || props.alignTo) && !props.subMenu) {
        var doAlign = function doAlign() {
          var props = _this9.props;
          var alignPositions = _this9.getAlignPositions(props);
          var domNode = _this9.node;

          if (!domNode) {
            return;
          }

          var alignOffset = (0, _prepareAlignOffset2.default)(props.alignOffset);
          var domRegion = _regionAlign2.default.from(domNode);
          var actualRegion = domRegion.clone();

          var constrainRegion = props.constrainTo ? (0, _getConstrainRegion2.default)(props.constrainTo, domNode) : null;

          var positionStyle = void 0;

          if (props.alignTo) {
            var alignRegion = getAlignToRegion(props.alignTo, domNode);

            actualRegion.alignTo(alignRegion, alignPositions, {
              offset: alignOffset,
              constrain: constrainRegion
            });

            var offsetParentRegion = _regionAlign2.default.from(domNode.offsetParent || { top: 0, left: 0 });

            var newTop = actualRegion.top - offsetParentRegion.top;
            var newLeft = actualRegion.left - offsetParentRegion.left;

            positionStyle = {
              // using transform does not cause a browser layout on the document root
              // while left/top does
              transform: 'translate3d(' + Math.floor(newLeft) + 'px, ' + Math.floor(newTop) + 'px, 0px',
              top: 0,
              left: 0
              // left: newLeft,
              // top: newTop
            };
          }

          if (constrainRegion) {
            positionStyle = positionStyle || {};
            if (actualRegion.bottom > constrainRegion.bottom) {
              positionStyle.maxHeight = constrainRegion.bottom - actualRegion.top;
            }
          }

          if (positionStyle) {
            _this9.setState({ positionStyle: positionStyle });
          }
        };

        raf(doAlign);
      }
    }
  }, {
    key: 'setFocusedIndex',
    value: function setFocusedIndex(newFocusedItem) {
      if (this.props.enableKeyboardNavigation) {
        var focusedItem = this.state.focusedItem;
        if (focusedItem === newFocusedItem) {
          newFocusedItem = null;
        }
        this.scrollItemIntoView(newFocusedItem);
        this.setState({
          focusedItem: newFocusedItem
        });
      }
    }
  }, {
    key: 'getItemDOMNodeByIndex',
    value: function getItemDOMNodeByIndex(index) {
      var item = this.getItemByIndex(index);
      var itemNode = item && item.getDOMNode();

      return itemNode;
    }
  }, {
    key: 'getItemByIndex',
    value: function getItemByIndex(index) {
      return this.childrenRefs[index];
    }
  }, {
    key: 'getItemPropsByIndex',
    value: function getItemPropsByIndex(index) {
      var item = this.getItemByIndex(index);
      return item && item.props;
    }
  }, {
    key: 'getFocusedItemProps',
    value: function getFocusedItemProps() {
      var focusedItemIndex = this.state.focusedItem;
      var focusedItemProps = this.getItemPropsByIndex(focusedItemIndex);

      return focusedItemProps;
    }
  }, {
    key: 'getFocusedItem',
    value: function getFocusedItem() {
      return this.state.focusedItem != null && this.getItemByIndex(this.state.focusedItem);
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (this.node.focus) {
        this.node.focus();
      }
    }

    /**
     * whether a submenu is rendered
     */

  }, {
    key: 'hasSubMenuOpened',
    value: function hasSubMenuOpened() {
      return this.state.activeSubMenuIndex != null;
    }
  }, {
    key: 'isSubMenu',
    value: function isSubMenu() {
      return !!this.props.subMenu;
    }
  }, {
    key: 'doesAnyItemHasSubMenu',
    value: function doesAnyItemHasSubMenu() {
      var props = this.props;

      return props.items && !!props.items.filter(function (item) {
        return item.items && item.items.length;
      }).length;
    }
  }, {
    key: 'dosAnyItemHaveSelectInput',
    value: function dosAnyItemHaveSelectInput() {
      var _this10 = this;

      var props = this.props;

      return props.items && !!props.items.filter(function (item) {
        return item[_this10.props.nameProperty];
      }).length;
    }

    /**
     * Whether this or it's submenus
     * has focus
     */

  }, {
    key: 'hasGeneralFocus',
    value: function hasGeneralFocus() {
      // if it has focus doen't need to go further
      var hasFocus = this.hasFocus();

      if (hasFocus) {
        return hasFocus;
      }

      // check child
      if (this.hasSubMenuOpened()) {
        return this.hasSubMenuFocus();
      }

      return this.hasChildFocus();
    }
  }, {
    key: 'hasSubMenuFocus',
    value: function hasSubMenuFocus() {
      if (this.subMenu) {
        return this.subMenu.hasFocus();
      }

      return null;
    }
  }, {
    key: 'hasFocus',
    value: function hasFocus() {
      return this.node === (global.document && global.document.activeElement);
    }
  }, {
    key: 'hasChildFocus',
    value: function hasChildFocus() {
      return (0, _containsNode2.default)(this.node, global.document && global.document.activeElement);
    }

    /**
     * If submenu had focus it's parent should
     * get the focus back
     */

  }, {
    key: 'onSubmenuWillUnmount',
    value: function onSubmenuWillUnmount(config) {
      var _this11 = this;

      if (config && config.hasFocus) {
        setTimeout(function () {
          _this11.focus();
        }, 0);
      }
    }

    /**
     * used when a submenu is opened by mouse over
     * and then you press arrowRight to open
     * the alredy opened submenu, in which case
     * it should gain focus and set focusedItem to first item
     */

  }, {
    key: 'focusFirstItem',
    value: function focusFirstItem() {
      var fistNonDisabledItem = (0, _getFirstNonDisabledItem2.default)(this.props.items);
      this.focusItem(fistNonDisabledItem);
    }
  }, {
    key: 'focusItem',
    value: function focusItem(index) {
      this.focus();
      this.setFocusedIndex(index);
    }

    // node renderers

  }, {
    key: 'getSubmenuNode',
    value: function getSubmenuNode() {
      return this.subMenu && this.subMenu.getNode();
    }
  }, {
    key: 'getNode',
    value: function getNode() {
      return this.node;
    }

    // selection

  }, {
    key: 'getSelected',
    value: function getSelected() {
      return this.isSelectedControlled() ? this.props.selected : this.state.selected;
    }
  }, {
    key: 'isSelectedControlled',
    value: function isSelectedControlled() {
      return this.props.selected !== undefined;
    }
  }, {
    key: 'handleSelectionChange',
    value: function handleSelectionChange(_ref6) {
      var name = _ref6.name,
          value = _ref6.value,
          checked = _ref6.checked,
          multiple = _ref6.multiple;

      var newSelected = _extends({}, this.getSelected());

      // single select
      if (!multiple) {
        newSelected[name] = value;
      } else if (checked) {
        newSelected[name] = value === undefined ? name : value;
      }

      if (!checked) {
        if (multiple || this.props.allowUnselect) {
          delete newSelected[name];
        }
      }

      this.setSelected(newSelected);
    }
  }, {
    key: 'setSelected',
    value: function setSelected(newSelected) {
      if (!this.isSelectedControlled()) {
        this.setState({
          selected: newSelected
        });
      }

      this.props.onSelectionChange(newSelected);
    }
  }, {
    key: 'handleSubmenuSelectionChange',
    value: function handleSubmenuSelectionChange(selected) {
      // const newSelected = {
      //   ...this.getSelected(),
      //   ...selected
      // };

      this.setSelected(selected);
    }

    // expanded

    /**
     * Refactor, to hold only the index
     */

  }, {
    key: 'getExpandedIndex',
    value: function getExpandedIndex() {
      return this.state.activeSubMenuIndex;
    }
  }, {
    key: 'isSeparator',
    value: function isSeparator(index) {
      var props = this.props;

      var separatorIndexes = (0, _getSeparatorIndexes2.default)(props.items);
      return separatorIndexes.indexOf(index) !== -1;
    }
  }]);

  return ZippyMenu;
}(_reactClass2.default);

ZippyMenu.defaultProps = {
  /**
   * Used to calculate the depth of the menu
   * each menu renders it's submenu with this.props.depth + 1
   */
  rootClassName: 'zippy-react-toolkit-menu',
  depth: 0,
  isMenu: true,
  enableScroll: true,
  submenuStyle: null,
  scrollerProps: {},
  theme: 'default',
  dismissOnClick: true,
  disableScroller: false,
  shadow: true,
  submenuAlignOffset: _submenuAlignPositions.alignOffsetLTR,
  rtlSubmenuAlignOffset: _submenuAlignPositions.alignOffsetRTL,
  showSubMenuDelay: 150,
  hideSubMenuDelay: 150,
  expanderSize: 20,
  scrollOnMouseEnter: true,

  // events
  onClick: function onClick() {},
  onSelectionChange: function onSelectionChange() {},

  // items config
  columns: ['label'],
  items: null,

  // scroll
  maxHeight: 'none',
  // submenuMaxHeight: 'none',
  scrollArrowIncrementType: 'step',

  // animation
  enableAnimation: true,
  fadeDuration: 100,
  fadeTransitionFunction: 'ease',
  enableRootAnimation: false,

  itemStyle: {},
  itemOverStyle: {},
  itemDisabledStyle: {},
  itemExpandedStyle: {},
  cellStyle: {},

  stopClickPropagation: true,

  scrollProps: {},

  // smart algoritm
  inTriangleWaitDelay: 300,
  alignOffset: { x: 0, y: 0 },

  // text direction
  rtl: false,

  // navigation
  simulateClickOnEnterKeyPress: true,
  enableKeyboardNavigation: true,
  defaultFocusedItem: null,
  autoFocus: false,
  closeSubMenu: function closeSubMenu() {},
  closeSubmenuRecursively: function closeSubmenuRecursively() {},

  onDismiss: function onDismiss() {},
  componentWillUnmount: function componentWillUnmount() {},

  useMouseInTriangleCheck: false,

  // selection
  allowUnselect: false,
  enableSelection: false,
  nameProperty: 'name',
  valueProperty: 'value',
  selectionInputPosition: 'start',
  defaultSelected: {},
  selectOnClick: true,
  checkIconSize: 18,
  radioIconSize: 14,
  notifyResizeDelay: 16,
  browserNativeSelectInputs: false,
  showWarnings: !_uglified2.default
};

ZippyMenu.propTypes = {
  rootClassName: _propTypes2.default.string,
  items: _propTypes2.default.array,
  columns: _propTypes2.default.array,
  dismissOnClick: _propTypes2.default.bool,
  autoDismiss: _propTypes2.default.bool,
  disableScroller: _propTypes2.default.bool,
  showSubMenuDelay: _propTypes2.default.number,
  hideSubMenuDelay: _propTypes2.default.number,
  notifyResizeDelay: _propTypes2.default.number,
  scrollOnMouseEnter: _propTypes2.default.bool,

  // style
  padding: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  border: _propTypes2.default.string,
  borderRadius: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  rowActiveStyle: _propTypes2.default.object,
  rowOverStyle: _propTypes2.default.object,
  rowStyle: _propTypes2.default.object,
  maxHeight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  submenuMaxHeight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  minSize: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.shape({
    height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
  })]),
  maxSize: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.shape({
    height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
  })]),

  // events
  onClick: _propTypes2.default.func,

  // scroll
  showScrollArrows: _propTypes2.default.bool,
  scrollProps: _propTypes2.default.object,
  scrollArrowIncrementType: _propTypes2.default.oneOf(['step', 'page']),
  renderScroller: _propTypes2.default.func,

  // animation
  enableAnimation: _propTypes2.default.bool,
  fadeDuration: _propTypes2.default.number,
  fadeTransitionFunction: _propTypes2.default.string,
  enableRootAnimation: _propTypes2.default.bool,

  /**
   * these props are overwritten
   * by props or attributes added on items or MenuItem
   */
  itemStyle: _propTypes2.default.object,
  itemClassName: _propTypes2.default.string,

  itemActiveStyle: _propTypes2.default.object,
  itemActiveClassName: _propTypes2.default.string,

  itemOverStyle: _propTypes2.default.object,
  itemOverClassName: _propTypes2.default.string,

  itemDisabledStyle: _propTypes2.default.object,
  itemDisabledClassName: _propTypes2.default.string,

  itemExpandedStyle: _propTypes2.default.object,
  itemExpandedClassName: _propTypes2.default.string,

  itemFocusedStyle: _propTypes2.default.object,
  itemFocusedClassName: _propTypes2.default.string,

  itemOverFocusedStyle: _propTypes2.default.object,
  visible: _propTypes2.default.bool,
  itemHeight: _propTypes2.default.number,
  cellStyle: _propTypes2.default.object,
  secondaryLabelStyle: _propTypes2.default.object,
  labelStyle: _propTypes2.default.object,
  titleStyle: _propTypes2.default.object,

  // smart algorithm
  alignTo: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func, _propTypes2.default.string]),
  inTriangleWaitDelay: _propTypes2.default.number,
  alignPositions: _propTypes2.default.arrayOf(_propTypes2.default.string),
  alignOffset: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.number]),
  submenuAlignOffset: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  }), _propTypes2.default.number]),
  rtlSubmenuAlignOffset: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  }), _propTypes2.default.number]),
  alignPosition: _propTypes2.default.oneOf([1, -1]),

  // text direction
  rtl: _propTypes2.default.bool,

  // navigation
  enableKeyboardNavigation: _propTypes2.default.bool,
  defaultFocusedItem: _propTypes2.default.number,
  autoFocus: _propTypes2.default.bool,
  closeSubMenu: _propTypes2.default.func,
  closeSubmenuRecursively: _propTypes2.default.func,
  simulateClickOnEnterKeyPress: _propTypes2.default.bool,

  onChildClick: _propTypes2.default.func,
  onDismiss: _propTypes2.default.func,
  expanderStyle: _propTypes2.default.object,
  depth: _propTypes2.default.number,
  isMenu: _propTypes2.default.bool,
  constrainTo: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.func]),
  enableScroll: _propTypes2.default.bool,
  submenuStyle: _propTypes2.default.object,
  scrollerProps: _propTypes2.default.object,
  theme: _propTypes2.default.string,
  stopClickPropagation: _propTypes2.default.bool,
  componentWillUnmount: _propTypes2.default.func,
  itemStyleProps: _propTypes2.default.object,
  childrenLength: _propTypes2.default.number,
  separatorIndexes: _propTypes2.default.string,
  tableClassName: _propTypes2.default.string,
  shadow: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),

  submenuProps: _propTypes2.default.object,
  menuHasSubmenu: _propTypes2.default.bool,
  depthSet: _propTypes2.default.bool,
  subMenu: _propTypes2.default.bool,
  parentIndex: _propTypes2.default.number,
  parentMenu: _propTypes2.default.object,
  onActivate: _propTypes2.default.func,
  onInactivate: _propTypes2.default.func,
  expander: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.bool, _propTypes2.default.func]),
  expanderSize: _propTypes2.default.number,
  overStyle: _propTypes2.default.object,
  activeStyle: _propTypes2.default.object,
  disabledStyle: _propTypes2.default.object,
  expandedStyle: _propTypes2.default.object,

  menuSeparatorStyle: _propTypes2.default.object,

  // enable algoritm which checkes when the mouse leaves
  // an element it't direction it is towards the submenu
  useMouseInTriangleCheck: _propTypes2.default.bool,

  // selection
  selected: _propTypes2.default.object,
  defaultSelected: _propTypes2.default.object,
  allowUnselect: _propTypes2.default.bool,
  enableSelection: _propTypes2.default.bool,
  nameProperty: _propTypes2.default.string,
  valueProperty: _propTypes2.default.string,
  renderCheckInput: _propTypes2.default.func,
  renderRadioInput: _propTypes2.default.func,
  onSelectionChange: _propTypes2.default.func,
  selectionInputPosition: _propTypes2.default.oneOf(['start', 'end']),
  selectOnClick: _propTypes2.default.bool,
  checkIconSize: _propTypes2.default.number,
  radioIconSize: _propTypes2.default.number,
  showWarnings: _propTypes2.default.bool,
  browserNativeSelectInputs: _propTypes2.default.bool
};

exports.default = ZippyMenu;