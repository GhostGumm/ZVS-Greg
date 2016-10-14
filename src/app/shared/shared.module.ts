import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'

import { SharedRoutingModule } from './shared-routing.module'

import { ZetaPushModule } from '../zetapush/zetapush.module'

import { COMPONENTS } from './components'
import { LAYOUTS } from './layouts'

import { AuthenticationService } from './authentication.service'
import { ApiUserService } from '../services/'

const CORE_MODULES = [ CommonModule, BrowserModule, FormsModule, HttpModule ]

@NgModule({
  declarations: [ ...COMPONENTS, ...LAYOUTS ],
  exports: [ ...CORE_MODULES, MaterialModule, ZetaPushModule ],
  imports: [ ...CORE_MODULES, MaterialModule.forRoot(), SharedRoutingModule, ZetaPushModule ],
  providers: [ AuthenticationService ]
})
export class SharedModule { }
