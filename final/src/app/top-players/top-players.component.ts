import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'top-players',
  templateUrl: './top-players.component.html',
  styleUrls: ['./top-players.component.css']
})
export class TopPlayersComponent implements OnInit {

  @Input()
  data: any[] = [];

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  skillsFormControl = new FormControl();

  public theme: any;
  skills = [
    'Acceleration',
    'Aggression',
    'Agility',
    'Ball_Control',
    'Composure',
    'Crossing',
    'Curve',
    'Crossing',
    'Dribbling',
    'Finishing',
    'Interceptions',
    'Stamina',
    'Speed',


  ]


  showChart: boolean = false;

  sampleData = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7]
  ];
  chartData = {
    chartType: 'LineChart', dataTable: this.sampleData, options: {
      title: 'Top Players',
      curveType: 'function',
      legend: { position: 'bottom' },
      vAxis: { gridlines: { count: -1 } },
    },
  }

  constructor() { }

  ngOnInit(): void {
    // console.debug('top Player data', this.data)
    this.theme = this.skills.slice(0, 5);
    this.processData(this.data[0], this.theme);
  }

  private refreshChart() {
    setTimeout(() => {    //Set the loadData$ flag back to false, with 0 millisecond timeout, (a cool trick)
      this.showChart = true;
    }, 0);

  }

  private processData(data: any[], skills: any[]) {
    this.showChart = false;
    // console.debug('processing data', data, skills)
    let sorted = data.sort((a, b) => a.Ranking - b.Ranking).slice(0, 10);
    // console.debug('top player sorted', sorted)
    let playerNames = Array.from(sorted, d => d.Name)
    let dataTable = [['Skills', ...playerNames]];

    skills.forEach(s => {
      let rs = Array.from(sorted, d => +d[s] || 0);
      dataTable.push([s, ...rs])
    })
    console.debug('dataTable', dataTable);

    this.chartData.dataTable = dataTable;
    this.refreshChart();


  }

  onSkillSelect(ev: any) {
    // console.debug('selection', ev.value);
    this.processData(this.data[0], ev.value);
  }

}
