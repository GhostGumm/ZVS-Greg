import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'
// Routing Module
import { AppRoutingModule } from './app-routing.module'
// Services
import { AuthenticationService } from './services/services.authentication'
// Components
import { RootComponent } from './root.component'
import { ChartistComponent } from 'angular2-chartist'
// Views
import { LoginViewComponent } from './views/authentication/login/login.view'
import { RegisterViewComponent } from './views/authentication/register/register.view'
import { DashboardViewComponent } from './views/dashboard/dashboard.view'
import { ContextViewComponent } from './views/context/context.view'
// Component
import { NavigationComponent } from './components/navigation/navigation.component'
import { SidenavComponent } from './components/sidenav/sidenav.component'
import { MessagesComponent } from './components/messages/messages.component'
import { ProfileComponent } from './components/profile/profile.component'
import { StatsComponent } from './components/stats/stats.component';
import { UsernameComponent } from './components/profile/username/username.component';
import { AvatarComponent } from './components/profile/avatar/avatar.component'

@NgModule({
  declarations: [
    RootComponent,
    LoginViewComponent,
    RegisterViewComponent,
    DashboardViewComponent,
    ContextViewComponent,

    ChartistComponent,

    NavigationComponent,
    SidenavComponent,
    MessagesComponent,
    ProfileComponent,
    StatsComponent,
    UsernameComponent,
    AvatarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
