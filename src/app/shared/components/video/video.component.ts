import { Component, HostBinding, OnInit, trigger } from '@angular/core'
import { Animations } from '../../../utils/utils.animation'

import { VideoInterface, VideoClass } from './video.interface'
import { ApiUserService, User } from '../../../services/'
// import { VideoService } from './video.service'

export const randomId = () => {
  return Math.random().toString(36).substring(7)
}

@Component({
  selector: 'zp-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  providers: [ ApiUserService ],
  animations: [
    trigger('routeAnimation', Animations.swipeOutDownView())
  ]
})
export class VideoComponent implements OnInit {
  users: User[]
  group:boolean = false
  videos: VideoInterface[] = []

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(private userService: ApiUserService) {
  }

  switchLayout() {
    this.group = !this.group
  }

  updateVideo(add) {
    console.warn(add)
    if (add) {
      this.videos.push(new VideoClass({
        id:`${randomId()}`
      }))
    }
    else {
      this.videos.pop()
    }
    this.checkLayout()
  }

  ngOnInit() {
    console.debug('VideoComponent::ngOnInit')
    this.getUsers()
  }

  getUsers() {
    this.userService.getAllUsers().then(users => {
      console.debug('VideoComponent::getUsers', { users })
      this.users = users
      this.initVideo()
    })
  }

  initVideo() {
    // Mock Purpose
      for (let user of this.users) { 
        console.warn(user)
        this.videos.push(new VideoClass({ id:user.id }))
      }
      this.videos[0].focus = true
      this.checkLayout()
    //
  }

  checkLayout() {
    if (this.videos.length > 2) {
      this.group = true
    }
    else {
      this.group =false
    }
  }
}
