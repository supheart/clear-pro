import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getRenderProps } from '../../utils/dom';
import Icon from '../icon';
import './index.scss';

const CLS_PREFIX = 'mfb-input';

export default class Input extends Component {
  static propTypes = {
    maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    type: PropTypes.string,
    value: PropTypes.string,
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    allowClear: PropTypes.bool,
    showIcon: PropTypes.bool,
    className: PropTypes.string
  };
  static defaultProps = {
    type: 'text',
    disabled: false,
    defaultValue: '',
    allowClear: false,
    showIcon: true
  };
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }
  state = {
    value: typeof this.props.value === 'undefined' ? this.props.defaultValue : this.props.value,
    showType: this.props.type
  }

  setValue = (value, e) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const { onChange } = this.props;
    if (onChange) {
      let event = e;
      if (e.type === 'click') {
        // click clear icon
        event = Object.create(e);
        event.target = this.input;
        event.currentTarget = this.input;
        const originalInputValue = this.input.value;
        // change input value cause e.target.value should be '' when clear input
        this.input.value = '';
        onChange(event);
        // reset input value
        this.input.value = originalInputValue;
        return;
      }
      onChange(event);
    }
  }

  getWrapperClsName = () => {
    return classnames(
      `${CLS_PREFIX}-wrapper`,
    );
  }

  getClsName = () => {
    const { type, disabled } = this.props;
    return classnames(
      CLS_PREFIX,
      `${CLS_PREFIX}-${type}`,
      {[`${CLS_PREFIX}-disabled`]: disabled },
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
    this.setValue(e.target.value, e);
  }

  clearValue = e => {
    if(this.props.disabled) return;
    this.setValue('', e);
    console.log(this.state.value);
  }

  toggleShowType = () => {
    if(this.props.disabled) return;
    if(this.state.showType === 'password') {
      this.setState({ showType: 'text'});
    } else {
      this.setState({ showType: 'password'});
    }
  }

  getClearDom = () => {
    const { allowClear } = this.props;
    const { value } = this.state;
    if(!allowClear || value === undefined || value === '') return null;
    return <span className={`${CLS_PREFIX}-suffix ${this.props.disabled && 'disabled'}`} onClick={this.clearValue}>
        <Icon type="close-circle-fill" className="iconfont-pointer allow-clear" />
      </span>;
  }

  getPasswordEyeDom = () => {
    const showEyeIcon = this.props.type === 'password' && this.props.showIcon;
    const hideCls = classnames({'iconfont-opposite': this.state.showType === 'text'}, {'iconfont-disabled': this.props.disabled});
    return (
      showEyeIcon && <span className={`${CLS_PREFIX}-suffix`} onClick={this.toggleShowType}>
        <Icon type="eye" className={`iconfont-pointer ${hideCls}`} />
      </span>
    );
  }

  getExtraDom = () => {
    let extraDom = this.getPasswordEyeDom();
    if(!extraDom) {
      extraDom = this.getClearDom();
    }
    return extraDom;
  }

  focus = () => {
    this.input.focus();
  }

  blur = () => {
    this.input.blur();
  }

  render() {
    const clsPrefix = CLS_PREFIX;
    const { prefix, suffix, disabled } = this.props;
    const clsName = this.getClsName();
    const wrapperClsNmae = this.getWrapperClsName();
    const renderProp = getRenderProps(this.props, ['showIcon', 'prefix', 'suffix', 'allowClear', 'onPressEnter']);

    return <span className={wrapperClsNmae}>
      {prefix && <span className={`${clsPrefix}-prefix ${disabled && 'disabled'}`}>{ prefix }</span>}
      <input {...renderProp}
        value={this.state.value}
        className={clsName}
        type={this.state.showType}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        ref={(node) => { this.input = node;}} />
      {suffix ? <span className={`${clsPrefix}-suffix ${disabled && 'disabled'}`}>{ suffix }</span> 
              : this.getExtraDom()}
    </span>;
  }
}