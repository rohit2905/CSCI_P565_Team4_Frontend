import React from 'react';
import classNames from 'classnames';

const DropdownMenu = React.createClass({

  propTypes: {
    align: React.PropTypes.oneOf(['left', 'right']),

    /**
     * The <DropdownItem>'s elements to populate <DropdownMenu> with.
     */
    children: React.PropTypes.node,

    /**
     * Fires when an item "onClick" prop has been triggered.
     */
    onItemSelected: React.PropTypes.func.isRequired,

    /**
     * Fires when this component is requesting to be closed.
     */
    onRequestClose: React.PropTypes.func.isRequired,

    /**
     * Open the menu?
     *
     * defaults to `false`
     */
    open: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      align: 'left',
      open: false
    };
  },

  getInitialState() {
    return {
      activeIndex: null
    };
  },

  render() {
    const {
      align,
      children,
      className,
      onRequestClose,
      ...others
    } = this.props;
    const classes = classNames(className, {
      "Dropdown-menu": true,
      "Dropdown-menu-left": align === 'left',
      "Dropdown-menu-right": align === 'right'
    });
    const items = this.renderItems(children);

    if (items.length) {
      // Set a 'tabindex="-1"' so that this menu can be '.focus()'.
      //
      // see: http://javascript.info/tutorial/focus-blur
      return (
        <ul
          {...others}
          ref="menu"
          className={classes}
          onClick={this._onClick}
          onKeyDown={this._onKeyDown}
          role="menu"
          tabIndex="0"
        >
          {items}
        </ul>
      );
    } else {
      return null;
    }
  },

  renderItems(children) {
    this._children = [];

    // Return early if this menu is not open.
    if (!this.props.open) return this._children;

    React.Children.forEach(children, (child, index) => {
      // ignore 'null' or 'undefined' children
      if (!child) return;

      // Validate child and show warning if this child is not the component
      // we expect.
      if (!(child.type && child.type.displayName === 'DropdownItem')) {
        // Only supports console functions when developer tools are open,
        // otherwise the console object is undefined and any calls will
        // throw errors.
        if (console) {
          console.warn(`DropdownMenu only accepts DropdownItem elements as
          children. Found ${child.type.displayName || child.type} as child
          member ${index} of children.`);
        }
      }

      // we need to listen to specific events for this child element. if user
      // has provided props for these events, we pass in a "chain" function
      // which essentially proxies the event.
      const {
        onMouseEnter,
        onMouseLeave,
        ...props
      } = child.props;

      props.key = index;
      props.ref = index;
      props.active = this.state.activeIndex == index;
      props.onItemSelected = this._onItemSelected;
      props.onMouseEnter = this._onItemMouseEnter.bind(this, index, onMouseEnter);
      props.onMouseLeave = this._onItemMouseLeave.bind(this, index, onMouseLeave);
      props.onRequestClose = this.close;

      this._children.push(
        React.cloneElement(child, props)
      );
    });

    return this._children;
  },

  /**
   * Close the menu
   *
   * @param callback
   */
  close(callback) {
    if (this.props.open) {
      const onRequestClose = this.props.onRequestClose;

      this.setState({activeIndex: null}, () => {
        onRequestClose();
        if (callback) callback();
      });
    }
  },

  /**
   * Focus menu if it is open.
   */
  focus() {
    if (this.refs.menu) {
      this.refs.menu.focus();
    }
  },

  /**
   * Return the ref. to the active child. If none is active, returns `undefined`.
   *
   * @return {*}
   */
  getActive() {
    return this.refs[this.state.activeIndex];
  },

  /**
   *
   * @return {*}
   */
  isOpen() {
    return this.props.open;
  },

  /**
   * Capture children "onClick' event and prevent propagation.
   *
   * @param e
   * @private
   */
  _onClick(e) {
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
  _onItemMouseEnter(index, handler, e) {
    this.setState({activeIndex: index}, () => handler && handler(e));
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
  _onItemMouseLeave(index, handler, e) {
    if (index === this.state.activeIndex) {
      this.setState({activeIndex: null}, () => handler && handler(e));
    } else if (typeof handler === 'function') {
      handler(e);
    }
  },

  _onKeyDown(e) {
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
        const activeChild = this.refs[this.state.activeIndex];

        if (activeChild ) {
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
  _setNextActiveIndex() {
    const activeIndex = this.state.activeIndex;
    const children = this._children;

    let child;
    let index = activeIndex == null ? children.length-1 : 0;
    let i = activeIndex == null ? index : activeIndex-1;

    for (; i >= 0; i--) {
      child = children[i];

      let childIsDisabled = child.props.disabled;
      let childIsADivider = child.props.divider;
      let childIsAHeader = child.props.header;

      if (!childIsDisabled && !childIsADivider && !childIsAHeader) {
        index = i;
        break;
      }
    }

    if (index != activeIndex) this.setState({activeIndex: index});
  },

  /**
   * Set prev. active index, ignoring "disabled", "divider" and "header" items.
   *
   * @private
   */
  _setPreviousActiveIndex() {
    const activeIndex = this.state.activeIndex;
    const children = this._children;

    let child, index;
    let len = children.length;
    let i = activeIndex != null ? (activeIndex+1) : 0;

    for (; i < len; i++) {
      child = children[i];

      let childIsDisabled = child.props.disabled;
      let childIsADivider = child.props.divider;
      let childIsAHeader = child.props.header;

      if (!childIsDisabled && !childIsADivider && !childIsAHeader) {
        index = i;
        break;
      }
    }

    if (index == null) index = len-1;
    if (index != activeIndex) this.setState({activeIndex: index});
  },
  
  /**
   * @param {function} handler
   * @private
   */
  _onItemSelected(handler) {
    this.props.onItemSelected(handler);
  }

});

export default DropdownMenu;