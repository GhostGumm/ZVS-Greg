import { NgModule, ModuleWithProviders } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'
import { ChartistComponent } from 'angular2-chartist'

import { SharedRoutingModule } from './shared-routing.module'

import { ZetaPushModule } from '../zetapush/zetapush.module'

import { OrganizationDialogComponent } from './components/organization/organization.component'

import { COMPONENTS } from './components'
import { LAYOUTS } from './layouts'

import { AuthenticationService } from './authentication.service'
import { SERVICES as DATA_SERVICES } from '../services/'

import { ScrollGlueDirective } from '../utils'
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload'

const CORE_MODULES = [ CommonModule, BrowserModule, FormsModule, HttpModule ]
const DIRECTIVES = [ ScrollGlueDirective, FileDropDirective, FileSelectDirective, ChartistComponent]
const SERVICES = [ AuthenticationService, ...DATA_SERVICES ]

@NgModule({
  declarations: [ ...COMPONENTS, ...LAYOUTS, ...DIRECTIVES ],
  entryComponents: [ OrganizationDialogComponent ],
  exports: [ ...COMPONENTS, ...LAYOUTS, ...CORE_MODULES, MaterialModule, ZetaPushModule ],
  imports: [ ...CORE_MODULES, MaterialModule.forRoot(), SharedRoutingModule, ZetaPushModule ],
  providers: [ AuthenticationService ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ ...SERVICES, ChartistComponent ]
    }
  }
 }
