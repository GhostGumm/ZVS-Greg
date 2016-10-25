import { Component, HostBinding, AfterViewInit, OnChanges, OnInit, Input, trigger } from '@angular/core'
import { Router } from '@angular/router'
import { Animations } from '../../../utils/utils.animation'
import { ZetaPushConnection } from '../../../zetapush'

class Credentials {
  public login: string = 'yohan.letelier@yopmail.com'
  public password: string = 'lowtaux'
}

@Component({
  selector: 'zp-login',
  templateUrl: './login-view.component.html',
  providers: [],
  animations: [
    trigger('formAnimation', Animations.slideUpDown()),
    trigger('routeAnimation', Animations.fadeInOutView())
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
        .then(() => {
          this.router.navigate(['/dashboard'])
        }, () => {
          this.error = 'Unable to connect'
        })
  }

}
