import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthenticationService } from '../shared/authentication.service'

import { ConversationViewComponent } from './views'

export const conversationRoutes: any = {
  path: 'conversation/:id',
  component: ConversationViewComponent
  // children: [
  //   { path: 'messages' },
  //   { path: 'video' }
  // ]
}

const routes: Routes = [conversationRoutes]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})

export class ConversationRoutingModule {}
