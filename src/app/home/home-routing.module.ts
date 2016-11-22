import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthenticationService } from '../shared/authentication.service'

import { HomeViewComponent } from './views'

export const homeRoutes: any = {
  path: 'home',
  component: HomeViewComponent,
  canActivate: [AuthenticationService]
}

const routes: Routes = [homeRoutes]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule {}
