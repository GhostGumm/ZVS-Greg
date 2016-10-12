import { Component, HostBinding, AfterViewInit, OnChanges, OnInit, Input, trigger } from '@angular/core'
import { Router } from '@angular/router'
import { Animations } from '../../../utils/utils.animation'

class RegisterModel {
  public login: string = ''
  public password: string = ''
}

@Component({
  selector: 'zp-register',
  templateUrl: './register.view.html',
  providers: [],
  animations: [
    trigger('formAnimation', Animations.slideUpDown()),
    trigger('routeAnimation', Animations.fadeInOutView())
  ]
})
export class RegisterViewComponent implements AfterViewInit, OnChanges, OnInit {

  model: RegisterModel

  @Input() formIsVisible: boolean = false

  constructor(
    private router: Router,
  ) {
    this.model = new RegisterModel()
  }

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  @HostBinding('class.flex-centered')

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
    this.router.navigate(['/dashboard'])
  }

}
