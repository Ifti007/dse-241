import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-rating',
  templateUrl: './line-rating.component.html',
  styleUrls: ['./line-rating.component.css']
})
export class LineRatingComponent implements OnInit {

  private data = [{"Name":"Cristiano Ronaldo","Nationality":"Portugal","Club":"Real Madrid","Club_Position":"LW","Club_Kit":7.0,"Rating":94,"Height":"185 cm","Weight":"80 kg","Preffered_Foot":"Right","Birth_Date":"02\/05\/1985","Age":32,"Weak_foot":0.75,"Skill_Moves":1.0,"Ball_Control":0.9777777778,"Dribbling":0.9462365591,"Marking":0.2134831461,"Sliding_Tackle":0.2,"Standing_Tackle":0.3146067416,"Aggression":0.6489361702,"Reactions":1.0,"Attacking_Position":1.0,"Interceptions":0.2888888889,"Vision":0.8928571429,"Composure":0.9101123596,"Crossing":0.9176470588,"Short_Pass":0.8902439024,"Long_Pass":0.8139534884,"Acceleration":0.9411764706,"Speed":0.9529411765,"Stamina":0.9647058824,"Strength":0.7692307692,"Balance":0.6091954023,"Agility":0.9294117647,"Jumping":1.0,"Heading":0.9,"Shot_Power":0.9888888889,"Finishing":0.9784946237,"Long_Shots":0.9885057471,"Curve":0.8720930233,"Freekick_Accuracy":0.808988764,"Penalties":0.8764044944,"Volleys":0.9444444444,"GK_Positioning":0.1444444444,"GK_Diving":0.0681818182,"GK_Kicking":0.1489361702,"GK_Handling":0.1111111111,"GK_Reflexes":0.1123595506,"Age_Bin":"30","Height_Bin(cm)":"185","Weight_Bin(kg)":"80"}
  ,{"Name":"Lionel Messi","Nationality":"Argentina","Club":"FC Barcelona","Club_Position":"RW","Club_Kit":10.0,"Rating":93,"Height":"170 cm","Weight":"72 kg","Preffered_Foot":"Left","Birth_Date":"06\/24\/1987","Age":29,"Weak_foot":0.75,"Skill_Moves":0.75,"Ball_Control":1.0,"Dribbling":1.0,"Marking":0.1123595506,"Sliding_Tackle":0.2333333333,"Standing_Tackle":0.2808988764,"Aggression":0.4893617021,"Reactions":0.9850746269,"Attacking_Position":0.9891304348,"Interceptions":0.2111111111,"Vision":0.9523809524,"Composure":1.0,"Crossing":0.8352941176,"Short_Pass":0.9512195122,"Long_Pass":0.9302325581,"Acceleration":0.9529411765,"Speed":0.8941176471,"Stamina":0.7529411765,"Strength":0.5,"Balance":0.9770114943,"Agility":0.9294117647,"Jumping":0.6625,"Heading":0.7444444444,"Shot_Power":0.9111111111,"Finishing":1.0,"Long_Shots":0.9655172414,"Curve":0.9651162791,"Freekick_Accuracy":0.9662921348,"Penalties":0.7528089888,"Volleys":0.9111111111,"GK_Positioning":0.1444444444,"GK_Diving":0.0568181818,"GK_Kicking":0.1489361702,"GK_Handling":0.1111111111,"GK_Reflexes":0.0786516854,"Age_Bin":"20","Height_Bin(cm)":"165","Weight_Bin(kg)":"70"}
  ,{"Name":"Neymar","Nationality":"Brazil","Club":"FC Barcelona","Club_Position":"LW","Club_Kit":11.0,"Rating":92,"Height":"174 cm","Weight":"68 kg","Preffered_Foot":"Right","Birth_Date":"02\/05\/1992","Age":25,"Weak_foot":1.0,"Skill_Moves":1.0,"Ball_Control":1.0,"Dribbling":0.9892473118,"Marking":0.202247191,"Sliding_Tackle":0.3111111111,"Standing_Tackle":0.2359550562,"Aggression":0.5744680851,"Reactions":0.8805970149,"Attacking_Position":0.9565217391,"Interceptions":0.3666666667,"Vision":0.8333333333,"Composure":0.8426966292,"Crossing":0.8117647059,"Short_Pass":0.8658536585,"Long_Pass":0.7906976744,"Acceleration":0.9647058824,"Speed":0.9294117647,"Stamina":0.8117647059,"Strength":0.3717948718,"Balance":0.8275862069,"Agility":1.0,"Jumping":0.575,"Heading":0.6444444444,"Shot_Power":0.8333333333,"Finishing":0.935483871,"Long_Shots":0.8390804598,"Curve":0.8488372093,"Freekick_Accuracy":0.8988764045,"Penalties":0.8314606742,"Volleys":0.8888888889,"GK_Positioning":0.1555555556,"GK_Diving":0.0909090909,"GK_Kicking":0.1489361702,"GK_Handling":0.0888888889,"GK_Reflexes":0.1123595506,"Age_Bin":"20","Height_Bin(cm)":"165","Weight_Bin(kg)":"60"}
  ,{"Name":"Luis Su\u00e1rez","Nationality":"Uruguay","Club":"FC Barcelona","Club_Position":"ST","Club_Kit":9.0,"Rating":92,"Height":"182 cm","Weight":"85 kg","Preffered_Foot":"Right","Birth_Date":"01\/24\/1987","Age":30,"Weak_foot":0.75,"Skill_Moves":0.75,"Ball_Control":0.9555555556,"Dribbling":0.8817204301,"Marking":0.3033707865,"Sliding_Tackle":0.3666666667,"Standing_Tackle":0.4719101124,"Aggression":0.8085106383,"Reactions":0.9552238806,"Attacking_Position":0.9782608696,"Interceptions":0.4222222222,"Vision":0.880952381,"Composure":0.8764044944,"Crossing":0.8352941176,"Short_Pass":0.8902439024,"Long_Pass":0.6627906977,"Acceleration":0.9058823529,"Speed":0.7764705882,"Stamina":0.9294117647,"Strength":0.7179487179,"Balance":0.5747126437,"Agility":0.8823529412,"Jumping":0.675,"Heading":0.8111111111,"Shot_Power":0.9333333333,"Finishing":0.9892473118,"Long_Shots":0.9425287356,"Curve":0.9302325581,"Freekick_Accuracy":0.8988764045,"Penalties":0.8764044944,"Volleys":0.9444444444,"GK_Positioning":0.3555555556,"GK_Diving":0.2954545455,"GK_Kicking":0.3191489362,"GK_Handling":0.2666666667,"GK_Reflexes":0.404494382,"Age_Bin":"30","Height_Bin(cm)":"175","Weight_Bin(kg)":"80"}
  ,{"Name":"Manuel Neuer","Nationality":"Germany","Club":"FC Bayern","Club_Position":"GK","Club_Kit":1.0,"Rating":92,"Height":"193 cm","Weight":"92 kg","Preffered_Foot":"Right","Birth_Date":"03\/27\/1986","Age":31,"Weak_foot":0.75,"Skill_Moves":0.0,"Ball_Control":0.4777777778,"Dribbling":0.2795698925,"Marking":0.0786516854,"Sliding_Tackle":0.0666666667,"Standing_Tackle":0.0786516854,"Aggression":0.2872340426,"Reactions":0.8358208955,"Attacking_Position":0.1086956522,"Interceptions":0.3,"Vision":0.7142857143,"Composure":0.7303370787,"Crossing":0.1058823529,"Short_Pass":0.5487804878,"Long_Pass":0.6046511628,"Acceleration":0.5529411765,"Speed":0.5882352941,"Stamina":0.4,"Strength":0.8076923077,"Balance":0.2873563218,"Agility":0.4823529412,"Jumping":0.7875,"Heading":0.2333333333,"Shot_Power":0.2444444444,"Finishing":0.1182795699,"Long_Shots":0.1379310345,"Curve":0.0930232558,"Freekick_Accuracy":0.0786516854,"Penalties":0.4494382022,"Volleys":0.0888888889,"GK_Positioning":1.0,"GK_Diving":1.0,"GK_Kicking":1.0,"GK_Handling":0.9888888889,"GK_Reflexes":0.9887640449,"Age_Bin":"30","Height_Bin(cm)":"185","Weight_Bin(kg)":"90"}
];

  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  constructor() { }



  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);

  }

  private createSvg(): void {
    this.svg = d3.select("figure#line_rating")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {

  var x = d3.scaleBand()
    .domain(['Finishing', 'Stamina', 'Acceleration', 'Dribbling'])
    .range([ 0, this.width]); 
  this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).ticks(4));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 10])
    .range([0, this.height]);
  this.svg.append("g")
    .call(d3.axisLeft(y));

      // color palette
  var res = data.map(function(d){ return d.Name }) // list of group names
  var color = d3.scaleOrdinal()
    .domain(res)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])
  
  // console.log('res',res)
  // console.log('color',res)



  // Draw the line
  this.svg.selectAll(".line")
      .data(data)
      .enter()
      .append("path")
      .attr("hope", "none")
      .attr("stroke", function(d:any){ return color(d.Name) })
      .attr("stroke-width", 1.5)
      .attr("d", function(d:any){
        return d3.line()
             .x((d:any) => 15)
            .y((d:any) => 15)
            // (d.Dribbling)
        })




  }

}
