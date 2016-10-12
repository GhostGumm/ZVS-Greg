import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'

import { authenticationRoutes } from './views/authentication/authentication.routes'
import { dashboardRoutes } from './views/dashboard/dashboard.routes'

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  ...dashboardRoutes,
  ...authenticationRoutes
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppRoutingModule {}
