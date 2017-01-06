import { Component, HostBinding, AfterViewInit, Input, trigger } from '@angular/core'
import { Router } from '@angular/router'
import { fadeInOutView, slideUpDown } from '../../../utils/utils.animation'
import { ApiUser } from '../../../zetapush/api'

class RegisterModel {
  public login: string = ''
  public password: string = ''
  public email: string = ''
  public firstname: string = ''
  public lastname: string = ''
}

@Component({
  selector: 'zp-register',
  templateUrl: './register-view.component.html',
  providers: [],
  animations: [
    trigger('formAnimation', slideUpDown),
    trigger('routeAnimation', fadeInOutView)
  ]
})
export class RegisterViewComponent implements AfterViewInit {

  model: RegisterModel
  error: string

  @Input() formIsVisible: boolean = false

  @HostBinding('class') classes = 'flex-centered flex-height'
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
    private router: Router,
    private api: ApiUser
  ) {
    this.model = new RegisterModel()
  }

  ngAfterViewInit() {
    this.formIsVisible = true
  }

  onSubmit() {
    console.debug('RegisterViewComponent::onSubmit', {
      model: this.model
    })
    this.error = ''
    this.api
        .createUser(this.model)
        .then((result) => this.onCreateUserSuccess(result), (errors) => this.onCreateUserError(errors[0]))
  }

  onCreateUserSuccess({ user }) {
    console.debug('RegisterViewComponent::onCreate', { user })
    // window.open(`http://yopmail.com/${user.email}`)
    this.router.navigate(['/login'])
  }

  onCreateUserError(error) {
    console.debug('RegisterViewComponent::onError', { error })
    this.error = error.code
  }

}
