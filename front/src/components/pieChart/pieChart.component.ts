import {Component, Input, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { Chart } from 'chart.js';

const CHART_TYPE = 'pie';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pieChart.component.html',
  styleUrls: ['./pieChart.component.less']
})
export class PieChartComponent implements AfterViewInit {
  @Input() data: any;
  @ViewChild('pie_chart') chartPie: ElementRef;

  ngAfterViewInit() {
    this.addPieChart();
  }

  private addPieChart() {
    new Chart(this.chartPie.nativeElement, {
      type: CHART_TYPE,
      data: this.data.data,
      options: this.data.options,
    });
  }
}