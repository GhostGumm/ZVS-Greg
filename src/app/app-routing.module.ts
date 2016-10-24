import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { AuthenticatedLayoutComponent } from './shared/layouts'

import { dashboardRoutes } from './dashboard/dashboard-routing.module'
import { conversationRoutes } from './conversation/conversation-routing.module'
import { contextRoutes } from './context/context-routing.module'

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full' },
  {
    path: 'authenticated',
    component: AuthenticatedLayoutComponent,
    children: [
      dashboardRoutes,
      conversationRoutes,
      contextRoutes
    ]
  }
]


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppRoutingModule {}
