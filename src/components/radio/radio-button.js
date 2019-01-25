import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import { getRenderProps } from '../../utils/dom';
import Radio from './radio';
import './index.scss';

const CLS_PREFIX = 'mfb-radio-button';

export default class RadioButton extends Component {
  render() {
    return <Radio {...this.props} clsPrefix={CLS_PREFIX}></Radio>
  }
}