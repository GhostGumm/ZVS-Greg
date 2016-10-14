import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'zp-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    console.debug('VideoComponent::ngOnInit')
  }
}
