import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { ZetaPushConnection } from '../zetapush/core'

@Injectable()
export class AuthenticationService implements CanActivate {
  constructor(private connection: ZetaPushConnection) {}

  isAuthenticated(): boolean {
    return this.connection.isAuthenticated()
  }

  canActivate(): boolean {
    console.debug('AuthenticationService::canActivate', this.isAuthenticated())
    return this.isAuthenticated()
  }

}
