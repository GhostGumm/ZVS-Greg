import { Component, HostBinding, AfterViewInit, OnChanges, OnInit, Input, trigger } from '@angular/core'
import { Router } from '@angular/router'
import { Animations } from '../../../utils/utils.animation'

class LoginModel {
  public firstname: string = 'John'
  public lastname: string = 'Doe'
  public email: string = 'john.doe@yopmail.com'
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
export class LoginViewComponent implements OnInit, OnChanges, AfterViewInit {

  model: LoginModel

  @Input() formIsVisible: boolean = false

  @HostBinding('class') classes = 'flex-centered flex-height'

  constructor(
    private router: Router
  ) {
    this.model = new LoginModel()
  }

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
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
      model: this.model
    })
    this.router.navigate(['/dashboard'])
  }

}
