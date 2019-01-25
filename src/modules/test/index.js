import React, { Component } from 'react';
import Button from '../../components/button';
import Icon from '../../components/icon';
import Input from '../../components/input';
import Checkbox from '../../components/checkbox';
import Radio from '../../components/radio';

export default class extends Component {
  state = {
    loading: false,
    inputValue: '5566',
    newValue: 'ddcc',
    checkValue: false,
    checkIndeterminate: true,
    newRadio: 2
  }

  handleClick = () => {
    this.inputNode.focus();
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  testClick = () => {
    console.log('click func');
  }

  clearValue = (e) => {
    this.setState({newValue: e.target.value});
  }

  changeCheckbox = (e) => {
    this.setState({ checkValue: e.target.checked, checkIndeterminate: true});
  }

  changeCheckIndeterminate = () => {
    this.setState({checkIndeterminate: false});
  }

  radioChange = e => {
    console.log(e.target.value);
    const newRadio = e.target.value;
    this.setState({ newRadio })
  }

  render() {
    return <section>
      <h3>test page</h3>
      <div className="content">
        <p><Icon type="reload" style={{fontSize: '18px', color: 'red'}} spin></Icon></p>
        <p><Button bbb={123} cc={null} dd={undefined} ff={{a: 1}} gg={true} type="danger" onClick={this.handleClick}>test btn</Button></p>

        <p><Button loading={this.state.loading}>test btn</Button></p>

        <p><Input type="text" value={this.state.inputValue} prefix={<Icon type="user"></Icon>} suffix={<Icon type="eye" onClick={this.testClick}/>} onChange={this.handleChange} /></p>

        <p><Input type="password" value={this.state.inputValue} prefix={<Icon type="user"></Icon>} onChange={this.handleChange} onPressEnter={this.testClick} /></p>

        <p><Input defaultValue="aabb" allowClear onChange={this.testClick}/></p>
        <p><Input value={this.state.newValue} allowClear onChange={this.clearValue} onFocus={this.testClick} ref={(node) => {this.inputNode = node;}}/></p>

        <p><Checkbox indeterminate={this.state.checkIndeterminate} onChange={this.changeCheckIndeterminate}>123</Checkbox></p>
        <p><Checkbox disabled >456</Checkbox> <Checkbox checked={this.state.checkValue} onChange={this.changeCheckbox}>888</Checkbox></p>

        <p>
          {/* <Radio.Group> */}
            <Radio defaultChecked disabled>123</Radio>
            <Radio defaultChecked>456</Radio>
            <Radio>789</Radio>
          {/* </Radio.Group> */}
        </p>
        <Radio.Group name="ttaa" value={this.state.newRadio} onChange={this.radioChange} disabled>
          <Radio value={1}>aa123</Radio>
          <Radio value={2}>aa456</Radio>
          <Radio value={3}>aa789</Radio>
        </Radio.Group>
        <Radio.Group name="ttbb" value={this.state.newRadio} onChange={this.radioChange}>
          <Radio value={1}>aa123</Radio>
          <Radio value={2}>aa456</Radio>
          <Radio value={3}>aa789</Radio>
        </Radio.Group>
        <Radio.Group name="ttcc" value={this.state.newRadio} onChange={this.radioChange}>
          <Radio.Button value={1}>aa123</Radio.Button>
          <Radio.Button value={2}>aa456</Radio.Button>
          <Radio.Button value={3}>aa789</Radio.Button>
        </Radio.Group>

        <Radio.Group name="ttdd" value={this.state.newRadio} onChange={this.radioChange} disabled>
          <Radio.Button value={1}>aa123</Radio.Button>
          <Radio.Button value={2}>aa456</Radio.Button>
          <Radio.Button value={3}>aa789</Radio.Button>
        </Radio.Group>
        <p>
          <Radio.Button disabled>aa456</Radio.Button>
          <Radio value="123"></Radio>
          <Radio.Button>aa789</Radio.Button>
        </p>

        <p>
          <input type="radio" name="aa"/>
          <input type="radio" name="aa"/>
          <input type="radio" name="aa"/>
        </p>
      </div>
    </section>
  }
}