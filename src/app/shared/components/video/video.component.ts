import { Component, HostBinding, OnInit, OnDestroy, trigger } from '@angular/core'
import { Animations } from '../../../utils/utils.animation'

import { VideoInterface, VideoClass } from './video.interface'
import { ApiUserService, User } from '../../../services/'
import { VideoService } from './video.service'

@Component({
  selector: 'zp-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  providers: [ ApiUserService, VideoService ],
  animations: [
    trigger('routeAnimation', Animations.swipeOutDownView())
  ]
})
export class VideoComponent implements OnInit, OnDestroy {
  users: User[]
  group:boolean = false
  videos: VideoInterface[] = []

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
        this.videos.push(new VideoClass({
          id:`${this.videos.length + 1}`,
          user:this.users[this.videos.length + 1]
        }))
      }
      else {
        this.videos.pop()
      }
      this.checkLayout()
    }
  //

  initVideo(stream?, source?) {
    console.debug('VideoComponent::initVideo', { stream, source })
    // Mock Purpose
      for (let user of this.users) { 
        this.videos.push(new VideoClass({
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
    this.videoService.destroy()
  }
}
