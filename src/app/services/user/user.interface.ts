export interface UserInterface {
  id: string
  login: string

  email?: string
  firstname?: string
  lastname?: string
  online?: boolean
  avatar?: string
  metadata?: any
}

export class UserClass implements UserInterface {
  id
  login

  email
  firstname
  lastname
  online = false
  avatar = './assets/zetalk_logo.png'
  metadata = {}

  constructor(parameters: UserInterface) {
    Object.assign(this, parameters)
  }
}
