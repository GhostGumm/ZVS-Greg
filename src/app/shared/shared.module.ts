import { NgModule,ModuleWithProviders } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'

import { SharedRoutingModule } from './shared-routing.module'

import { ZetaPushModule } from '../zetapush/zetapush.module'

import { COMPONENTS, COMPONENTS_SERVICES } from './components'
import { LAYOUTS } from './layouts'

import { AuthenticationService } from './authentication.service'
import { ApiUserService } from '../services/'

import { ScrollGlueDirective } from '../utils/utils.scroll'

const CORE_MODULES = [ CommonModule, BrowserModule, FormsModule, HttpModule ]

@NgModule({
  declarations: [ ...COMPONENTS, ...LAYOUTS, ScrollGlueDirective ],
  exports: [ ...COMPONENTS, ...LAYOUTS, ...CORE_MODULES, MaterialModule, ZetaPushModule ],
  imports: [ ...CORE_MODULES, MaterialModule.forRoot(), SharedRoutingModule, ZetaPushModule ],
  providers: [ AuthenticationService, ...COMPONENTS_SERVICES ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ AuthenticationService, ApiUserService, ...COMPONENTS_SERVICES ]
    }
  }
 }
