import React, { Component } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';

export default class extends Component {
  state = {
    config: {
      // data: [
      //   ["", "Ford", "Volvo", "Toyota", "Honda"],
      //   ["2016", 10, 11, 12, 13],
      //   ["2017", 20, 11, 14, 13],
      //   ["2018", 30, 15, 12, 13]
      // ],
      data: Handsontable.helper.createSpreadsheetData(8, 12),
      rowHeaders: true,
      colHeaders: true,
      contextMenu: {
        items: {
          'row_above': {
            name: '在上方插入行'
          },
          'row_below': {
            name: '在下方插入行'
          },
          'separator': Handsontable.plugins.ContextMenu.SEPARATOR, // 分隔线
          'clear_custom': {
            name: '清空表格',
            callback: function() {
              console.log(this);
              this.clear();
            }
          }
        }
      }
    },
  };

  handleChange = (setting, states) => {
    return (event) => {
      this.setState({
        config: {
          [setting]: states[event.target.checked ? 1 : 0],
        }
      });
    }
  };

  render() {
    return <section>
      <h3>handsontabel test</h3>
      <div className="controllers">
        <label><input onChange={this.handleChange('fixedRowsTop', [0, 2])} type="checkbox" />Add fixed rows</label><br/>
        <label><input onChange={this.handleChange('fixedColumnsLeft', [0, 2])} type="checkbox" />Add fixed columns</label><br/>
      </div>
      <div id="hot-app">
        <HotTable settings={this.state.config} width="600" height="200" stretchH="all" />
      </div>
    </section>
  }
}