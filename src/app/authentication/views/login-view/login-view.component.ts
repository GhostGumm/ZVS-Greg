import { Component, HostBinding, AfterViewInit, OnChanges, OnInit, Input, trigger } from '@angular/core'
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
export class LoginViewComponent implements AfterViewInit, OnChanges, OnInit {

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

  ngOnInit() {
    console.debug('LoginView::ngOnInit', {
      formIsVisible: this.formIsVisible
    })
  }

  ngOnChanges() {
    console.debug('LoginView::ngOnChanges', {
      formIsVisible: this.formIsVisible
    })
  }

  ngAfterViewInit() {
    this.formIsVisible = true
    console.debug('LoginView::ngAfterViewInit', {
      formIsVisible: this.formIsVisible
    })
  }

  onSubmit() {
    console.debug('LoginView::onSubmit', {
      credentials: this.credentials
    })
    this.connection
        .connect(this.credentials)
        .then(() => this.onConnectionSuccess(), () => this.onConnectionError())
  }

  onConnectionSuccess() {
    this.router.navigate(['/authenticated/home'])
  }

  onConnectionError() {
    this.error = 'Unable to connect'
  }

}
