import { Component, OnInit, trigger, AfterViewInit, Inject, Input } from '@angular/core'
import * as Chartist from 'chartist'
import { ChartType, ChartEvent } from 'angular2-chartist'
import { fadeInOutView } from '../../../utils/utils.animation'

import { ENVIRONMENT } from '../../../app-config.module'

const data: any = require('./data.json')

export interface Chart {
  type: ChartType
  data: Chartist.IChartistData
  options?: any
  responsiveOptions?: any
  events?: ChartEvent
}

@Component({
  selector: 'zp-stats',
  templateUrl: './stats.component.html',
  styles: [`
    :host {
      display: block;
      position: relative;
    }
  `],
  animations: [
    trigger('statsAnimation', fadeInOutView)
  ]
})
export class StatsComponent implements OnInit, AfterViewInit {
  @Input() statsIsVisible: boolean = false
  charts: Chart[]

  constructor(
    @Inject(ENVIRONMENT) env
  ) {
    console.log('StatsComponent::constructor', env)
  }

  ngOnInit() {
    this.createCharts()
  }

  ngAfterViewInit() {
    this.statsIsVisible = true
    console.debug('StatsComponent::ngAfterViewInit', {
      statsIsVisible: this.statsIsVisible
    })
  }

  createCharts() {
    this.charts = [{
        type: 'Bar',
        data: data['Bar']
      }, {
        type: 'Line',
        data: data['Line']
      }, {
        type: 'Line',
        data: data['Line2']
      }, {
        type: 'Line',
        data: data['Scatter'],
        options: {
          showLine: false,
          axisX: {
            labelInterpolationFnc: function(value: number, index: number): string {
              return index % 13 === 0 ? `W${value}` : null
            }
          }
        },
        responsiveOptions: [
          ['screen and (min-width: 640px)', {
            axisX: {
              labelInterpolationFnc: function(value: number, index: number): string {
                return index % 4 === 0 ? `W${value}` : null
              }
            }
          }]
        ]
      }, {
        type: 'Line',
        data: data['LineWithArea'],
        options: {
          low: 0,
          showArea: true
        }
      }, {
        type: 'Bar',
        data: data['Bi-PolarBar'],
        options: {
          high: 10,
          low: -10,
          axisX: {
            labelInterpolationFnc: function(value: number, index: number): number {
              return index % 2 === 0 ? value : null
            }
          }
        }
      }, {
        type: 'Bar',
        data: data['DistributedSeries'],
        options: {
          distributeSeries: true
        }
      }, {
        type: 'Pie',
        data: data['Pie'],
        options: {
          donut: true,
          donutWidth: 60,
          startAngle: 270,
          total: 200,
          showLabel: false
        }
      }, {
        type: 'Pie',
        data: {
          'series': [
            20,
            10,
            30,
            40
          ]
        },
        options: {
          donut: true,
          showLabel: false
        }
      }
    ]
  }
}
