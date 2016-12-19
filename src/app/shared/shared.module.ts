import { NgModule, ModuleWithProviders } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'

import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload'
import { PdfViewerComponent } from 'ng2-pdf-viewer'

import { SharedRoutingModule } from './shared-routing.module'

import { ZetaPushModule } from '../zetapush/zetapush.module'

import { COMPONENTS, DIALOGS } from './components'
import { LAYOUTS } from './layouts'

import { AuthenticationService } from './authentication.service'
import {
  SERVICES as DATA_SERVICES,
  COMPONENTS as SERVICES_COMPONENTS
} from '../services/'


import { ScrollGlueDirective } from '../utils'

const CORE_MODULES = [ CommonModule, BrowserModule, FormsModule, HttpModule ]
const DIRECTIVES = [ ScrollGlueDirective, FileDropDirective, FileSelectDirective, PdfViewerComponent]
const SERVICES = [ AuthenticationService, ...DATA_SERVICES ]

@NgModule({
  declarations: [ ...COMPONENTS, ...LAYOUTS, ...DIRECTIVES, ...SERVICES_COMPONENTS ],
  entryComponents: [ ...DIALOGS, ...SERVICES_COMPONENTS ],
  exports: [ ...COMPONENTS, ...LAYOUTS, ...CORE_MODULES, MaterialModule, ZetaPushModule ],
  imports: [ ...CORE_MODULES, MaterialModule.forRoot(), SharedRoutingModule, ZetaPushModule ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ ...SERVICES ]
    }
  }
 }
