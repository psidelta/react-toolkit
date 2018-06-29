/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from '@zippytech/react-class/autoBind';
import assign from '../../common/assign';
import uglified from '@zippytech/uglified';
import shallowequal from '../../common/shallowequal';
import Region from '@zippytech/region';
import { findDOMNode } from 'react-dom';

// comp
import Node from './Node';

// utils
import join from '../../common/join';
import cleanProps from '../../common/cleanProps';
import shouldComponentUpdate from '../../common/shouldComponentUpdate';
import getNewRecursiveCheckedState from './utils/getNewRecursiveCheckedState';
import isParentCollapsed from './utils/isParentCollapsed';
import getLastRootNode from './utils/getLastRootNode';
import injectNodes from './utils/injectNodes';
import injectNode from './utils/injectNode';
import safeParseInt from './utils/safeParseInt';
import changeChildrenProperty from './utils/changeChildrenProperty';
import getDataSourceUpdater from './utils/getDataSourceUpdater';
import cleanUpFalseProps from './utils/cleanUpFalseProps';
import Menu from '../../Menu';

const NODE_MENU_ALIGN_POSITIONS = ['tl-tl', 'tr-tl', 'bl-tl', 'br-tl'];

class ZippyTreeView extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      loading: !!(props.dataSource && props.dataSource.then),
      collapsed: props.defaultCollapsed || {},
      selected: props.defaultSelected,
      checked: props.defaultChecked,
      activeNode: props.defaultActiveNode,
      nodesLoading: {},
      collapsedDepth: props.defaultCollapsedDepth
    };

    /**
     * store nodes that have been loaded
     * async, used for loadNodeOnce
     */
    this.loadedNodesPaths = {};
  }

  componentWillMount() {
    this.loadDataSource(this.props.dataSource);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldComponentUpdate(this, nextProps, nextState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.loadDataSource(nextProps.dataSource);
    }
  }

  componentDidUpdate() {
    /**
     * Trigger collapseChange if
     * filter has a different value,
     * must check here as nodes have to be rendered
     * to determine if they are filtered or not
     */
    if (this.isFiltered() && this.hasFilterChanged()) {
      const newCollapsedForFilteredNodes = Object.keys(
        this.filteredNodes
      ).reduce((acc, el) => {
        acc[el] = false;

        return acc;
      }, {});

      const newCollapsed = assign(
        {},
        this.getCurrentCollapsedState(),
        newCollapsedForFilteredNodes
      );

      // Remove paths with false
      cleanUpFalseProps(newCollapsed);

      if (!shallowequal(this.getCurrentCollapsedState(), newCollapsed)) {
        this.setCollapsed(newCollapsed);
      }
    }
  }

  componentWillUnmount() {
    this.nodePropsMap = null;

    // usedt for loadNodeOnce, to know whether a node was loaded
    this.loadedNodesPaths = null;

    /**
     * Construct a map of nodes that are collapsed/selected/checked,
     * used to determine the correct state of the tree
     *
     * These maps are used to overwrite previous state (this.state.collapsed),
     * or props (this.props.collapsed) when a node changes state, to reflect
     * the real state.
     *
     * Real state for collapse (e.g):
     * - collapseDepth
     * - collapsed controlled and uncontrolled
     * - isNodeCollapsed
     * - node collapse change
     */
    this.visibleNodesPaths = null;
    this.collapsedNodesPaths = null;
    this.checkedNodesPaths = null;
    this.selectedNodesPaths = null;
  }

  render() {
    const { children, theme, style, rootClassName } = this.props;

    const isCheckedEnabled = this.isCheckedEnabled();
    const checkOnClick =
      this.props.checkOnClick === undefined
        ? isCheckedEnabled
        : this.props.checkOnClick;

    const className = join(
      rootClassName,
      `${rootClassName}--theme-${theme}`,
      this.props.enableSelection && `${rootClassName}--selection-enabled`,
      isCheckedEnabled && `${rootClassName}--check-enabled`,
      this.props.expandOnToolOnly && `${rootClassName}--expand-on-tool-only`,
      this.props.rtl ? `${rootClassName}--rtl` : `${rootClassName}--ltr`,
      checkOnClick && `${rootClassName}--check-onClick`,
      this.isLoading() && `${rootClassName}--loading`,
      this.props.enableHoverStyle && `${rootClassName}--enable-hover-style`,
      this.props.className
    );

    const data = this.state.data;
    const loading = this.isLoading();
    /**
     * Store a pointer to each nodeProps.
     * This way there is the posibility to do usefull things,
     * like getNodePropsByPath, or simulate events easy.
     *
     * All other caches will be constructed using an array of paths.
     * And access to the actual node will be done using nodePropsMap
     */
    this.nodePropsMap = {};

    /**
     * An array of paths of visible nodes.
     */
    this.visibleNodesPaths = [];
    this.collapsedNodesPaths = [];
    this.checkedNodesPaths = [];
    this.selectedNodesPaths = [];
    this.previousFilteredNodes = this.filteredNodes;
    this.filteredNodes = {};

    let nodes;
    if (data && !this.isLoading()) {
      nodes = this.renderNodes(data);
    } else {
      nodes = this.renderLoader();
    }

    // NOTE props that are set globaly cannot also be set on
    // Node, they will be overwritten by global ones
    return (
      <div
        {...cleanProps(this.props, ZippyTreeView.propTypes)}
        className={className}
        style={style}
        tabIndex={-1}
        ref={node => (this.node = node)}
        onKeyDown={this.onKeyDown}
      >
        {nodes}
        {this.renderNodeContextMenu()}
      </div>
    );
  }

  hideNodeContextMenu() {
    this.setState({ nodeContextMenuProps: null });
  }

  renderNodeContextMenu() {
    const nodeProps = this.state.nodeContextMenuProps;
    const { renderNodeContextMenu } = this.props;

    if (!nodeProps) {
      return null;
    }
    if (!renderNodeContextMenu) {
      return null;
    }

    const items = [];

    const menuProps = {
      autoFocus: true,
      onDismiss: this.hideNodeContextMenu,
      style: { zIndex: 10000, position: 'absolute' },
      items,
      constrainTo: this.nodeContextMenuConstrainTo,
      alignPositions: NODE_MENU_ALIGN_POSITIONS,
      alignTo: this.nodeContextMenuAlignTo
    };

    const menu = renderNodeContextMenu(menuProps, {
      nodeProps,
      tree: this,
      props: this.p
    });

    if (menu === undefined) {
      return <Menu {...menuProps} />;
    }

    return menu;
  }

  onNodeContextMenu(nodeProps, event) {
    if (!this.props.renderNodeContextMenu) {
      return;
    }
    event.preventDefault();

    this.nodeContextMenuAlignTo = Region.from(event);
    this.nodeContextMenuConstrainTo = findDOMNode(this);

    this.setState({ nodeContextMenuProps: nodeProps });
  }

  renderLoader() {
    let loader = 'Loading...';

    if (this.props.renderLoader) {
      loader = this.props.renderLoader(this.props);
    }

    return loader;
  }

  renderNodes(
    nodes,
    parentPath = '',
    parent = null,
    parentDepth = -1,
    indexPath
  ) {
    const lastIndex = nodes.length - 1;
    return nodes.reduce((acc, node, index) => {
      const config = {
        node,
        index,
        parentPath,
        parentDepth,
        parent,
        indexPath,
        isLast: lastIndex === index
      };

      const renderedNode = this.renderNode(config);

      if (renderedNode) {
        acc.push(renderedNode);
      }

      return acc;
    }, []);
  }

  renderNode(config) {
    const {
      node,
      index,
      parentPath,
      parentDepth,
      parent,
      parentIndex,
      indexPath: parentIndexPath,
      isLast
    } = config;

    const isCheckEnabled = this.isCheckedEnabled();

    const checkOnClick =
      this.props.checkOnClick === undefined
        ? isCheckEnabled
        : this.props.checkOnClick;

    let children;
    let nodeIdentifier;

    /**
     * It is assumed that if the node has nodes even if it is an empty
     * array it has children. See docs section about leaf node.
     */
    const hasChildren = !!node.nodes;
    const path = this.getPath({
      node,
      index,
      props: this.props,
      parentPath
    });

    let result;
    let nodeProps = {
      node,
      children,
      parent,
      path,
      index,
      hasChildren,
      isLast,
      matchText: undefined,
      rootClassName: `${this.props.rootClassName}__node`,
      expandToolSize: this.props.expandToolSize,
      rtl: this.props.rtl,
      key: path,
      expandTool: this.props.expandTool,
      loadTool: this.props.loadTool,
      checkBeforeIcon: this.props.checkBeforeIcon,
      scrollNodeIntoView: this.scrollNodeIntoView,
      enableScrollNodeIntoView: this.props.enableScrollNodeIntoView,
      onNodeContextMenu: this.onNodeContextMenu,
      // icons
      nodeIcon: this.props.nodeIcon,
      nodeCollapsedIcon: this.props.nodeCollapsedIcon,
      leafNodeIcon: this.props.leafNodeIcon,

      // custom renderers
      renderLabel: this.props.renderLabel,
      renderIcon: this.props.renderIcon,
      renderContent: this.props.renderContent,
      renderCheck: this.props.renderCheck,
      renderNodeText: this.props.renderNodeText,

      onCollapsedChange: this.onNodeCollapseChange,
      expandOnToolOnly: this.props.expandOnToolOnly,
      expandOnDoubleClick: this.props.expandOnDoubleClick,

      // animation
      transition: this.props.transition,
      transitionDuration: this.props.transitionDuration,

      // selection
      enableSelection: this.props.enableSelection,
      onSelectionChange: this.onSelectionChange,

      // check
      checkNodesRecursive: this.props.checkNodesRecursive,
      enableChecked: isCheckEnabled,
      onCheckedChange: this.onCheckedChange,
      checkOnClick,

      // active - navigation
      onActiveNodeChange: this.onActiveNodeChange,
      enableKeyboardNavigation: this.props.enableKeyboardNavigation,

      // async nodes
      nodeLoader: this.props.nodeLoader,

      // treeLines
      treeLines: this.props.treeLines,
      nestingIndentation: this.props.nestingIndentation
    };

    let domProps = {};

    // depth - used for collapsedDepth
    nodeProps.depth = parentDepth + 1; // it is just like path but it uses indexes

    /**
     * indexPath
     * Used to identify a node, is needed for whenever
     * dataSource needs to be updated
     * path can be hard to decode if idProperty is used
     *
     * String is used as it uses less memory.
     */
    nodeProps.indexPath = `${
      parentIndexPath != undefined ? `${parentIndexPath}/` : ''
    }${index}`;

    // is loading
    nodeProps.loading = this.state.nodesLoading[path];

    // collapsed
    nodeProps.collapsed = this.getNodeCollapsedState(path);
    nodeProps.collapsed = this.getCollapsedDepthCollapseState(nodeProps);

    if (this.props.isNodeCollapsed) {
      nodeProps.collapsed = this.props.isNodeCollapsed(nodeProps);
    }

    if (nodeProps.collapsed) {
      this.collapsedNodesPaths.push(path);
    }

    /**
     * selected
     */
    if (this.props.enableSelection) {
      nodeProps.selected = this.getNodeSelectedState(path);
      if (this.props.isNodeSelected) {
        nodeProps.selected = this.props.isNodeSelected(nodeProps);
      }
    }

    if (nodeProps.selected) {
      this.selectedNodesPaths.push(path);
    }

    // active
    if (this.props.enableKeyboardNavigation) {
      nodeProps.active = this.getNodeActiveState(path);
    }

    // check
    nodeProps.checked = this.getNodeCheckedState(path);
    if (this.props.isNodeChecked) {
      nodeProps.checked = this.props.isNodeChecked(nodeProps);
    }

    if (nodeProps.checked) {
      this.checkedNodesPaths.push(path);
    }

    // disabled
    nodeProps.disabled = this.props.disabled[path] || node.disabled;
    if (this.props.isNodeDisabled) {
      nodeProps.disabled = this.props.isNodeDisabled(nodeProps);
    }

    // if disabled it is always collapsed
    if (nodeProps.disabled) {
      nodeProps.collapsed = true;
    }

    // is async
    if (this.props.loadNode) {
      nodeProps.async = true;
    } else if (this.props.loadNodeOnce && node.nodes === null) {
      nodeProps.async = true;
    }

    if (
      (this.props.loadNode || this.props.loadNodeOnce) &&
      this.props.isNodeAsync
    ) {
      nodeProps.async = this.props.isNodeAsync(nodeProps);
    }

    if (nodeProps.async && !nodeProps.hasChildren) {
      nodeProps.hasChildren = true;
      nodeProps.collapsed = true;
    }

    /**
     * so the order is correct
     * Save a reference to every node that will
     * be rendered, it is needed to navigate
     *
     * also push node before children, so
     * they are in the correct order.
     */
    const isVisible = !isParentCollapsed(parent);
    if (isVisible) {
      this.visibleNodesPaths.push(path);
    }

    // construct nodePropsMap
    this.nodePropsMap[path] = nodeProps;

    // chilren, if is loading there is no need to load children
    if (hasChildren && !nodeProps.loading) {
      nodeProps.children = this.renderNodes(
        node.nodes,
        path,
        nodeProps,
        nodeProps.depth,
        nodeProps.indexPath
      );
    }

    // filter
    if (this.props.filter) {
      const isNodeFiltered = this.props.filter(nodeProps);

      if (!isNodeFiltered) {
        if (!nodeProps.children) {
          nodeProps.hidden = true;
        }

        if (
          nodeProps.children &&
          nodeProps.children.filter(node => !node.props.hidden).length === 0
        ) {
          nodeProps.hidden = true;
        }
      }

      if (!nodeProps.hidden) {
        this.filteredNodes[nodeProps.path] = true;
      }
    }

    /**
     * It is set here, so contentStyle prop when is a function
     * can overwrite any style
     */
    if (this.props.nestingIndentation) {
      const paddingProp = this.props.rtl ? 'paddingRight' : 'paddingLeft';
      nodeProps.contentStyle = { [paddingProp]: this.props.nestingIndentation };
    }
    nodeProps.contentStyle = this.getStyle(
      nodeProps,
      nodeProps.contentStyle,
      this.props.contentStyle,
      node.contentStyle
    );

    // classNames
    domProps.className = this.getClassName(
      nodeProps,
      this.props.nodeClassName,
      node.className
    );
    nodeProps.labelClassName = this.getClassName(
      nodeProps,
      this.props.labelClassName,
      node.labelClassName
    );
    nodeProps.contentClassName = this.getClassName(
      nodeProps,
      this.props.contentClassName,
      node.contentClassName
    );

    // styles
    // must be set here so more props are available on nodeProps
    domProps.style = this.getStyle(nodeProps, this.props.nodeStyle, node.style);
    nodeProps.labelStyle = this.getStyle(
      nodeProps,
      this.props.labelStyle,
      node.labelStyle
    );

    if (typeof this.props.renderNode === 'function') {
      result = this.props.renderNode(domProps, nodeProps);
    }
    if (result === undefined) {
      result = <Node {...nodeProps} domProps={domProps} />;
    }

    return result;
  }

  // events

  /**
   * Called when  a node is collapsed or expanded
   * @prop isSimulated: it is true when it is not triggered by
   * a node.
   */
  onNodeCollapseChange({ collapsed, props: nodeProps }) {
    const path = nodeProps.path;
    const actualCollapsedState = this.collapsedNodesPaths.reduce(
      (acc, path) => {
        acc[path] = true;
        return acc;
      },
      {}
    );

    const newCollapsed = assign(
      {},
      this.getCurrentCollapsedState(),
      actualCollapsedState,
      {
        [path]: collapsed
      }
    );

    // Remove paths with false
    cleanUpFalseProps(newCollapsed);

    const getUpdatedDataSource = getDataSourceUpdater({
      data: this.state.data,
      extraProps: { collapsed },
      nodeProps
    });

    this.props.onCollapsedChange({
      getUpdatedDataSource,
      collapsedMap: newCollapsed,
      ...nodeProps
    });

    if (this.props.onCollapsedDepthChange) {
      this.props.onCollapsedDepthChange(null);
    }

    /**
     * State should be update if:
     * - collapsed is uncontrolled
     * - and collapsedDepth is uncontrolleds
     */
    if (!this.isCollapsedControlled()) {
      this.setState({
        collapsed: newCollapsed,
        collapsedDepth: null
      });
    }

    /**
     * Aync nodes
     */
    if (!collapsed) {
      this.loadAsyncNode(nodeProps);
    }

    return newCollapsed;
  }

  onSelectionChange({ selected, props: nodeProps }) {
    const path = nodeProps.path;
    let newSelected;

    if (this.props.singleSelect) {
      newSelected = selected ? { [path]: true } : {};
    } else {
      const actualSelectedState = this.selectedNodesPaths.reduce(
        (acc, path) => {
          acc[path] = true;

          return acc;
        },
        {}
      );

      newSelected = assign(
        {},
        this.getCurrentSelectedState(),
        actualSelectedState
      );
      // if false remove from map
      // it can be null for indeterminated
      if (selected === false) {
        delete newSelected[path];
      } else {
        newSelected[path] = selected;
      }
    }

    if (this.props.checkOnSelect) {
      this.onCheckedChange({
        checked: selected,
        props: nodeProps
      });
    }

    if (!this.isSelectedControlled()) {
      this.setState({
        selected: newSelected
      });
    }

    const getUpdatedDataSource = getDataSourceUpdater({
      data: this.state.data,
      extraProps: { selected },
      nodeProps
    });

    this.props.onSelectionChange(
      assign({}, nodeProps, {
        selectedMap: newSelected,
        selected,
        getUpdatedDataSource
      })
    );

    return newSelected;
  }

  onCheckedChange({ checked, props: nodeProps }) {
    if (!this.isCheckedEnabled()) {
      return;
    }
    const actualCheckedState = this.checkedNodesPaths.reduce((acc, path) => {
      acc[path] = true;

      return acc;
    }, {});
    let newChecked = assign(
      {},
      this.getCurrentCheckedState(),
      actualCheckedState
    );

    const path = nodeProps.path;

    if (this.props.checkNodesRecursive) {
      newChecked = getNewRecursiveCheckedState({
        nodeProps,
        checked,
        currentState: newChecked
      });

      // Remove paths with false
      Object.keys(newChecked).forEach(path => {
        if (newChecked[path] === false) {
          delete newChecked[path];
        }
      });
    } else {
      /**
       * Simple case in which there is no check relation
       * between parent children nodes
       */
      if (checked === false) {
        delete newChecked[path];
      } else {
        newChecked[path] = checked;
      }
    }

    if (!this.isCheckedControlled()) {
      this.setState({
        checked: newChecked
      });
    }

    const getUpdatedDataSource = getDataSourceUpdater({
      data: this.state.data,
      extraProps: { checked },
      nodeProps
    });

    this.props.onCheckedChange(
      assign({}, nodeProps, {
        checked,
        getUpdatedDataSource,
        checkedMap: newChecked
      })
    );

    return newChecked;
  }

  onActiveNodeChange(nodeProps) {
    if (!this.props.enableKeyboardNavigation) {
      return null;
    }

    if (!this.isActiveNodeControlled()) {
      this.setState({
        activeNode: nodeProps.path
      });
    }

    /**
     * when active changes (by click)
     * need to add focus on tree so
     * arrow navigation works
     */
    if (!this.hasFocus()) {
      this.focus();
    }

    this.props.onActiveNodeChange(
      assign({}, nodeProps, { activeNode: nodeProps.path })
    );
  }

  onKeyDown(event) {
    if (!this.props.enableKeyboardNavigation) {
      return null;
    }

    switch (event.key) {
      case 'ArrowUp':
        this.onArrowUp(event);
        event.preventDefault();
        break;
      case 'ArrowDown':
        this.onArrowDown(event);
        event.preventDefault();
        break;
      case 'ArrowLeft':
        this.onArrowLeft(event);
        break;
      case 'ArrowRight':
        this.onArrowRight(event);
        break;
      case ' ':
        this.onSpace(event);
        event.preventDefault();
        break;
      case 'PageUp':
        this.onPageUp(event);
        event.preventDefault();
        break;
      case 'PageDown':
        this.onPageDown(event);
        event.preventDefault();
        break;
      case 'Home':
        this.onHome(event);
        break;
      case 'End':
        this.onEnd(event);
        break;
      case 'Enter':
        this.onEnter();
        event.preventDefault();
        break;
    }
  }

  /**
   * Handles change activeNode to next node
   * @return void
   */
  onArrowUp() {
    this.setPreviousNodeActive();
  }

  /**
   * Handles change activeNode to previous node
   * @return void
   */
  onArrowDown() {
    this.setNextNodeActive();
  }

  onArrowLeft() {
    const currentActiveNode = this.getActiveNodeProps();

    if (this.props.rtl) {
      if (currentActiveNode.collapsed && currentActiveNode.hasChildren) {
        this.onNodeCollapseChange({
          collapsed: false,
          props: currentActiveNode
        });
      } else {
        this.setNextNodeActive();
      }
    } else if (!currentActiveNode.collapsed && currentActiveNode.hasChildren) {
      this.onNodeCollapseChange({
        collapsed: true,
        props: currentActiveNode
      });
    } else {
      this.setPreviousNodeActive();
    }
  }

  onArrowRight() {
    const currentActiveNode = this.getActiveNodeProps();
    if (!currentActiveNode) {
      return null;
    }

    if (this.props.rtl) {
      if (!currentActiveNode.collapsed) {
        this.onNodeCollapseChange({
          collapsed: true,
          props: currentActiveNode
        });
      } else {
        this.setPreviousNodeActive();
      }
    } else if (currentActiveNode.collapsed) {
      this.onNodeCollapseChange({
        collapsed: false,
        props: currentActiveNode
      });
    } else {
      this.setNextNodeActive();
    }
  }

  onSpace() {
    this.checkActiveNode();
  }

  onPageUp() {
    this.setFirstChildActive();
  }

  onPageDown() {
    this.setLastChildActive();
  }

  onHome(event) {
    event.preventDefault();
    this.setFistRenderedNodeActive();
  }

  onEnd(event) {
    event.preventDefault();
    this.setLastRenderedNodeActive();
  }

  onEnter() {
    this.toggleCollapseActiveNode();
  }

  // set actions
  loadAsyncNode(nodeProps) {
    let loadFunction;

    if (!nodeProps.async) {
      return null;
    }

    if (this.props.loadNodeOnce && !this.loadedNodesPaths[nodeProps.path]) {
      loadFunction = this.props.loadNodeOnce;

      /**
       * As it doen't influence render it can be a
       * property on the instance
       */
      this.loadedNodesPaths[nodeProps.path] = true;
    } else {
      loadFunction = this.props.loadNode;
    }

    if (loadFunction) {
      const newNodes = loadFunction(nodeProps);
      const updatePath = nodeProps.indexPath.split('/').map(safeParseInt);

      if (newNodes === nodeProps.node.nodes) {
        return null;
      }

      if (
        Array.isArray(newNodes) ||
        newNodes == null // allow undefined also
      ) {
        const newData = injectNodes(newNodes, updatePath, this.state.data);
        this.setData(newData);
      } else if (newNodes && newNodes.then) {
        this.setState({
          nodesLoading: assign({}, this.state.nodesLoading, {
            [nodeProps.path]: true
          })
        });

        newNodes
          .then(newNodes => {
            this.props.onNodeLoad(newNodes, nodeProps);

            this.setState({
              nodesLoading: assign({}, this.state.nodesLoading, {
                [nodeProps.path]: false
              })
            });

            if (newNodes === nodeProps.node.nodes) {
              return null;
            }

            const newData = injectNodes(newNodes, updatePath, this.state.data);
            this.setData(newData);
          })
          .catch(() => {
            this.setState({
              nodesLoading: assign({}, this.state.nodesLoading, {
                [nodeProps.path]: false
              })
            });
          });
      }
    }
  }

  checkActiveNode() {
    if (!this.isCheckedEnabled()) {
      return;
    }
    const activeNode = this.getActiveNodeProps();
    this.onCheckedChange({
      props: activeNode,
      checked: !activeNode.checked
    });
  }

  setPreviousNodeActive() {
    const previousNodeProps = this.getPreviousNodeProps();
    if (!previousNodeProps) {
      return null;
    }
    this.onActiveNodeChange(previousNodeProps);
  }

  setFirstChildActive() {
    const activeNodeProps = this.getActiveNodeProps();

    if (activeNodeProps.parent) {
      const fistChildProps = activeNodeProps.parent.children[0].props;
      this.onActiveNodeChange(fistChildProps);
    } else {
      this.onActiveNodeChange(
        this.getNodePropsByPath(this.visibleNodesPaths[0])
      );
    }
  }

  setLastChildActive() {
    const activeNodeProps = this.getActiveNodeProps();

    if (activeNodeProps.parent) {
      const parentChildren = activeNodeProps.parent.children;
      const lastChildNode = parentChildren[parentChildren.length - 1].props;
      this.onActiveNodeChange(lastChildNode);
    } else {
      const activeNodeIndex = this.getActiveNodeIndex();
      const visibleNodesProps = this.visibleNodesPaths.map(
        this.getNodePropsByPath
      );
      const previousRootNode = getLastRootNode(
        activeNodeIndex,
        visibleNodesProps
      );
      if (!previousRootNode) {
        return null;
      }
      this.onActiveNodeChange(previousRootNode);
    }
  }

  setFistRenderedNodeActive() {
    this.onActiveNodeChange(this.getNodePropsByPath(this.visibleNodesPaths[0]));
  }

  setLastRenderedNodeActive() {
    this.onActiveNodeChange(
      this.getNodePropsByPath(
        this.visibleNodesPaths[this.visibleNodesPaths.length - 1]
      )
    );
  }

  setNextNodeActive() {
    const nextNodeProps = this.getNextNodeProps();
    if (!nextNodeProps) {
      return null;
    }
    this.onActiveNodeChange(nextNodeProps);
  }

  toggleCollapseActiveNode() {
    const activeNodeProps = this.getActiveNodeProps();
    this.onNodeCollapseChange({
      collapsed: !activeNodeProps.collapsed,
      props: activeNodeProps
    });
  }

  loadDataSource(dataSource) {
    if (Array.isArray(dataSource)) {
      if (this.state.loading) {
        this.setState({
          loading: false
        });
      }
      this.setData(dataSource);
      return;
    }

    if (dataSource && dataSource.then) {
      this.setState({
        loading: true
      });

      dataSource.then(data => {
        this.props.onDataSourceLoad(data);
        this.loadDataSource(data);
      });
      return;
    }

    if (typeof dataSource === 'function') {
      this.loadDataSource(dataSource(this.props));
      return;
    }

    if (dataSource === null) {
      return null;
    }

    if (!uglified) {
      console.error(
        `
        dataSource is not valid, it should be:
        - array
        - null
        - promise
        - function (props) => dataSource
        instead got ${typeof dataSource}
        `
      );
    }
  }

  setData(data) {
    this.setState({
      data
    });
  }

  // getter methods
  isLoading() {
    return this.props.loading != undefined
      ? this.props.loading
      : this.state.loading;
  }

  /**
   * Constructs path using pathProperty, pathSeparator and idProperty
   */
  getPath({ node, index, props, parentPath }) {
    let isUnique = props.idProperty != null;

    let nodeIdentifier;
    if (isUnique) {
      nodeIdentifier =
        typeof props.idProperty === 'function'
          ? node[props.idProperty(node)]
          : node[props.idProperty];
    } else if (props.pathProperty == null) {
      nodeIdentifier = index;
    } else {
      nodeIdentifier =
        typeof props.pathProperty === 'function'
          ? node[props.pathProperty(node)]
          : node[props.pathProperty];
    }

    let path;
    if (isUnique) {
      path = nodeIdentifier;
    } else {
      path = `${parentPath}${
        parentPath ? props.pathSeparator : ''
      }${nodeIdentifier}`;
    }

    return path;
  }

  getStyle(nodeProps, ...styles) {
    let style = {};
    styles.forEach(styleItem => {
      const newStyle =
        typeof styleItem === 'function' ? styleItem(nodeProps) : styleItem;

      assign(style, newStyle);
    });

    return style;
  }

  getClassName(nodeProps, ...classNames) {
    let className = '';

    classNames.forEach(classNameItem => {
      const newClassName =
        typeof classNameItem === 'function'
          ? classNameItem(nodeProps)
          : classNameItem;

      className = join(className, newClassName);
    });

    return className;
  }

  /**
   * Gets the collapsed map based on whether
   * the component is controlled or uncontrolled
   */
  getCurrentCollapsedState() {
    return this.isCollapsedControlled()
      ? this.props.collapsed
      : this.state.collapsed;
  }

  /**
   * Gets collapsed state using path based whther
   * the component is controlled or uncontrolled
   */
  getNodeCollapsedState(path) {
    return this.isCollapsedControlled()
      ? this.props.collapsed[path]
      : this.state.collapsed[path];
  }

  /**
   * Gets the selected map based on whether
   * the component is controlled or uncontrolled
   */
  getCurrentSelectedState() {
    return this.isSelectedControlled()
      ? this.props.selected
      : this.state.selected;
  }

  /**
   * Gets selected state using path based whther
   * the component is controlled or uncontrolled
   */
  getNodeSelectedState(path) {
    return this.isSelectedControlled()
      ? this.props.selected[path]
      : this.state.selected[path];
  }

  /**
   * Gets the checked map based on whether
   * the component is controlled or uncontrolled
   */
  getCurrentCheckedState() {
    return this.isCheckedControlled() ? this.props.checked : this.state.checked;
  }

  isCheckedEnabled() {
    if (this.props.enableChecked) {
      return true;
    }
    if (this.props.enableChecked === false) {
      return false;
    }
    return !!this.getCurrentCheckedState();
  }

  /**
   * Gets the current active node based on whether
   * the component is controlled or uncontrolled
   */
  getCurrentActiveNodeState() {
    return this.isActiveNodeControlled()
      ? this.props.activeNode
      : this.state.activeNode;
  }

  /**
   * Gets checked state using path based whther
   * the component is controlled or uncontrolled
   */
  getNodeCheckedState(path) {
    if (this.isCheckedControlled()) {
      return this.props.checked[path];
    }

    if (!this.state.checked) {
      return false;
    }
    return this.state.checked[path];
  }

  /**
   * Gets active node state using path based whther
   * the component is controlled or uncontrolled
   * @param path String
   */
  getNodeActiveState(path) {
    return this.getCurrentActiveNodeState() === path;
  }

  /**
   * @return nextActiveProps Object - prevous node's props
   */
  getPreviousNodeProps() {
    const currentActiveNodeIndex = this.getActiveNodeIndex();
    let previousNode = null;
    let index = currentActiveNodeIndex - 1;

    while (index >= 0) {
      const currentNodeProp = this.getNodePropsByPath(
        this.visibleNodesPaths[index]
      );
      if (currentNodeProp && !currentNodeProp.disabled) {
        previousNode = currentNodeProp;
        break;
      }

      index -= 1;
    }

    return previousNode;
  }

  /**
   * @return previousNodeProps Object - prevous node's props
   */
  getNextNodeProps() {
    const currentActiveNodeIndex = this.getActiveNodeIndex();
    let index = currentActiveNodeIndex + 1;
    let nextNode;

    while (index < this.visibleNodesPaths.length) {
      const currentNode = this.getNodePropsByPath(
        this.visibleNodesPaths[index]
      );
      if (currentNode && !currentNode.disabled) {
        nextNode = currentNode;
        break;
      }

      index += 1;
    }

    return nextNode;
  }

  /**
   * @return {Number}
   */
  getActiveNodeIndex() {
    /**
     * always have to search
     * cause index can be different
     */
    return this.visibleNodesPaths.indexOf(this.getCurrentActiveNodeState());
  }

  /**
   * @return {Object} active node props
   */
  getActiveNodeProps() {
    return this.getNodePropsByPath(this.getCurrentActiveNodeState()); // this.visibleNodesPaths[this.getActiveNodeIndex()]
  }

  /**
   * Returns whether a node is collapse in relation with
   * collapsedDepth and defaultCollapsedDepth
   * @instance {Object} props.collapsedDepth
   * @instance {Object} props.defaultCollapsedDepth
   * @instance {Object} props.collapsed
   * @instance {Object} props.defaultcollapsed
   * @return {Bool} collapsed
   */
  getCollapsedDepthCollapseState(nodeProps) {
    /**
     * If collapsed or defaultCollapsed is specified
     * this has no effect
     */
    if (this.props.collapsed || this.props.defaultCollapsed) {
      return nodeProps.collapsed;
    }

    if (this.props.collapsedDepth != null) {
      return this.props.collapsedDepth <= nodeProps.depth;
    }

    /**
     * Used to get from state because, it will changed
     * to null when it is uncontrolled
     */
    if (this.state.collapsedDepth != null) {
      return this.state.collapsedDepth <= nodeProps.depth;
    }

    return nodeProps.collapsed;
  }

  /**
   * Returns an array of all node paths
   * @instance this.nodePropsMap
   * @return {Array} allNodePaths
   */
  getPathsList() {
    return this.nodePropsMap && Object.keys(this.nodePropsMap);
  }

  /**
   * Returns a map of all paths with value true
   * @instance getAllPaths
   * @return {Object} allPathMapTrue
   */
  getAllPathMapTrue() {
    const pathList = this.getPathsList();
    return (
      pathList &&
      pathList.reduce((acc, path) => {
        acc[path] = true;

        return acc;
      }, {})
    );
  }

  getNodePropsByPath(path) {
    return this.nodePropsMap[path];
  }

  // state utils
  isCollapsedControlled() {
    return !!this.props.collapsed;
  }

  isCollapsedDepthControlled() {
    return !!this.props.collapsedDepth;
  }

  isSelectedControlled() {
    return !!this.props.selected;
  }

  isCheckedControlled() {
    return !!this.props.checked;
  }

  isActiveNodeControlled() {
    return this.props.activeNode != null;
  }

  isFiltered() {
    return !shallowequal(this.getAllPathMapTrue(), this.filteredNodes);
  }

  hasFilterChanged() {
    return !shallowequal(this.filteredNodes, this.previousFilteredNodes);
  }

  hasFocus() {
    return this.node === (global.document && global.document.activeElement);
  }

  focus() {
    if (this.node) {
      this.node.focus();
    } else {
      return null;
    }
  }

  // methods
  collapseAll() {
    const collapseAllState = this.getAllPathMapTrue();

    if (!this.isCollapsedControlled()) {
      this.setState({
        collapsed: collapseAllState,
        collapsedDepth: null
      });
    }

    this.props.onCollapsedChange(collapseAllState);

    if (this.props.onCollapsedDepthChange) {
      this.props.onCollapsedDepthChange(null);
    }

    return collapseAllState;
  }

  /**
   * New collapsed state should not change
   * async nodes collapsed state
   */
  expandAll() {
    const newCollapsed = {};
    const collapsed = this.getCurrentCollapsedState();
    Object.keys(this.nodePropsMap).forEach(path => {
      const nodeProps = this.nodePropsMap[path];
      if (nodeProps.async) {
        newCollapsed[nodeProps.path] = collapsed[nodeProps.path];
      }
    });

    cleanUpFalseProps(newCollapsed);

    if (!this.isCollapsedControlled()) {
      this.setState({
        collapsed: newCollapsed,
        collapsedDepth: null
      });
    }

    this.props.onCollapsedChange(newCollapsed);

    if (this.props.onCollapsedDepthChange) {
      this.props.onCollapsedDepthChange(null);
    }

    return newCollapsed;
  }

  /**
   * Collapses node at path
   * @param {String} path
   * @return {Object} collapsed new collapsed state
   */
  collapseNode(path) {
    const newCollapsed = this.onNodeCollapseChange({
      props: this.getNodePropsByPath(path),
      collapsed: true
    });

    return newCollapsed;
  }

  /**
   * Updates collapsed state
   * @param collapsed
   * @return collapsed
   */
  setCollapsed(collapsed) {
    if (!this.isCollapsedControlled()) {
      this.setState({ collapsed });
    }

    this.props.onCollapsedChange(collapsed);

    return collapsed;
  }

  /**
   * Expands node at path
   * @param {String} path
   * @return {Object} collapsed new collapsed state
   */
  expandNode(path) {
    const newCollapsed = this.onNodeCollapseChange({
      props: this.getNodePropsByPath(path),
      collapsed: false
    });

    return newCollapsed;
  }

  /**
   * checks node at path
   * @param {String} path
   * @return {Object} checked new checked state
   */
  checkNode(path) {
    const nodeProps = this.getNodePropsByPath(path);
    if (!nodeProps) {
      return null;
    }

    const newChecked = this.onCheckedChange({
      props: nodeProps,
      checked: true
    });

    return newChecked;
  }

  /**
   * unChecks node at path
   * @param {String} path
   * @return {Object} checked new checked state
   */
  uncheckNode(path) {
    const nodeProps = this.getNodePropsByPath(path);
    if (!nodeProps) {
      return null;
    }

    const newChecked = this.onCheckedChange({
      props: nodeProps,
      checked: false
    });

    return newChecked;
  }

  /**
   * checkes all nodes
   * @instance {Function} getAllPathMapTrue
   * @instance {Bool} enableChecked
   * @return {Object|null} newChecked
   */
  checkAll() {
    if (!this.props.enableChecked) {
      return null;
    }

    const newChecked = this.getAllPathMapTrue();
    if (!this.isSelectedControlled()) {
      this.setState({
        checked: newChecked
      });
    }

    return newChecked;
  }

  /**
   * checkes all nodes
   * @instance {Function} getAllPathMapTrue
   * @instance {Bool} enableChecked
   * @return {Object|null} newChecked
   */
  uncheckAll() {
    if (!this.props.enableChecked) {
      return null;
    }

    const newChecked = {};
    if (!this.isSelectedControlled()) {
      this.setState({
        checked: newChecked
      });
    }

    return newChecked;
  }

  setActiveNode(path) {
    const nodeProps = this.getNodePropsByPath(path);

    if (!nodeProps) {
      return null;
    }

    this.onActiveNodeChange(nodeProps);

    return path;
  }

  /**
   * selects node at path
   * @param {String} path
   * @return {Object} selected
   */
  selectNode(path) {
    const newSelected = this.onSelectionChange({
      props: this.getNodePropsByPath(path),
      selected: true
    });

    return newSelected;
  }

  /**
   * deselects node at path
   * @param {String} path
   * @return {Object} selected
   */
  deselectNode(path) {
    const newSelected = this.onSelectionChange({
      props: this.getNodePropsByPath(path),
      selected: false
    });

    return newSelected;
  }

  /**
   * selects all nodes
   * @instance {Function} getAllPathMapTrue
   * @instance {Bool} enableSelection
   * @return {Object|null} newSelected
   */
  selectAll() {
    if (!this.props.enableSelection) {
      return null;
    }

    const newSelected = this.getAllPathMapTrue();
    if (!this.isSelectedControlled()) {
      this.setState({
        selected: newSelected
      });
    }

    return newSelected;
  }

  /**
   * deselects all nodes
   * @instance {Function} getAllPathMapTrue
   * @instance {Bool} enableSelection
   * @return {Object|null} newSelected
   */
  deselectAll() {
    if (!this.props.enableSelection) {
      return null;
    }

    const newSelected = {};
    if (!this.isSelectedControlled()) {
      this.setState({
        selected: newSelected
      });
    }

    return newSelected;
  }

  /**
   * Updates selected state
   * it does't trigger onSelectionChange
   * as it updates all state not a single node
   * @param {Object} newSelected - new selected state
   * @return {Object} newSelected
   */
  setSelected(newSelected) {
    if (!this.isSelectedControlled() && this.props.enableSelection) {
      this.setState({
        selected: newSelected
      });
    } else {
      return null;
    }

    return newSelected;
  }

  setChecked(newChecked) {
    if (!this.isCheckedControlled() && this.props.enableChecked) {
      this.setState({
        checked: newChecked
      });
    } else {
      return null;
    }

    return newChecked;
  }

  scrollNodeIntoView(nodeBoundingRect) {
    setTimeout(() => {
      const parentRect = this.node.getBoundingClientRect();
      const scrollTop = this.node.scrollTop;
      const nodeOffsetTop = nodeBoundingRect.top - parentRect.top + scrollTop;
      const parentHeight = this.node.offsetHeight;

      // should bring into view top
      if (scrollTop > nodeOffsetTop) {
        this.node.scrollTop = nodeOffsetTop;
      }

      // at the bottom, have to scroll more
      if (scrollTop + parentHeight < nodeBoundingRect.height + nodeOffsetTop) {
        this.node.scrollTop =
          nodeOffsetTop + nodeBoundingRect.height - parentHeight;
      }
    }, 16);
  }
}

ZippyTreeView.defaultProps = {
  rootClassName: 'zippy-react-toolkit-tree-view',
  dataSource: null,
  checkBeforeIcon: true,
  checkOnClick: undefined,

  // rtl
  rtl: false,

  // style
  theme: 'default',
  style: {},

  // envents
  onDataSourceLoad: () => {},

  // path
  pathSeparator: '/',
  // if not defined it will use index
  pathProperty: null,
  idProperty: null,

  // node styles and classnames
  nodeStyle: null,

  // collapsed
  collapsed: null,
  defaultCollapsed: null,
  onNodeCollapseChange: () => {},

  expandOnToolOnly: true,
  expandOnDoubleClick: false,

  // collapse depth
  onCollapsedDepthChange: () => {},
  onCollapsedChange: () => {},

  // async nodes
  onNodeLoad: () => {},

  // animation
  transition: true,
  transitionDuration: 300,

  // selection
  enableSelection: false,
  defaultSelected: {},
  onSelectionChange: () => {},
  singleSelect: false,

  // check
  enableChecked: undefined,
  defaultChecked: undefined,
  checkOnSelect: false,
  onCheckedChange: () => {},
  checkNodesRecursive: true,

  // disabled
  disabled: {},

  // active - keyboard navigation
  activeNode: null,
  defaultActiveNode: null,
  // if enableKeyboardNavigation is not true,
  // there cannot be an active item
  enableKeyboardNavigation: true,
  onActiveNodeChange: () => {},

  nestingIndentation: 20,
  enableHoverStyle: true,
  enableScrollNodeIntoView: true,
  expandToolSize: 20
};

ZippyTreeView.propTypes = {
  rootClassName: PropTypes.string,
  dataSource: (props, propName) => {
    const dataSource = props[propName];

    if (dataSource === undefined) {
      return new Error('dataSource prop is required.');
    }

    if (
      dataSource !== null &&
      typeof dataSource !== 'function' &&
      !Array.isArray(dataSource) &&
      !(dataSource && dataSource.then)
    ) {
      return new Error(
        'dataSource must be an array, null, a promise or a function returning a promise.'
      );
    }
  },
  loading: PropTypes.bool,
  checkBeforeIcon: PropTypes.bool,
  renderInput: PropTypes.any,

  // rtl
  rtl: PropTypes.bool,

  // events
  onDataSourceLoad: PropTypes.func,

  // style
  className: PropTypes.string,
  theme: PropTypes.string,
  style: PropTypes.object,

  // path
  pathSeparator: PropTypes.string,
  pathProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  idProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  //context menu
  renderNodeContextMenu: PropTypes.func,

  // custom renderres
  renderLabel: PropTypes.func,
  renderNode: PropTypes.func,
  renderContent: PropTypes.func,
  renderIcon: PropTypes.func,
  renderNodeText: PropTypes.func,

  // icons
  nodeIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  nodeCollapsedIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  leafNodeIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  // filter
  filter: PropTypes.func,

  // node styles and classnames
  nodeStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

  nodeClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  labelClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  contentClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  // collapsed
  collapsed: PropTypes.object,
  defaultCollapsed: PropTypes.object,
  onNodeCollapseChange: PropTypes.func,
  isNodeCollapsed: PropTypes.func,

  expandOnToolOnly: PropTypes.bool,
  expandOnDoubleClick: PropTypes.bool,

  // collapsedDepth
  collapsedDepth: PropTypes.number,
  defaultCollapsedDepth: PropTypes.number,
  onCollapsedDepthChange: PropTypes.func,
  onCollapsedChange: PropTypes.func,

  // selection
  enableSelection: PropTypes.bool,
  defaultSelected: PropTypes.object,
  onSelectionChange: PropTypes.func,
  isNodeSelected: PropTypes.func,
  singleSelect: PropTypes.bool,

  // check
  enableChecked: PropTypes.bool,
  checked: PropTypes.object,
  renderCheck: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  checkOnSelect: PropTypes.bool,
  onCheckedChange: PropTypes.func,
  checkNodesRecursive: PropTypes.bool,
  isNodeChecked: PropTypes.func,
  checkOnClick: PropTypes.bool,

  // active + navigation
  activeNode: PropTypes.string,
  defaultActiveNode: PropTypes.string,
  enableKeyboardNavigation: PropTypes.bool,
  onActiveNodeChange: PropTypes.func,

  // disabled
  disabled: PropTypes.object,
  isNodeDisabled: PropTypes.func,

  // animation
  transition: PropTypes.bool,
  transitionDuration: PropTypes.number,

  expandTool: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),

  // async nodes
  loadNode: PropTypes.func,
  loadNodeOnce: PropTypes.func,
  onNodeLoad: PropTypes.func,
  loadTool: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isNodeAsync: PropTypes.func,

  // treelines
  treeLines: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  nestingIndentation: PropTypes.number,
  renderLoader: PropTypes.func,

  enableHoverStyle: PropTypes.bool,
  enableScrollNodeIntoView: PropTypes.bool,
  expandToolSize: PropTypes.number
};

export default ZippyTreeView;
