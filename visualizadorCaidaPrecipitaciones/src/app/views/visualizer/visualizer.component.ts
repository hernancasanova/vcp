import { Component, OnInit } from '@angular/core';
//import Highcharts = require('highcharts');
//import { HighchartsChartModule } from 'highcharts-angular';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss'],
  //standalone: true,
  //imports: [HighchartsChartModule],
})
export class VisualizerComponent implements OnInit {

  constructor() { }

  registers: Array<any>=[];

  ngOnInit(): void {
    this.deployrConditions();
  }

  data: number[] = [];
  categories: string[] = [];

  async deployrConditions(): Promise<void> 
  {
    this.registers = await fetch("http://localhost:8005/listar")
                        .then(x=>x.json())
                        .then(x=> x)
                        .catch(error=>console.log(error));

    // let d: keyof this.registers;
    for(let d of this.registers){
      this.data.push(d.cantidad)
      this.categories.push(d.fecha)
    }
  }
  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Caida de precipitaciones'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'ml',
        type: 'line',
        data: this.data
      }
    ],
    yAxis: {
      title: {
          text: 'ml'
      }
    },
    xAxis: {
      //type: "datetime",
      //categories: ["H","E","R"],
      categories:this.categories
  }
  });



  // Highcharts = Highcharts;
  // linechart: any = {
  //   series: [
  //     {
  //       data: [1, 2, 3],
  //     },
  //   ],
  //   chart: {
  //     type: 'line',
  //   },
  //   title: {
  //     text: 'linechart',
  //   },
  // };
}
