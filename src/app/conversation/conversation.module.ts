import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

import { COMPONENTS } from './components'
import { VIEWS } from './views'

import { ConversationRoutingModule } from './conversation-routing.module'

import { MessagesComponent, VideoComponent } from './components'

@NgModule({
  declarations: [ ...COMPONENTS, ...VIEWS ],
  imports: [ SharedModule.forRoot(), ConversationRoutingModule ],
  providers: [ ]
})
export class ConversationModule { }
