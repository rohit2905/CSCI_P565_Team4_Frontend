/**
 * @todo: implement BS3 ".dropdown-backdrop" functionality:
 *
 * "On mobile devices, opening a dropdown adds a .dropdown-backdrop as a tap
 * area for closing dropdown menus when tapping outside the menu, a
 * requirement for proper iOS support. This means that switching from an
 * open dropdown menu to a different dropdown menu requires an extra tap on
 * mobile."
 *
 */
import ClickedAwayMixin from 'react-addons-clicked-away-mixin';
import React from 'react';
import classNames from 'classnames';

import DropdownItem from './DropdownItem';
import DropdownMenu from './DropdownMenu';

const Dropdown = React.createClass({

  statics: { Item: DropdownItem, version: '0.2.0' },

  propTypes: {
    /**
     * Specify what component should this <Dropdown> render as. This can be a
     * valid React Component class or a string (eg. "div", "li", "span", etc.)
     *
     * defaults to "div"
     */
    Component: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.string
    ]),

    /**
     * Align the menu to the "left" or "right" side.
     *
     * defaults to "left"
     */
    align: React.PropTypes.oneOf(['left', 'right']),

    /**
     * children should be <DropdownItem>'s
     */
    children: React.PropTypes.node,

    /**
     * "className" of the root component.
     */
    className: React.PropTypes.string,

    /**
     *
     */
    menuProps: React.PropTypes.object,

    /**
     * Function to call when menu is closed.
     */
    onClose: React.PropTypes.func,

    /**
     * Function to call when menu is opened.
     */
    onOpen: React.PropTypes.func,

    /**
     * The React Element that will act as the "toggle" for the dropdown
     * component. An example would be a simple <button> component with the
     * "trigger" prop set to "click".
     */
    toggle: React.PropTypes.element.isRequired,

    /**
     * Specify on how to trigger the dropdown menu.
     *
     * defaults to: "click"
     */
    trigger: React.PropTypes.oneOf(['click', 'focus'])
  },

  getDefaultProps() {
    return {
      Component: 'div',
      align: 'left',
      trigger: 'click'
    };
  },

  getInitialState() {
    return {
      open: false
    };
  },

  mixins: [
    ClickedAwayMixin
  ],

  render() {
    const {
      Component,
      align,
      children,
      className,
      menuProps={},
      onClose,
      onOpen,
      toggle,
      trigger,
      ...others
    } = this.props;
    const classes = classNames(className, {
      "Dropdown": true,
      "open": this.state.open
    });

    return (
      <Component {...others} className={classes}>
        {this.renderToggle()}
        <DropdownMenu
          ref="menu"
          {...menuProps}
          align={align}
          children={children}
          onItemSelected={this._onItemSelected}
          open={this.state.open}
          onRequestClose={this.close}
        />
      </Component>
    );
  },

  /**
   * Renders the "toggle" component. We clone the existing element as we need
   * to hook into the "onClick" or "onBlur"/"onFocus" events.
   *
   * @return {ReactElement}
   */
  renderToggle() {
    const { toggle, trigger } = this.props;
    const toggleProps = {
      "aria-expanded": this.state.open ? 'true' : 'false',
      "aria-haspopup": 'true',
      "className": classNames(toggle.props.className, 'Dropdown-toggle')
    };

    if (trigger == 'click') {
      toggleProps.role = 'button';
      toggleProps.onClick = this._onClick;
    } else {
      // bind onFocus/onBlur events
      toggleProps.onBlur = this._onBlur;
      toggleProps.onFocus = this._onFocus;
    }

    return React.cloneElement(toggle, toggleProps);
  },

  /**
   * Close the menu if it is currently open, invoking "callback" after the menu
   * has been closed.
   *
   * @param {function} callback
   */
  close(callback) {
    if (this.state.open) {
      const { onClose } = this.props;

      this.setState({open: false}, () => {
        if (onClose) onClose();
        if (callback) callback();
      });
    }
  },

  /**
   * Focus the <DropdownMenu> if it has been mounted.
   */
  focus() {
    if (this.refs.menu) {
      this.refs.menu.focus();
    }
  },

  /**
   * Triggered when a user clicked away from the the dropdown component.
   */
  onClickedAway() {
    this.close(null);
  },

  /**
   * Open the menu if it is not currently open, invoking "callback" after the
   * menu has been openned.
   *
   * @param {function} callback
   */
  open(callback) {
    if (!this.state.open) {
      const self = this;

      this.setState({open: true}, () => {
        if (callback) callback();
        if (self.props.onOpen) self.props.onOpen();
        self.focus();
      });
    }
  },

  _onBlur(e) {
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
  _onClick(e) {
    if (this.props.toggle.props.onClick) {
      this.props.toggle.props.onClick(e);
    }
    this.state.open ? this.close() : this.open();
  },

  _onFocus(e) {
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
  _onItemSelected(callback) {
    if (this.state.open) {
      this.close(callback);
    } else if (callback) {
      callback();
    }
  }

});

export default Dropdown;