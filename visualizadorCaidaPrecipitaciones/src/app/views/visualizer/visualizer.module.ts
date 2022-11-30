import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerModule} from '@coreui/angular';
import { VisualizerComponent } from './visualizer.component';
import { ChartModule } from 'angular-highcharts';



@NgModule({
  declarations: [VisualizerComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    ChartModule
  ],
  exports: [VisualizerComponent]
})
export class VisualizerModule { }
