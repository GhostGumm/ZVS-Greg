import { Component, HostBinding, OnInit, trigger } from '@angular/core'
import { Animations } from '../../../utils/utils.animation'
import * as Chartist from 'chartist'
import { ChartType, ChartEvent } from 'angular2-chartist'

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
export class HomeViewComponent implements OnInit {

  public cards = [
    {
      title:'toto',
      subtitle:'tata',
      content:'hey !',
      chart:{
        type: 'Pie',
        data: {
          "series": [
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
      },
      actions:[{
        text:'like',
      },{
        text:'share'
      }]
    },
    {
      title:'toto',
      subtitle:'tata',
      content:'hey !',
      actions:[{
        text:'like',
      },{
        text:'share'
      }]
    },
    {
      title:'toto',
      subtitle:'tata',
      content:'hey !',
      actions:[{
        text:'like',
      },{
        text:'share'
      }]
    }
  ]

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor() {
  }

  ngOnInit() {
  }
}
