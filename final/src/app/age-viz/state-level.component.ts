import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'age-viz',
  templateUrl: './state-level.component.html',
  styleUrls: ['./state-level.component.css']
})

export class StateLevelComponent implements OnInit {

  @Input()
  data: any[] = [];

  sampleData = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7]
  ];
  chartData = {
    chartType: 'PieChart', dataTable: this.sampleData, options: {
      width:600, height: 400,
      title: 'Age Group',
      curveType: 'function',
      // legend: { position: 'bottom' },
      vAxis: { gridlines: { count: -1 } },
    },
  }

  showChart = false;

  constructor() { }


  ngOnInit(): void {
    // console.debug('top Player data', this.data)

    this.processData(this.data[0]);
  }

  private refreshChart() {
    setTimeout(() => {    //Set the loadData$ flag back to false, with 0 millisecond timeout, (a cool trick)
      this.showChart = true;
    }, 0);

  }

  private processData(data: any[]) {
    this.showChart = false;
    // console.debug('processing data', data)
    let groupedData = d3.rollup(data, v => v.length, d => d.Age_Bin);
    let groupedArray = [...groupedData];
    
    groupedArray = groupedArray.sort((a, b) => a[0] - b[0]);
    // console.debug('groupedArray', groupedArray);
    // console.debug(groupedArray.map(d => [+d[0] + '-' + (+d[0]+10) + ' Years Old', d[1]]));

    groupedArray = groupedArray.map(d => [+d[0] + '-' + (+d[0]+10) + ' Years Old', d[1]])
    // console.debug('top player sorted', sorted)
    // let playerNames = Array.from(sorted, d => d.Name)
    let dataTable :any[]= [
      ['Age Group', 'Count']
      // , groupedArray[0] 
      , groupedArray[1]
      , groupedArray[2]
      , groupedArray[3]
      , groupedArray[4]
    ];

    this.chartData.dataTable = dataTable;
    this.refreshChart();


  }


}
