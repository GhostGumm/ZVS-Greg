import { Routes } from '@angular/router'

// Services
import { AuthenticationService } from '../../services/services.authentication'

// Views
import { DashboardViewComponent } from './dashboard.view'
import { ContextViewComponent } from '../context/context.view'

// Components
import { StatsComponent } from '../../components/stats/stats.component'
import { MessagesComponent } from '../../components/messages/messages.component'

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardViewComponent,
    canActivate: [AuthenticationService],
    children: [
      {
        path: '',
        redirectTo: 'stats',
        pathMatch: 'full'
      },
      {
        path: 'stats',
        component: StatsComponent
      },
      {
        path: 'context/:id',
        component: ContextViewComponent
      },
      {
        path: 'messages/:id',
        component: MessagesComponent
      }
    ]
  }
]
