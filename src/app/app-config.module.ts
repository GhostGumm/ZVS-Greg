import { NgModule, OpaqueToken } from '@angular/core'

// Environment
import { environment } from '../environments/environment'

export const ENVIRONMENT = new OpaqueToken('environment')

@NgModule({
  providers: [
    { provide: ENVIRONMENT, useValue: environment }
  ]
})
export class AppConfigModule {}
