import { Component, Input, HostBinding, OnInit, OnDestroy, trigger } from '@angular/core'
import { Animations } from '../../../utils/utils.animation'

import { 
  RtcService, RtcInterface, RtcClass,
  ApiUserService, User
} from '../../../services/'

@Component({
  selector: 'zp-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  providers: [ ApiUserService, RtcService ],
  animations: [
    trigger('routeAnimation', Animations.swipeOutDownView())
  ]
})
export class AudioComponent implements OnInit, OnDestroy {
  @Input() users: User[]
  group:boolean = false
  audios: RtcInterface[] = []

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
    private userService: ApiUserService,
    private videoService: RtcService
  ) {
  }

  ngOnInit() {
    console.debug('AudioComponent::ngOnInit')

    this.videoService.startVideo().then((data) => {
      const { stream, source } = data
      // Mock Purpose        
        this.initAudio(stream, source)
      //
      console.debug('AudioComponent::startVideo:success',{ data })
    }).catch((error) => {
      console.debug('AudioComponent::startVideo:error',{ error })
    })
  }

  initAudio(stream?, source?) {
    console.debug('AudioComponent::initVideo', { stream, source })
    // Mock Purpose
      for (let user of this.users) { 
        this.audios.push(new RtcClass({
          id:user.id,
          user  
        }))
      }
      this.audios[0].focus = true
      this.audios[0].source = source
    //
  }

  ngOnDestroy() {
    this.videoService.destroy()
    console.debug('AudioComponent::ngOnDestroy')
  }
}
