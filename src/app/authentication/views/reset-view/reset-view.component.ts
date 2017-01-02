import { Component, HostBinding, Input, AfterViewInit, trigger } from '@angular/core'
import { Router } from '@angular/router'
import { fadeInOutView, slideUpDown } from '../../../utils/utils.animation'
import { ApiUser } from '../../../zetapush/api'

interface Error {
  code: string
  location: string
  message: string
}

@Component({
  selector: 'zp-reset',
  templateUrl: './reset-view.component.html',
  providers: [],
  animations: [
    trigger('formAnimation', slideUpDown),
    trigger('routeAnimation', fadeInOutView)
  ]
})
export class ResetViewComponent implements AfterViewInit {

  login: string = ''
  errors: Error[] = []

  @Input() formIsVisible: boolean = false

  @HostBinding('class') classes = 'flex-centered flex-height'
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
    private router: Router,
    private api: ApiUser
  ) {}

  ngAfterViewInit() {
    this.formIsVisible = true
  }

  onSubmit() {
    console.debug('ResetViewComponent::onSubmit', {
      login: this.login
    })
    this.api
        .resetUserPasswordByLogin({ login: this.login })
        .then(
          (result) => this.onResetUserPasswordByLogin(result),
          (errors: Error[]) => this.errors = errors
        )
  }

  onResetUserPasswordByLogin({ user }) {
    console.debug('RegisterView::onResetUserPasswordByLogin', { user })
    // window.open(`http://yopmail.com/${user.email}`)
    this.router.navigate(['/login'])
  }

}
