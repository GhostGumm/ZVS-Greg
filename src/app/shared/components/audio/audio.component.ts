import { Component, HostBinding, OnInit, OnDestroy, trigger } from '@angular/core'
import { Animations } from '../../../utils/utils.animation'

import { VideoInterface, VideoClass } from '../video/video.interface'
import { ApiUserService, User } from '../../../services/'
import { VideoService } from '../video/video.service'

@Component({
  selector: 'zp-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  providers: [ ApiUserService, VideoService ],
  animations: [
    trigger('routeAnimation', Animations.swipeOutDownView())
  ]
})
export class AudioComponent implements OnInit, OnDestroy {
  users: User[]
  group:boolean = false
  audios: VideoInterface[] = []

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
    private userService: ApiUserService,
    private videoService: VideoService
  ) {
  }

  ngOnInit() {
    console.debug('VideoComponent::ngOnInit')

    this.videoService.startVideo().then((data) => {
      const { stream, source } = data
      // Mock Purpose        
        this.getUsers().then(() => {
          this.initVideo(stream, source)
        })
      //
      console.debug('VideoComponent::startVideo:success',{ data })
    }).catch((error) => {
      console.debug('VideoComponent::startVideo:error',{ error })
    })
  }

  getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.userService.getAllUsers()
      .then(users => {
        console.debug('VideoComponent::getUsers', { users })
        this.users = users
        resolve(this.users)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  // Mock Purpose
    switchLayout() {
      this.group = !this.group
    }

    updateVideo(add) {
      if (add) {
        this.audios.push(new VideoClass({
          id:`${this.audios.length + 1}`,
          user:this.users[this.audios.length + 1]
        }))
      }
      else {
        this.audios.pop()
      }
      this.checkLayout()
    }
  //

  initVideo(stream?, source?) {
    console.debug('VideoComponent::initVideo', { stream, source })
    // Mock Purpose
      for (let user of this.users) { 
        this.audios.push(new VideoClass({
          id:user.id,
          user  
        }))
      }
      this.audios[0].focus = true
      this.audios[0].source = source
    //
    this.checkLayout()
  }

  checkLayout() {
    if (this.audios.length > 2) {
      this.group = true
    }
    else {
      this.group = false
    }
  }

  ngOnDestroy() {
    this.videoService.destroy()
    console.debug('VideoComponent::ngOnDestroy')
  }
}
