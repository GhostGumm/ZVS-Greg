import { Routes } from '@angular/router'

import { LoginViewComponent } from './login/login.view'
import { RegisterViewComponent } from './register/register.view'

export const authenticationRoutes: Routes = [
  {
    path: 'login',
    component: LoginViewComponent
  },
  {
    path: 'register',
    component: RegisterViewComponent
  }
]
