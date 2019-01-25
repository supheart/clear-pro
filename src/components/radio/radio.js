import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getRenderProps } from '../../utils/dom';
import './index.scss';

const CLS_PREFIX = 'mfb-radio';

export default class Radio extends Component {
  static propTypes = {
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.any
  };
  static defaultProps = {
    disabled: false,
    defaultChecked: false
  };
  static contextTypes = {
    radioGroup: PropTypes.any
  }
  static getDerivedStateFromProps(nextProps) {
    if ('checked' in nextProps) {
      return {
        checked: nextProps.checked,
      };
    }
    return null;
  }
  state = {
    clsPrefix: this.props.clsPrefix || CLS_PREFIX,
    checked: typeof this.props.checked === 'undefined' ? this.props.defaultChecked : this.props.checked
  }

  getWrapperClsName = () => {
    const { disabled, value } = this.props;
    const { checked, clsPrefix } = this.state;
    let isCheck = checked;
    let isDisabled = disabled;
    const { radioGroup } = this.context;
    if(radioGroup) {
      isCheck = radioGroup.value === value;
      isDisabled = disabled ? disabled : radioGroup.disabled;
    }
    return classnames(
      `${this.state.clsPrefix}-wrapper`,
      {[`${clsPrefix}-wrapper-checked`]: isCheck },
      {[`${clsPrefix}-wrapper-disabled`]: isDisabled },
    );
  }

  getClsName = () => {
    const { disabled, value } = this.props;
    const { checked, clsPrefix } = this.state;
    let isCheck = checked;
    let isDisabled = disabled;
    const { radioGroup } = this.context;
    if(radioGroup) {
      isCheck = radioGroup.value === value;
      isDisabled = disabled ? disabled : radioGroup.disabled;
    }
    return classnames(
      this.state.clsPrefix,
      {[`${clsPrefix}-checked`]: isCheck },
      {[`${clsPrefix}-disabled`]: isDisabled },
      this.props.className
    );
  }

  handleKeyDown = (e) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  handleChange = e => {
    const checked = e.target.checked;
    const value = this.props.value;
    if (!('checked' in this.props)) {
      this.setState({
        checked: checked ? 1 : 0
      });
    }
    
    const event = {
      target: { checked, value },
      stopPropagation: function stopPropagation() {
        e.stopPropagation();
      },
      preventDefault: function preventDefault() {
        e.preventDefault();
      }
    }
    if(this.props.onChange) {
      this.props.onChange(event);
    }

    if (this.context.radioGroup && this.context.radioGroup.onChange) {
      this.context.radioGroup.onChange(event);
    }
  }

  focus = () => {
    this.input.focus();
  }

  blur = () => {
    this.input.blur();
  }

  render() {
    const clsPrefix = this.state.clsPrefix;
    const { value, children, disabled, style, onMouseEnter, onMouseLeave } = this.props;
    const clsName = this.getClsName();
    const wrapperClsName = this.getWrapperClsName();
    const renderProp = getRenderProps(this.props);
    const { radioGroup } = this.context;
    let radioChecked = false;
    let radioDisabled = disabled;
    if(radioGroup) {
      renderProp.name = radioGroup.name;
      radioDisabled = disabled || radioGroup.disabled;
      radioChecked = value === radioGroup.value;
    }

    return <label
      className={wrapperClsName}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <span className={clsName}>
        <input {...renderProp}
          disabled={radioDisabled}
          className={`${clsPrefix}-input`}
          type="radio"
          checked={radioChecked}
          onChange={this.handleChange}/>
        <span className={`${clsPrefix}-inner`}></span>
      </span>
      {children !== undefined && <span>{children}</span>}
    </label>;
  }
}
