import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthenticationService } from '../shared/authentication.service'

import { ContextViewComponent } from './views'

export const contextRoutes: any = {
  path: 'context/:id',
  component: ContextViewComponent,
  canActivate: [AuthenticationService]
}

const routes: Routes = [contextRoutes]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class ContextRoutingModule {}
