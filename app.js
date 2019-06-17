import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const axios = require('axios');
function pushIntoRow(obj, i) {
    var dict = {};
    for(var key in obj) {
        if (obj.hasOwnProperty(key)) {
            dict[key] = obj[key][i];
        }
    }
    return dict;
}
class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Date", field: "Date", sortable: true, filter: true
      }, {
        headerName: "Time", field: "Time", sortable: true, filter: true
      }, {
        headerName: "Symbol", field: "Symbol", sortable: true, filter: true
      }],
      // rowData: [{
      //   make: "Toyota", model: "Celica", price: 35000
      // }, {
      //   make: "Ford", model: "Mondeo", price: 32000
      // }, {
      //   make: "Porsche", model: "Boxter", price: 72000
      // }]
    }
  }

    componentDidMount() {
        const testURL = 'http://localhost:5150';
    	const myInit = {
    		method: 'GET',
    	};

	    const myRequest = new Request(testURL, myInit);
        fetch(myRequest).then(response => {
          return response.json();
      }).then(result => {
          var rows = [];
          for (var i = 0; i < 3; i++) {
              var row = pushIntoRow(result, i);
              rows.push(row);
          }
          console.log(rows);
          return rows;
      }).then(rowData => this.setState({rowData}))
    }


  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '500px',
        width: '600px' }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}>
        </AgGridReact>
      </div>
    );
  }
}


function App() {
  return (
      <Grid />
  );
}

export default App;
