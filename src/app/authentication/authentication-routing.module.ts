import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginViewComponent, RegisterViewComponent } from './views'

const routes: Routes = [
  { path: 'login', component: LoginViewComponent },
  { path: 'register', component: RegisterViewComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class AuthenticationRoutingModule {}
