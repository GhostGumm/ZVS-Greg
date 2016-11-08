import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthenticationService } from '../shared/authentication.service'

import { DashboardViewComponent } from './views'

import { StatsComponent, MessagesComponent } from './components'

export const dashboardRoutes: any = {
  path: 'dashboard',
  component: DashboardViewComponent,
  canActivate: [AuthenticationService],
  children: [
    { path: '', redirectTo: 'stats', pathMatch: 'full' },
    { path: 'stats', component: StatsComponent },
    { path: 'messages', component: MessagesComponent }
  ]
}

const routes: Routes = [ dashboardRoutes ]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule {}
