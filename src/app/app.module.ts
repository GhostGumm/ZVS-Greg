import { NgModule } from '@angular/core'
// Application Modules
import { SharedModule } from './shared/shared.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { ContextModule } from './context/context.module'
import { ConversationModule } from './conversation/conversation.module'


import { AppRoutingModule } from './app-routing.module'
// Components
import { RootComponent } from './root.component'

@NgModule({
  declarations: [
    RootComponent,
  ],
  imports: [
    SharedModule,

    AuthenticationModule,
    DashboardModule,
    ContextModule,
    ConversationModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ RootComponent ]
})
export class AppModule { }
