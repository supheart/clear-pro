import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getRenderProps } from '../../utils/dom';
import './index.scss';

const CLS_PREFIX = 'mfb-icon';

export default class Icon extends Component {
  static propTypes = {
    type: PropTypes.string,
    spin: PropTypes.bool,
    className: PropTypes.string
  };
  static defaultProps = {
    type: '',
    spin: false
  };

  getClsName = () => {
    return classnames(
      CLS_PREFIX, 
      `iconfont icon-${this.props.type}`, 
      {[`${CLS_PREFIX}-spin`]: !!this.props.spin},
      this.props.className
    );
  }

  handleClick = e => {
    const { onClick } = this.props;
    if(onClick) {
      onClick(e);
    }
  }

  render() {
    const { type } = this.props;
    const clsName = this.getClsName();
    const renderProp = getRenderProps(this.props);
    return !!type && <i {...renderProp} className={clsName} onClick={this.handleClick}></i>;
  }
}