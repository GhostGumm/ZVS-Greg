import { Injectable } from '@angular/core'

import { User } from './user.interface'
import { USERS } from './user.mock'

@Injectable()
export class ApiUserService {
  getHeroes(): Promise<User[]> {
    return Promise.resolve(USERS)
  }
}
