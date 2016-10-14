import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthenticationService } from '../shared/authentication.service'

import { AuthenticatedLayoutComponent } from '../shared/layouts'

import { ConversationViewComponent } from './views'

import { MessagesComponent, VideoComponent } from './components'

export const conversationRoutes: any = {
  path: 'conversation/:id',
  component: ConversationViewComponent,
  canActivate: [AuthenticationService],
  children: [
    { path: 'messages', component: MessagesComponent },
    { path: 'video', component: VideoComponent }
  ]
}

const routes: Routes = [conversationRoutes]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class ConversationRoutingModule {}
