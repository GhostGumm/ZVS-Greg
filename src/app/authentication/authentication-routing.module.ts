import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginViewComponent, RegisterViewComponent, ResetViewComponent, ConfirmViewComponent } from './views'

const routes: Routes = [
  { path: 'login', component: LoginViewComponent },
  { path: 'register', component: RegisterViewComponent },
  { path: 'password/reset', component: ResetViewComponent },
  { path: 'password/confirm/:token', component: ConfirmViewComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class AuthenticationRoutingModule {}
