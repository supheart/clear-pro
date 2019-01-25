import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRenderProps } from '../../utils/dom';

const CLS_PREFIX = 'mfb-radio-group';

export default class RadioGroup extends Component {
  static propTypes = {
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any
  };
  static defaultProps = {
    disabled: false,
    defaultValue: ''
  };
  static childContextTypes = {
    radioGroup: PropTypes.any
  }
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return { value: nextProps.value };
    } else {
      const checkedValue = getCheckedValue(nextProps.children);
      if(checkedValue) {
        return { value: checkedValue.value };
      }
    }
    return null;
  }
  state = {
    value: typeof this.props.value === 'undefined' ? this.props.defaultValue : this.props.value
  }

  getChildContext = () => {
    return {
      radioGroup: {
        onChange: this.onRadioChange,
        value: this.state.value,
        disabled: this.props.disabled,
        name: this.props.name
      }
    }
  }

  onRadioChange = e => {
    const lastValue = this.state.value;
    const { value } = e.target;

    if(!('value' in this.props)) {
      this.setState({value});
    }
    const { onChange } = this.props;
    if(onChange && value !== lastValue) {
      onChange(e);
    }
  }

  render() {
    const clsName = `${CLS_PREFIX}`;
    const { children } = this.props;
    const renderProp = getRenderProps(this.props);

    return (
      <div {...renderProp} className={clsName}>
        {children}
      </div>
    );
  }
}

function getCheckedValue(children) {
  let value = null;
  let matched = false;
  React.Children.forEach(children, (radio) => {
    if (radio && radio.props && radio.props.checked) {
      value = radio.props.value;
      matched = true;
    }
  });
  return matched ? { value: value } : undefined;
}