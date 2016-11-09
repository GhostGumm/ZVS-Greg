
export interface UserInterface {
  id: string
  login: string

  firstname?: string
  lastname?: string
  online?: boolean
  avatar?: string
  metadata?: any
}

export class UserClass implements UserInterface {
  id
  firstname
  lastname
  login
  online = false
  avatar = './assets/zetalk_logo.png'
  metadata = {}

  constructor(
    parameters: {
      id: string
      login: string

      firstname?: string
      lastname?: string
      online?: boolean
      avatar?: string
      metadata?: any
    }
  ) {
      this.id = parameters.id
      this.login = parameters.login

      if (parameters.firstname) {
        this.firstname = parameters.firstname
      }
      if (parameters.lastname) {
        this.lastname = parameters.lastname
      }
      if (parameters.online) {
        this.online = parameters.online
      }
      if (parameters.avatar) {
        this.avatar = parameters.avatar
      }
      if (parameters.metadata) {
        this.metadata = parameters.metadata
      }
  }
}