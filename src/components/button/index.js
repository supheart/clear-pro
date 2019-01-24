import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../icon';
import { getRenderProps } from '../../utils/dom';
import './index.scss';

const CLS_PREFIX = 'mfb-btn';

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    className: PropTypes.string
  };
  static defaultProps = {
    type: 'primary',
    disabled: false,
    loading: false
  };

  state = {
    clicked: false
  }

  handleClick = (e) => {
    this.setState({clicked: true});
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      return this.setState({clicked: false})
    }, 300);
    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  }

  getClsName = () => {
    const { type, disabled, loading } = this.props;
    return classnames(
      CLS_PREFIX, 
      `${CLS_PREFIX}-${type}`,
      {[`${CLS_PREFIX}-clicked`]: this.state.clicked}, 
      {[`${CLS_PREFIX}-disabled`]: disabled || loading }, 
      this.props.className
    );
  }

  render() {
    const { loading, children, disabled } = this.props;
    const clsName = this.getClsName();
    const renderProp = getRenderProps(this.props);
    return (
      <button {...renderProp} 
        onClick={this.handleClick} 
        className={clsName} 
        disabled={disabled || loading}>
          {children}{this.props.type}
          {loading && <Icon type="reload" spin style={{marginLeft: '4px'}}></Icon>}
      </button>)
  }
}
