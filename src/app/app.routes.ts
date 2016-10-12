
import { Routes } from '@angular/router'

import { authenticationRoutes } from './views/authentication/authentication.routes'
import { dashboardRoutes } from './views/dashboard/dashboard.routes'

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  ...dashboardRoutes
  ...authenticationRoutes,
]
