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
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload'

const CORE_MODULES = [ CommonModule, BrowserModule, FormsModule, HttpModule ]
const DIRECTIVES = [ ScrollGlueDirective, FileDropDirective, FileSelectDirective]

@NgModule({
  declarations: [ ...COMPONENTS, ...LAYOUTS, ...DIRECTIVES ],
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
