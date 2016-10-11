
import { Routes, RouterModule } from '@angular/router'

import { LoginView } from './views/authentication/login/login.view'
import { RegisterView } from './views/authentication/register/register.view'
import { DashboardView } from './views/dashboard/dashboard.view'
import { ContextView } from './views/context/context.view'
import { MessagesComponent } from './components/messages/messages.component'

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginView
  },
  {
    path: 'register',
    component: RegisterView
  },
  {
    path: 'dashboard',
    component: DashboardView,
    children:[
      { 
        path: '', 
        redirectTo: 'context/1', 
        pathMatch: 'full'
      },
      {
        path: 'context/:id',
        component: ContextView
      },
      {
        path: 'messages/:id',
        component: MessagesComponent
      }
    ]  
  }
]