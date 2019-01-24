import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getRenderProps } from '../../utils/dom';
import Icon from '../icon';
import './index.scss';

const CLS_PREFIX = 'mfb-checkbox';

export default class Checkbox extends Component {
  static propTypes = {
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.any
  };
  static defaultProps = {
    disabled: false,
    defaultChecked: false
  };
  static getDerivedStateFromProps(nextProps) {
    if ('checked' in nextProps) {
      return {
        checked: nextProps.checked,
      };
    }
    return null;
  }
  state = {
    checked: typeof this.props.checked === 'undefined' ? this.props.defaultValue : this.props.checked
  }

  getWrapperClsName = () => {
    return classnames(
      `${CLS_PREFIX}-wrapper`,
    );
  }

  getClsName = () => {
    const { disabled, indeterminate } = this.props;
    const { checked } = this.state;
    console.log(888, this.props, indeterminate, checked);
    return classnames(
      CLS_PREFIX,
      {[`${CLS_PREFIX}-checked`]: checked },
      {[`${CLS_PREFIX}-indeterminate`]: !checked && indeterminate },
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
    const checked = e.target.checked;
    if (!('checked' in this.props)) {
      this.setState({
        checked: checked ? 1 : 0
      });
    }
    const { onChange } = this.props;
    if(onChange) {
      onChange({
        target: {
          checked: checked
        },
        stopPropagation: function stopPropagation() {
          e.stopPropagation();
        },
        preventDefault: function preventDefault() {
          e.preventDefault();
        }
      });
    }
  }

  focus = () => {
    this.input.focus();
  }

  blur = () => {
    this.input.blur();
  }

  render() {
    const clsPrefix = CLS_PREFIX;
    const { children, disabled, style, onMouseEnter, onMouseLeave } = this.props;
    const clsName = this.getClsName();
    const renderProp = getRenderProps(this.props);

    return <label
      className={`${CLS_PREFIX}-wrapper`}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {/* <RcCheckbox
        {...checkboxProps}
        prefixCls={prefixCls}
        className={checkboxClass}
        ref={this.saveCheckbox}
      /> */}
      <span className={clsName}>
        <input {...renderProp} 
          disabled={disabled}
          className={`${clsPrefix}-input`}
          type="checkbox"
          checked={!!this.state.checked}
          onChange={this.handleChange}/>
        <span className={`${clsPrefix}-inner`}></span>
      </span>
      {children !== undefined && <span>{children}</span>}
    </label>;
  }
}
