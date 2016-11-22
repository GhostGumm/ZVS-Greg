import { Component, Input, HostBinding, OnInit, OnChanges, OnDestroy, trigger } from '@angular/core'
import { Animations } from '../../../utils/utils.animation'

import { ConversationViewInterface } from '../../../services/conversation'
import { RtcService, RtcInterface, RtcClass } from '../../../services/rtc'
import { UserService } from '../../../services/user'

@Component({
  selector: 'zp-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  providers: [ UserService, RtcService ],
  animations: [
    trigger('routeAnimation', Animations.swipeOutDownView)
  ]
})
export class VideoComponent implements OnInit, OnChanges, OnDestroy {
  @Input() conversation: ConversationViewInterface
  group:boolean = false
  videos: RtcInterface[] = []

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
    private userService: UserService,
    private rtcService: RtcService
  ) {
  }

  ngOnInit() {
    console.debug('VideoComponent::ngOnInit')
  }

  ngOnChanges(changes) {
    console.debug('VideoComponent::ngOnChanges', {
      conversation: this.conversation,
      changes
    })
    // Mock Purpose
    if (changes.conversation.currentValue) {
      this.rtcService.startRtc().then((data) => {
        const { stream, source } = data
        // Mock Purpose
          this.initVideo(stream, source)
        //
        console.debug('VideoComponent::startVideo:success',{ data })
      }).catch((error) => {
        console.debug('VideoComponent::startVideo:error',{ error })
      })
    }
  }

  initVideo(stream?, source?) {
    const { users } = this.conversation
    console.debug('VideoComponent::initVideo', { stream, source })
    // Mock Purpose
    for (let user of users) {
      this.videos.push(new RtcClass({
        id:user.id,
        user
      }))
    }
    this.videos[0].focus = true
    this.videos[0].source = source
    //
    this.checkLayout()
  }

  checkLayout() {
    if (this.videos.length > 2) {
      this.group = true
    }
    else {
      this.group = false
    }
  }

  ngOnDestroy() {
    this.rtcService.destroy()
    console.debug('VideoComponent::ngOnDestroy')
  }


  // Mock Purpose
  switchLayout() {
    this.group = !this.group
  }

  updateVideo(add) {
    if (add) {
      this.videos.push(new RtcClass({
        id:`${this.videos.length + 1}`,
        user:this.conversation.users[this.videos.length + 1]
      }))
    }
    else {
      this.videos.pop()
    }
    this.checkLayout()
  }
  //
}
