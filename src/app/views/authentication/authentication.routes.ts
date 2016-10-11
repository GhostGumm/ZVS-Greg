import { Routes } from '@angular/router'

import { AuthenticationService } from '../../services/services.authentication'

import { LoginView } from './login/login.view'
import { RegisterView } from './register/register.view'

export const authenticationRoutes: Routes = [
  {
    path: 'login',
    component: LoginView
  },
  {
    path: 'register',
    component: RegisterView
  }
]