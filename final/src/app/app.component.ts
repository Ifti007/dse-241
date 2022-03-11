import { Component } from '@angular/core';
import {
  HttpClient
} from "@angular/common/http";
import * as d3 from 'd3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'GOAT - Greatest of All Time';
  data: any;
  dataLoaded: boolean = false;
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    // let path='https://raw.githubusercontent.com/Ifti007/dse-241/main/data/soccer.csv';
    // //"assets/testData.json"
    // this.httpClient.get(path).subscribe(data => {
    //   console.log('ng onnit', data);
    //   this.dataLoaded = true;
    //   this.data = data;
    // })
    let csvFile = "https://raw.githubusercontent.com/Ifti007/dse-241/main/data/soccer.csv";

    // console.debug('app ng on init');

    Promise.all([
      d3.csv(csvFile)
    ]).then((loadedData) => {
      // console.debug('NG ON INIT loadData', loadedData);
      this.data = loadedData;
      this.dataLoaded = true;
    });
  }
}
