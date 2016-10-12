import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { Router, Routes, RouterModule } from '@angular/router'

import { routes } from './app.routes'
import { AppComponent } from './app.component'
import { AuthenticationService } from './services/services.authentication'
// Views
import { LoginView } from './views/authentication/login/login.view'
import { RegisterView } from './views/authentication/register/register.view'
import { DashboardView } from './views/dashboard/dashboard.view'
import { ContextView } from './views/context/context.view'
// Component
import { NavigationComponent } from './components/navigation/navigation.component'
import { SidenavComponent } from './components/sidenav/sidenav.component'
import { MessagesComponent } from './components/messages/messages.component'

import { MaterialModule } from '@angular/material';
import { ProfileComponent } from './components/profile/profile.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginView,
    RegisterView,
    DashboardView,
    ContextView,

    NavigationComponent,
    SidenavComponent,
    MessagesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }