import { Component, HostBinding, AfterViewInit, Input, trigger } from '@angular/core'
import { Router } from '@angular/router'
import { fadeInOutView, slideUpDown } from '../../../utils/utils.animation'
import { ZetaPushConnection } from '../../../zetapush'

class Credentials {
  public login: string = ''
  public password: string = ''
}

@Component({
  selector: 'zp-login',
  templateUrl: './login-view.component.html',
  providers: [],
  animations: [
    trigger('formAnimation', slideUpDown),
    trigger('routeAnimation', fadeInOutView)
  ]
})
export class LoginViewComponent implements AfterViewInit {

  credentials: Credentials
  error: string
  handlers: Array<any> = []

  @Input() formIsVisible: boolean = false

  @HostBinding('class') classes = 'flex-centered flex-height'
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
    private router: Router,
    private connection: ZetaPushConnection
  ) {
    this.credentials = new Credentials()
  }

  ngAfterViewInit() {
    this.formIsVisible = true
  }

  onSubmit() {
    console.debug('LoginViewComponent::onSubmit', {
      credentials: this.credentials
    })
    this.error = ''
    this.connection
        .connect(this.credentials)
        .then((result) => this.onConnectionSuccess(result), () => this.onConnectionError())
  }

  onConnectionSuccess(result) {
    console.debug('LoginViewComponent::onConnectionSuccess', { result })
    this.router.navigate(['/authenticated/home'])
  }

  onConnectionError() {
    console.debug('LoginViewComponent::onConnectionError')
    this.error = 'ERROR__USER_UNKNOWN'
  }

}
