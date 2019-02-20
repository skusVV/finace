import {Component, Input, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { Chart } from 'chart.js';
import {isMobile} from 'is-mobile';

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

  get width(): number {
    // TODO remove magic numbers
    return isMobile() ? 2000 : 0;
  }

  get height(): number {
    // TODO remove magic numbers
    return isMobile() ? 2000 : 0;
  }

  private addPieChart() {
    new Chart(this.chartPie.nativeElement, {
      type: CHART_TYPE,
      data: this.data.data,
      options: this.data.options,
    });
  }
}
