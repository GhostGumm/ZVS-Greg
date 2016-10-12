import { CanActivate } from '@angular/router'

export class AuthenticationService implements CanActivate {
  constructor(
  ) {}

  isAuthenticated(token = true) {
    if (token === false) {
      // TODO : implement authent guard
    }
    console.debug('AuthenticationService::isAuthenticated', { token })
    return token
  }

  canActivate() {
    return this.isAuthenticated()
  }

}
