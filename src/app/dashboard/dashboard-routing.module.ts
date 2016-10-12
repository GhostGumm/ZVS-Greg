import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthenticationService } from '../shared/authentication.service'

import { AuthenticatedLayoutComponent } from '../shared/layouts'

import { MessagesComponent, StatsComponent } from './components'

const routes: Routes = [
  {
    path: 'dashboard',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthenticationService],
    children: [
      { path: '', redirectTo: 'stats', pathMatch: 'full' },
      { path: 'stats', component: StatsComponent },
      { path: 'messages/:id', component: MessagesComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule {}
