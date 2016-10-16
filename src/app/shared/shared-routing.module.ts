import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ScrollGlueDirective } from '../utils/utils.scroll'

const routes: Routes = []

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  // declarations: [ScrollGlueDirective],
  exports: [ RouterModule ]
})
export class SharedRoutingModule {}
