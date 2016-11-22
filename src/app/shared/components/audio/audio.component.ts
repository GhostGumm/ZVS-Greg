import { Component, Input, HostBinding, OnInit, OnChanges, OnDestroy, trigger } from '@angular/core'
import { Animations } from '../../../utils/utils.animation'

import { ConversationViewInterface } from '../../../services/conversation'
import { RtcService, RtcInterface, RtcClass } from '../../../services/rtc'
import { UserService } from '../../../services/user'

@Component({
  selector: 'zp-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  providers: [ UserService, RtcService ],
  animations: [
    trigger('routeAnimation', Animations.swipeOutDownView)
  ]
})
export class AudioComponent implements OnChanges, OnDestroy, OnInit {
  @Input() conversation: ConversationViewInterface
  group: boolean = false
  audios: RtcInterface[] = []

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
    private userService: UserService,
    private rtcService: RtcService
  ) {
  }

  ngOnInit() {
    console.debug('AudioComponent::ngOnInit')
  }

  ngOnChanges(changes) {
    console.debug('AudioComponent::ngOnChanges', {
      conversation: this.conversation,
      changes
    })
    // Mock Purpose
    if (changes.conversation.currentValue) {
      this.rtcService.startRtc({ video:false }).then((data) => {
        const { stream, source } = data
        this.initAudio(stream, source)
        console.debug('AudioComponent::startRtc:success',{ data })
      }).catch((error) => {
        console.debug('AudioComponent::startRtc:error',{ error })
      })
    }
  }

  initAudio(stream?, source?) {
    const { users } = this.conversation
    console.debug('AudioComponent::initVideo', { stream, source })
    // Mock Purpose
    for (let user of users) {
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
    this.rtcService.destroy()
    console.debug('AudioComponent::ngOnDestroy')
  }
}
