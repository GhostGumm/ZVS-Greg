import { Component, Input, HostBinding, OnChanges, OnDestroy, trigger } from '@angular/core'
import { swipeOutDownView } from '../../../utils/utils.animation'

import { ConversationViewInterface } from '../../../services/conversation'
import { RtcService, RtcInterface, RtcClass } from '../../../services/rtc'

@Component({
  selector: 'zp-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  providers: [ RtcService ],
  animations: [
    trigger('routeAnimation', swipeOutDownView)
  ]
})
export class AudioComponent implements OnChanges, OnDestroy {
  @Input() conversation: ConversationViewInterface
  @Input() loading: boolean
  group: boolean = false
  audios: RtcInterface[] = []

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
    private rtcService: RtcService
  ) {
  }

  ngOnChanges(changes) {
    console.debug('AudioComponent::ngOnChanges', {
      conversation: this.conversation,
      changes
    })
    // Mock Purpose
    if (changes.conversation.currentValue) {
      this.rtcService.startRtc({ video: false }).then((data) => {
        const { stream, source } = data
        this.initAudio(stream, source)
        console.debug('AudioComponent::startRtc:success', { data })
      }).catch((error) => {
        console.debug('AudioComponent::startRtc:error', { error })
      })
    }
  }

  initAudio(stream?, source?) {
    const { users } = this.conversation
    console.debug('AudioComponent::initVideo', { stream, source })
    // Mock Purpose
    for (let user of users) {
      this.audios.push(new RtcClass({
        id: user.id,
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
