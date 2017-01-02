import { NgModule } from '@angular/core'
// Application Modules
import { SharedModule } from './shared/shared.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { ContextModule } from './context/context.module'
import { ConversationModule } from './conversation/conversation.module'
import { HomeModule } from './home/home.module'
// App Routing
import { AppConfigModule } from './app-config.module'
import { AppRoutingModule } from './app-routing.module'
// Components
import { RootComponent } from './root.component'

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    SharedModule.forRoot(),

    AppConfigModule,
    AppRoutingModule,

    AuthenticationModule,
    DashboardModule,
    ContextModule,
    ConversationModule,
    HomeModule
  ],
  bootstrap: [ RootComponent ]
})
export class AppModule { }
