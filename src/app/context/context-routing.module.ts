import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthenticationService } from '../shared/authentication.service'

import { AuthenticatedLayoutComponent } from '../shared/layouts'

import { ContextViewComponent } from './views'

const routes: Routes = [
  {
    path: 'context',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthenticationService],
    children: [
      { path: ':id', component: ContextViewComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class ContextRoutingModule {}
