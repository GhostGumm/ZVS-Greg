import { Component, HostBinding, AfterViewInit, OnChanges, OnInit, Input, trigger } from '@angular/core'
import { Router } from '@angular/router'
import { Animations } from '../../../utils/utils.animation'

class LoginModel {
  public firstname: string = ''
  public lastname: string = ''
  public email: string = ''
}

@Component({
  selector: 'zp-login',
  templateUrl: './login.view.html',
  providers: [],
  animations: [
    trigger('formAnimation', Animations.slideUpDown()),
    trigger('routeAnimation', Animations.fadeInOutView())
  ]
})
export class LoginViewComponent implements OnInit, OnChanges, AfterViewInit {

  model: LoginModel

  @Input() formIsVisible: boolean = false

  constructor(
    private router: Router,
  ) {
    this.model = new LoginModel()
  }

  @HostBinding('class.flex-centered')

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
