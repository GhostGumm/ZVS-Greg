import { AvatarComponent } from './avatar/avatar.component'
import { NavigationComponent } from './navigation/navigation.component'
import { ProfileComponent } from './profile/profile.component'
import { SidenavComponent } from './sidenav/sidenav.component'
import { UserListComponent } from './list/user.list.component'
import { UsernameComponent } from './username/username.component'
import { MessagesComponent } from './messages/messages.component'
import { VideoComponent } from './video/video.component'
import { AudioComponent } from './audio/audio.component'

export const COMPONENTS = [
  AvatarComponent,
  NavigationComponent,
  ProfileComponent,
  SidenavComponent,
  UserListComponent,
  UsernameComponent,
  MessagesComponent,
  VideoComponent,
  AudioComponent
]


import { MessageService } from './messages/message.service'
import { VideoService } from './video/video.service'

export const COMPONENTS_SERVICES = [
  MessageService,
  VideoService
]
