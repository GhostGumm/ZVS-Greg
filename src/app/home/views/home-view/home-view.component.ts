import { Component, HostBinding, ViewChildren, ChangeDetectorRef, OnInit, AfterViewInit, trigger } from '@angular/core'
import { Animations } from '../../../utils/utils.animation'

import * as Chartist from 'chartist'
import { ChartType, ChartEvent } from 'angular2-chartist'

import { CARDS_TEMPLATE } from './home-view.template'

export interface Chart {
  type: ChartType
  data: Chartist.IChartistData
  options?: any
  responsiveOptions?: any
  events?: ChartEvent
}

@Component({
  selector: 'zp-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  providers: [],
  animations: [
    trigger('routeAnimation', Animations.fadeInOutView)
  ]
})
export class HomeViewComponent implements OnInit, AfterViewInit {

  public cards:any = CARDS_TEMPLATE

  @ViewChildren('chart') charts

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.fakeChartData()
  }

  fakeChartData() {
    setInterval(() => {
      this.charts._results.forEach((chart) => {
        let series = chart.data.series
        for(let serie in series) {
          if (chart.type == 'Pie') {
            series.splice(serie, 1, Math.round(Math.random()*2 + 8))
          }
        }
        chart.update(series)
      })
    }, 1000)
  }
}
