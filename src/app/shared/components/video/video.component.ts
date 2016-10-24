import { Component, HostBinding, OnInit, trigger } from '@angular/core'
import { Animations } from '../../../utils/utils.animation'

import { VideoInterface, VideoClass } from './video.interface'
// import { VideoService } from './video.service'


@Component({
  selector: 'zp-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  // providers: [ VideoService ],
  animations: [
    trigger('routeAnimation', Animations.swipeOutDownView())
  ]
})

export class VideoComponent implements OnInit {
  videos: VideoInterface[] = Array.from(new Array(4), () => new VideoClass({
    id: `${Math.round(Math.random() * 10)}`
  }))

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor() {}

  ngOnInit() {
    console.debug('VideoComponent::ngOnInit')
    // Mock Purpose
      for (let video of this.videos) {
        video.init()
      }
  }
}
