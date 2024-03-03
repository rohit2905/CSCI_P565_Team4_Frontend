import React from 'react';
import classNames from 'classnames';

import DropdownMenu from './DropdownMenu';

const DropdownItem = React.createClass({

  propTypes: {
    /**
     * Set by parent <Dropdown> menu
     */
    active: React.PropTypes.bool,

    /**
     *
     */
    className: React.PropTypes.string,

    /**
     *
     */
    children: React.PropTypes.node,

    divider: (props, propName, componentName) => {
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
    header: React.PropTypes.bool,

    /**
     *
     */
    label: React.PropTypes.node,

    onClick: React.PropTypes.func,

    /**
     *
     */
    onItemSelected: React.PropTypes.func,

    /**
     *
     */
    onRequestClose: React.PropTypes.func,

    // <a> specific props
    // ------------------

    href: (props) => {
      if (props.children && props.href) {
        return new Error('Children will not be rendered if "href" is set.')
      }
    },

    /**
     *
     */
    target: React.PropTypes.string,

    /**
     *
     */
    title: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      active: false,
      divider: false,
      header: false
    };
  },

  render() {
    const {
      active,
      children,
      className,
      divider,
      header,
      href,
      label,
      onClick,
      onItemSelected,
      onRequestClose,
      target,
      title,
      ...other
    } = this.props;
    const classes = classNames(className, {
      "active": active,
      "divider": divider,
      "Dropdown-header": header,
      "Dropdown-submenu": !header && !!children
    });
    const role = divider ? 'separator' : other.role;

    if (divider) {
      return (
        <li {...other} className={classes} role={role} />
      );
    }

    if (header) {
      return (
        <li
          {...other}
          className={classes}
          role={role}
        >
          {label}
        </li>
      );
    }

    let menu;
    if (children) {
      menu = (
        <DropdownMenu
          ref="menu"
          onItemSelected={onItemSelected}
          onRequestClose={onRequestClose}
          open={active}
        >
          {children}
        </DropdownMenu>
      );
    }

    return (
      <li
        {...other}
        className={classes}
        onClick={this._onClick}
        role={role}
      >
        <a
          href={href}
          onClick={this._onAnchorClick}
          role={href == null ? 'button' : undefined}
          target={target}
          title={title}
        >
          {label}
        </a>
        {menu}
      </li>
    );
  },

  /**
   * If this component has "menu" ref, focus it's menu.
   */
  focus() {
    if (this.refs.menu) {
      this.refs.menu.focus();
    }
  },

  hasSubMenu() {
    return !!this.props.children;
  },

  isOpen() {
    return !!this.refs.menu;
  },

  _onAnchorClick(e) {
    if (this.props.href == null) {
      e.preventDefault();
    }
  },

  _onClick(e) {
    const { onClick, onRequestClose } = this.props;

    if (onClick) {
      onClick(e);
    }

    onRequestClose();
  }

});

export default DropdownItem;