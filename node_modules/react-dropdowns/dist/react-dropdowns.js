(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react-addons-clicked-away-mixin"), require("react"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define(["react-addons-clicked-away-mixin", "react", "classnames"], factory);
	else if(typeof exports === 'object')
		exports["ReactDropdowns"] = factory(require("react-addons-clicked-away-mixin"), require("react"), require("classnames"));
	else
		root["ReactDropdowns"] = factory(root["ClickedAwayMixin"], root["React"], root["classNames"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _reactAddonsClickedAwayMixin = __webpack_require__(1);

	var _reactAddonsClickedAwayMixin2 = _interopRequireDefault(_reactAddonsClickedAwayMixin);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _DropdownItem = __webpack_require__(4);

	var _DropdownItem2 = _interopRequireDefault(_DropdownItem);

	var _DropdownMenu = __webpack_require__(5);

	var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
	                                                                                                                                                                                                                              * @todo: implement BS3 ".dropdown-backdrop" functionality:
	                                                                                                                                                                                                                              *
	                                                                                                                                                                                                                              * "On mobile devices, opening a dropdown adds a .dropdown-backdrop as a tap
	                                                                                                                                                                                                                              * area for closing dropdown menus when tapping outside the menu, a
	                                                                                                                                                                                                                              * requirement for proper iOS support. This means that switching from an
	                                                                                                                                                                                                                              * open dropdown menu to a different dropdown menu requires an extra tap on
	                                                                                                                                                                                                                              * mobile."
	                                                                                                                                                                                                                              *
	                                                                                                                                                                                                                              */


	var Dropdown = _react2.default.createClass({
	  displayName: 'Dropdown',


	  statics: { Item: _DropdownItem2.default, version: '0.2.0' },

	  propTypes: {
	    /**
	     * Specify what component should this <Dropdown> render as. This can be a
	     * valid React Component class or a string (eg. "div", "li", "span", etc.)
	     *
	     * defaults to "div"
	     */
	    Component: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.func, _react2.default.PropTypes.string]),

	    /**
	     * Align the menu to the "left" or "right" side.
	     *
	     * defaults to "left"
	     */
	    align: _react2.default.PropTypes.oneOf(['left', 'right']),

	    /**
	     * children should be <DropdownItem>'s
	     */
	    children: _react2.default.PropTypes.node,

	    /**
	     * "className" of the root component.
	     */
	    className: _react2.default.PropTypes.string,

	    /**
	     *
	     */
	    menuProps: _react2.default.PropTypes.object,

	    /**
	     * Function to call when menu is closed.
	     */
	    onClose: _react2.default.PropTypes.func,

	    /**
	     * Function to call when menu is opened.
	     */
	    onOpen: _react2.default.PropTypes.func,

	    /**
	     * The React Element that will act as the "toggle" for the dropdown
	     * component. An example would be a simple <button> component with the
	     * "trigger" prop set to "click".
	     */
	    toggle: _react2.default.PropTypes.element.isRequired,

	    /**
	     * Specify on how to trigger the dropdown menu.
	     *
	     * defaults to: "click"
	     */
	    trigger: _react2.default.PropTypes.oneOf(['click', 'focus'])
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      Component: 'div',
	      align: 'left',
	      trigger: 'click'
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      open: false
	    };
	  },


	  mixins: [_reactAddonsClickedAwayMixin2.default],

	  render: function render() {
	    var _props = this.props;
	    var Component = _props.Component;
	    var align = _props.align;
	    var children = _props.children;
	    var className = _props.className;
	    var _props$menuProps = _props.menuProps;
	    var menuProps = _props$menuProps === undefined ? {} : _props$menuProps;
	    var onClose = _props.onClose;
	    var onOpen = _props.onOpen;
	    var toggle = _props.toggle;
	    var trigger = _props.trigger;

	    var others = _objectWithoutProperties(_props, ['Component', 'align', 'children', 'className', 'menuProps', 'onClose', 'onOpen', 'toggle', 'trigger']);

	    var classes = (0, _classnames2.default)(className, {
	      "Dropdown": true,
	      "open": this.state.open
	    });

	    return _react2.default.createElement(
	      Component,
	      _extends({}, others, { className: classes }),
	      this.renderToggle(),
	      _react2.default.createElement(_DropdownMenu2.default, _extends({
	        ref: 'menu'
	      }, menuProps, {
	        align: align,
	        children: children,
	        onItemSelected: this._onItemSelected,
	        open: this.state.open,
	        onRequestClose: this.close
	      }))
	    );
	  },


	  /**
	   * Renders the "toggle" component. We clone the existing element as we need
	   * to hook into the "onClick" or "onBlur"/"onFocus" events.
	   *
	   * @return {ReactElement}
	   */
	  renderToggle: function renderToggle() {
	    var _props2 = this.props;
	    var toggle = _props2.toggle;
	    var trigger = _props2.trigger;

	    var toggleProps = {
	      "aria-expanded": this.state.open ? 'true' : 'false',
	      "aria-haspopup": 'true',
	      "className": (0, _classnames2.default)(toggle.props.className, 'Dropdown-toggle')
	    };

	    if (trigger == 'click') {
	      toggleProps.role = 'button';
	      toggleProps.onClick = this._onClick;
	    } else {
	      // bind onFocus/onBlur events
	      toggleProps.onBlur = this._onBlur;
	      toggleProps.onFocus = this._onFocus;
	    }

	    return _react2.default.cloneElement(toggle, toggleProps);
	  },


	  /**
	   * Close the menu if it is currently open, invoking "callback" after the menu
	   * has been closed.
	   *
	   * @param {function} callback
	   */
	  close: function close(callback) {
	    var _this = this;

	    if (this.state.open) {
	      (function () {
	        var onClose = _this.props.onClose;


	        _this.setState({ open: false }, function () {
	          if (onClose) onClose();
	          if (callback) callback();
	        });
	      })();
	    }
	  },


	  /**
	   * Focus the <DropdownMenu> if it has been mounted.
	   */
	  focus: function focus() {
	    if (this.refs.menu) {
	      this.refs.menu.focus();
	    }
	  },


	  /**
	   * Triggered when a user clicked away from the the dropdown component.
	   */
	  onClickedAway: function onClickedAway() {
	    this.close(null);
	  },


	  /**
	   * Open the menu if it is not currently open, invoking "callback" after the
	   * menu has been openned.
	   *
	   * @param {function} callback
	   */
	  open: function open(callback) {
	    var _this2 = this;

	    if (!this.state.open) {
	      (function () {
	        var self = _this2;

	        _this2.setState({ open: true }, function () {
	          if (callback) callback();
	          if (self.props.onOpen) self.props.onOpen();
	          self.focus();
	        });
	      })();
	    }
	  },
	  _onBlur: function _onBlur(e) {
	    if (this.props.toggle.props.onBlur) {
	      this.props.toggle.props.onBlur(e);
	    }
	    this.close();
	  },


	  /**
	   * Toggles between showing/hiding the <DropdownMenu> component.
	   *
	   * @param {SyntheticEvent} e
	   * @private
	   */
	  _onClick: function _onClick(e) {
	    if (this.props.toggle.props.onClick) {
	      this.props.toggle.props.onClick(e);
	    }
	    this.state.open ? this.close() : this.open();
	  },
	  _onFocus: function _onFocus(e) {
	    if (this.props.toggle.props.onFocus) {
	      this.props.toggle.props.onFocus(e);
	    }
	    this.open();
	  },


	  /**
	   * Triggered when a <DropdownItem> component was selected. If the menu is
	   * shown, it will be closed and the "callback" function will be invoked after
	   * the menu is closed. Otherwise the callback is invoked immediately.
	   *
	   * @param {function} callback
	   * @private
	   */
	  _onItemSelected: function _onItemSelected(callback) {
	    if (this.state.open) {
	      this.close(callback);
	    } else if (callback) {
	      callback();
	    }
	  }
	});

	exports.default = Dropdown;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _DropdownMenu = __webpack_require__(5);

	var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var DropdownItem = _react2.default.createClass({
	  displayName: 'DropdownItem',


	  propTypes: {
	    /**
	     * Set by parent <Dropdown> menu
	     */
	    active: _react2.default.PropTypes.bool,

	    /**
	     *
	     */
	    className: _react2.default.PropTypes.string,

	    /**
	     *
	     */
	    children: _react2.default.PropTypes.node,

	    divider: function divider(props, propName, componentName) {
	      if (typeof props.divider !== 'boolean') {
	        return new Error('"divider" must be a boolean');
	      }
	      if (props.divider) {
	        if (props.children) {
	          return new Error('Children will not be rendered for dividers');
	        }
	        if (props.label) {
	          return new Error('"label" will not be rendered for dividers');
	        }
	      }
	    },

	    /**
	     *
	     */
	    header: _react2.default.PropTypes.bool,

	    /**
	     *
	     */
	    label: _react2.default.PropTypes.node,

	    onClick: _react2.default.PropTypes.func,

	    /**
	     *
	     */
	    onItemSelected: _react2.default.PropTypes.func,

	    /**
	     *
	     */
	    onRequestClose: _react2.default.PropTypes.func,

	    // <a> specific props
	    // ------------------

	    href: function href(props) {
	      if (props.children && props.href) {
	        return new Error('Children will not be rendered if "href" is set.');
	      }
	    },

	    /**
	     *
	     */
	    target: _react2.default.PropTypes.string,

	    /**
	     *
	     */
	    title: _react2.default.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      active: false,
	      divider: false,
	      header: false
	    };
	  },
	  render: function render() {
	    var _props = this.props;
	    var active = _props.active;
	    var children = _props.children;
	    var className = _props.className;
	    var divider = _props.divider;
	    var header = _props.header;
	    var href = _props.href;
	    var label = _props.label;
	    var onClick = _props.onClick;
	    var onItemSelected = _props.onItemSelected;
	    var onRequestClose = _props.onRequestClose;
	    var target = _props.target;
	    var title = _props.title;

	    var other = _objectWithoutProperties(_props, ['active', 'children', 'className', 'divider', 'header', 'href', 'label', 'onClick', 'onItemSelected', 'onRequestClose', 'target', 'title']);

	    var classes = (0, _classnames2.default)(className, {
	      "active": active,
	      "divider": divider,
	      "Dropdown-header": header,
	      "Dropdown-submenu": !header && !!children
	    });
	    var role = divider ? 'separator' : other.role;

	    if (divider) {
	      return _react2.default.createElement('li', _extends({}, other, { className: classes, role: role }));
	    }

	    if (header) {
	      return _react2.default.createElement(
	        'li',
	        _extends({}, other, {
	          className: classes,
	          role: role
	        }),
	        label
	      );
	    }

	    var menu = undefined;
	    if (children) {
	      menu = _react2.default.createElement(
	        _DropdownMenu2.default,
	        {
	          ref: 'menu',
	          onItemSelected: onItemSelected,
	          onRequestClose: onRequestClose,
	          open: active
	        },
	        children
	      );
	    }

	    return _react2.default.createElement(
	      'li',
	      _extends({}, other, {
	        className: classes,
	        onClick: this._onClick,
	        role: role
	      }),
	      _react2.default.createElement(
	        'a',
	        {
	          href: href,
	          onClick: this._onAnchorClick,
	          role: href == null ? 'button' : undefined,
	          target: target,
	          title: title
	        },
	        label
	      ),
	      menu
	    );
	  },


	  /**
	   * If this component has "menu" ref, focus it's menu.
	   */
	  focus: function focus() {
	    if (this.refs.menu) {
	      this.refs.menu.focus();
	    }
	  },
	  hasSubMenu: function hasSubMenu() {
	    return !!this.props.children;
	  },
	  isOpen: function isOpen() {
	    return !!this.refs.menu;
	  },
	  _onAnchorClick: function _onAnchorClick(e) {
	    if (this.props.href == null) {
	      e.preventDefault();
	    }
	  },
	  _onClick: function _onClick(e) {
	    var _props2 = this.props;
	    var onClick = _props2.onClick;
	    var onRequestClose = _props2.onRequestClose;


	    if (onClick) {
	      onClick(e);
	    }

	    onRequestClose();
	  }
	});

	exports.default = DropdownItem;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var DropdownMenu = _react2.default.createClass({
	  displayName: 'DropdownMenu',


	  propTypes: {
	    align: _react2.default.PropTypes.oneOf(['left', 'right']),

	    /**
	     * The <DropdownItem>'s elements to populate <DropdownMenu> with.
	     */
	    children: _react2.default.PropTypes.node,

	    /**
	     * Fires when an item "onClick" prop has been triggered.
	     */
	    onItemSelected: _react2.default.PropTypes.func.isRequired,

	    /**
	     * Fires when this component is requesting to be closed.
	     */
	    onRequestClose: _react2.default.PropTypes.func.isRequired,

	    /**
	     * Open the menu?
	     *
	     * defaults to `false`
	     */
	    open: _react2.default.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      align: 'left',
	      open: false
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      activeIndex: null
	    };
	  },
	  render: function render() {
	    var _props = this.props;
	    var align = _props.align;
	    var children = _props.children;
	    var className = _props.className;
	    var onRequestClose = _props.onRequestClose;

	    var others = _objectWithoutProperties(_props, ['align', 'children', 'className', 'onRequestClose']);

	    var classes = (0, _classnames2.default)(className, {
	      "Dropdown-menu": true,
	      "Dropdown-menu-left": align === 'left',
	      "Dropdown-menu-right": align === 'right'
	    });
	    var items = this.renderItems(children);

	    if (items.length) {
	      // Set a 'tabindex="-1"' so that this menu can be '.focus()'.
	      //
	      // see: http://javascript.info/tutorial/focus-blur
	      return _react2.default.createElement(
	        'ul',
	        _extends({}, others, {
	          ref: 'menu',
	          className: classes,
	          onClick: this._onClick,
	          onKeyDown: this._onKeyDown,
	          role: 'menu',
	          tabIndex: '0'
	        }),
	        items
	      );
	    } else {
	      return null;
	    }
	  },
	  renderItems: function renderItems(children) {
	    var _this = this;

	    this._children = [];

	    // Return early if this menu is not open.
	    if (!this.props.open) return this._children;

	    _react2.default.Children.forEach(children, function (child, index) {
	      // ignore 'null' or 'undefined' children
	      if (!child) return;

	      // Validate child and show warning if this child is not the component
	      // we expect.
	      if (!(child.type && child.type.displayName === 'DropdownItem')) {
	        // Only supports console functions when developer tools are open,
	        // otherwise the console object is undefined and any calls will
	        // throw errors.
	        if (console) {
	          console.warn('DropdownMenu only accepts DropdownItem elements as\n          children. Found ' + (child.type.displayName || child.type) + ' as child\n          member ' + index + ' of children.');
	        }
	      }

	      // we need to listen to specific events for this child element. if user
	      // has provided props for these events, we pass in a "chain" function
	      // which essentially proxies the event.
	      var _child$props = child.props;
	      var onMouseEnter = _child$props.onMouseEnter;
	      var onMouseLeave = _child$props.onMouseLeave;

	      var props = _objectWithoutProperties(_child$props, ['onMouseEnter', 'onMouseLeave']);

	      props.key = index;
	      props.ref = index;
	      props.active = _this.state.activeIndex == index;
	      props.onItemSelected = _this._onItemSelected;
	      props.onMouseEnter = _this._onItemMouseEnter.bind(_this, index, onMouseEnter);
	      props.onMouseLeave = _this._onItemMouseLeave.bind(_this, index, onMouseLeave);
	      props.onRequestClose = _this.close;

	      _this._children.push(_react2.default.cloneElement(child, props));
	    });

	    return this._children;
	  },


	  /**
	   * Close the menu
	   *
	   * @param callback
	   */
	  close: function close(callback) {
	    var _this2 = this;

	    if (this.props.open) {
	      (function () {
	        var onRequestClose = _this2.props.onRequestClose;

	        _this2.setState({ activeIndex: null }, function () {
	          onRequestClose();
	          if (callback) callback();
	        });
	      })();
	    }
	  },


	  /**
	   * Focus menu if it is open.
	   */
	  focus: function focus() {
	    if (this.refs.menu) {
	      this.refs.menu.focus();
	    }
	  },


	  /**
	   * Return the ref. to the active child. If none is active, returns `undefined`.
	   *
	   * @return {*}
	   */
	  getActive: function getActive() {
	    return this.refs[this.state.activeIndex];
	  },


	  /**
	   *
	   * @return {*}
	   */
	  isOpen: function isOpen() {
	    return this.props.open;
	  },


	  /**
	   * Capture children "onClick' event and prevent propagation.
	   *
	   * @param e
	   * @private
	   */
	  _onClick: function _onClick(e) {
	    e.stopPropagation();

	    if (this.props.onClick) {
	      this.props.onClick(e);
	    }
	  },


	  /**
	   * When user enters the <DropdownItem> component, we need to set it's "index"
	   * to be the current "activeIndex" value.
	   *
	   * @param {number} index
	   * @param {function} handler
	   * @param {object} e
	   * @private
	   */
	  _onItemMouseEnter: function _onItemMouseEnter(index, handler, e) {
	    this.setState({ activeIndex: index }, function () {
	      return handler && handler(e);
	    });
	  },


	  /**
	   * When user leaves the <DropdownItem> component, we need to unset
	   * "activeIndex" value *IF* the "activeIndex" matches "index".
	   *
	   * @param {number} index
	   * @param {function} handler
	   * @param {object} e
	   * @private
	   */
	  _onItemMouseLeave: function _onItemMouseLeave(index, handler, e) {
	    if (index === this.state.activeIndex) {
	      this.setState({ activeIndex: null }, function () {
	        return handler && handler(e);
	      });
	    } else if (typeof handler === 'function') {
	      handler(e);
	    }
	  },
	  _onKeyDown: function _onKeyDown(e) {
	    if (!this.props.open) return;

	    switch (e.which) {
	      // down arrow
	      case 40:
	        e.preventDefault();
	        e.stopPropagation();
	        this._setPreviousActiveIndex();
	        break;

	      // up arrow
	      case 38:
	        e.preventDefault();
	        e.stopPropagation();
	        this._setNextActiveIndex();
	        break;

	      // Esc
	      case 27:
	        e.preventDefault();
	        e.stopPropagation();
	        this.close();
	        break;

	      // Enter
	      case 13:
	        e.preventDefault();
	        e.stopPropagation();
	        var activeChild = this.refs[this.state.activeIndex];

	        if (activeChild) {
	          // this._onItemSelected(null);
	        }
	        break;

	      // tab
	      case 9:
	        e.preventDefault();
	        e.stopPropagation();

	        if (e.shiftKey) {
	          this._setPreviousActiveIndex();
	        } else {
	          this._setNextActiveIndex();
	        }
	        break;
	    }
	  },


	  /**
	   * Set next active index, ignoring "disabled", "divider" and "header" items.
	   *
	   * @private
	   */
	  _setNextActiveIndex: function _setNextActiveIndex() {
	    var activeIndex = this.state.activeIndex;
	    var children = this._children;

	    var child = undefined;
	    var index = activeIndex == null ? children.length - 1 : 0;
	    var i = activeIndex == null ? index : activeIndex - 1;

	    for (; i >= 0; i--) {
	      child = children[i];

	      var childIsDisabled = child.props.disabled;
	      var childIsADivider = child.props.divider;
	      var childIsAHeader = child.props.header;

	      if (!childIsDisabled && !childIsADivider && !childIsAHeader) {
	        index = i;
	        break;
	      }
	    }

	    if (index != activeIndex) this.setState({ activeIndex: index });
	  },


	  /**
	   * Set prev. active index, ignoring "disabled", "divider" and "header" items.
	   *
	   * @private
	   */
	  _setPreviousActiveIndex: function _setPreviousActiveIndex() {
	    var activeIndex = this.state.activeIndex;
	    var children = this._children;

	    var child = undefined,
	        index = undefined;
	    var len = children.length;
	    var i = activeIndex != null ? activeIndex + 1 : 0;

	    for (; i < len; i++) {
	      child = children[i];

	      var childIsDisabled = child.props.disabled;
	      var childIsADivider = child.props.divider;
	      var childIsAHeader = child.props.header;

	      if (!childIsDisabled && !childIsADivider && !childIsAHeader) {
	        index = i;
	        break;
	      }
	    }

	    if (index == null) index = len - 1;
	    if (index != activeIndex) this.setState({ activeIndex: index });
	  },


	  /**
	   * @param {function} handler
	   * @private
	   */
	  _onItemSelected: function _onItemSelected(handler) {
	    this.props.onItemSelected(handler);
	  }
	});

	exports.default = DropdownMenu;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;