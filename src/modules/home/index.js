import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class extends Component {
  render() {
    return <section>
      <h3>home page</h3>
      <div>
        <p><Link to="/handsontable">handsontable</Link></p>
        <p><Link to="/test">test</Link></p>
      </div>
    </section>
  }
}