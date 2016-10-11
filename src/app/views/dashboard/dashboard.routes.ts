import { Routes } from '@angular/router'

import { AuthenticationService } from '../../services/services.authentication'

import { DashboardView } from './dashboard.view'
import { ContextView } from '../context/context.view'
import { MessagesComponent } from '../../components/messages/messages.component'

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardView,
    canActivate: [AuthenticationService]
  },
  {
    path: 'dashboard/context/:id',
    component: ContextView
  },
  {
    path: 'dashboard/messages/:id',
    component: MessagesComponent
  }
]