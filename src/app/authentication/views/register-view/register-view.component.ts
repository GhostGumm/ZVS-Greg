import { Component, HostBinding, AfterViewInit, OnChanges, OnInit, Input, trigger } from '@angular/core'
import { Router } from '@angular/router'
import { fadeInOutView, slideUpDown } from '../../../utils/utils.animation'
import { uuid } from '../../../utils/utils.string'
import { ApiUser } from '../../../zetapush/api'

const guid = uuid()

class RegisterModel {
  public login: string = `user-${guid}`
  public password: string = 'zetalk'
  public email: string = `zetalk.user.${guid}@yopmail.com`
  public firstname: string = `John-${guid}`
  public lastname: string = `Doe Von ${guid}`
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
export class RegisterViewComponent implements AfterViewInit, OnChanges, OnInit {

  model: RegisterModel

  @Input() formIsVisible: boolean = false

  @HostBinding('class') classes = 'flex-centered flex-height'

  constructor(
    private router: Router,
    private api: ApiUser
  ) {
    this.model = new RegisterModel()
  }

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  ngOnInit() {
    console.debug('RegisterView::ngOnInit', {
      formIsVisible: this.formIsVisible
    })
  }

  ngOnChanges() {
    console.debug('RegisterView::ngOnChanges', {
      formIsVisible: this.formIsVisible
    })
  }

  ngAfterViewInit() {
    this.formIsVisible = true
    console.debug('RegisterView::ngAfterViewInit', {
      formIsVisible: this.formIsVisible
    })
  }

  onSubmit() {
    console.debug('RegisterView::onSubmit', {
      model: this.model
    })
    this.api
        .createUser(this.model)
        .then((result) => this.onCreateUserSuccess(result), console.error)
  }

  onCreateUserSuccess({ user }) {
    console.debug('RegisterView::onCreate', { user })
    // window.open(`http://yopmail.com/${user.email}`)
    this.router.navigate(['/login'])
  }

}
