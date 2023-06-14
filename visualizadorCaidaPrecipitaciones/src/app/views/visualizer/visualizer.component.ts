import { Component, OnInit } from '@angular/core';
//import Highcharts = require('highcharts');
//import { HighchartsChartModule } from 'highcharts-angular';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { Point } from 'highcharts';
 //import * as Highcharts from 'highcharts';
// import { chart, Point } from 'highcharts';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss'],
  //standalone: true,
  //imports: [HighchartsChartModule],
})
export class VisualizerComponent implements OnInit {
  video: any | undefined;
  chart: any;
  colors = Highcharts.getOptions().colors
  constructor() {
    this.deployrConditions();
  }

  registers: Array<any>=[];

  ngOnInit(): void {
  }
  data: any[] = [];
  categories: any[] = [];

  async deployrConditions(): Promise<void> 
  {
    this.registers = await fetch("http://localhost:8005/listar")
                        .then(x=>x.json())
                        .then(x=> x)
                        .catch(error=>console.log(error));

    for(let d of this.registers){
      this.data.push({y:d.cantidad,color:d.vid?"#8085e9":'#f15c80'}) 
      let date: any = d.fecha; 
      let newdate = date.split("-").reverse().join("-");
      this.categories.push(newdate)
    }
    Highcharts.setOptions({
        time: {
          useUTC: false
        }
    })
    this.chart = new Chart({
      chart: {
        type:'scatter'
      },
      plotOptions:{
        series: {
          point: {
            events: {
              click(e) {
                document.getElementById("video")?.setAttribute("src","http://localhost:4201/assets/videos/"+(e.point.category.toString().replace(/\//g,""))+".mp4")
              }
            }
          }
        }
      },
      title: {
        text: 'Caida de precipitaciones'
      },
      credits: {
        enabled: false
      },
      tooltip:{
        formatter:function() {
              return '<b>'+this.y+' ml<br>'+this.point.category+'</b>';
      }
      },
      series: [
        {
          type: 'scatter',
          name: 'Con video',
          data: this.data,
          color:"#8085e9"
        },{type:'scatter',name:"Sin video", data:[{}], color:"#f15c80", marker:{symbol:"circle"}  }

      ],
      yAxis: {
        title: {
            text: 'ml'
        }
      },
      xAxis: {
        type: "datetime",
        categories:this.categories
      },
      legend:{
        enabled:true
      }
    });
  }
}
