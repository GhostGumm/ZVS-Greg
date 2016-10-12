import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppRoutingModule {}
