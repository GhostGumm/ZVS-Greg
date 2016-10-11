import { Component, HostBinding, AfterViewInit, OnChanges, Input, trigger } from '@angular/core'
import { Router } from '@angular/router'
import { Animations } from '../../../utils/utils.animation'

@Component({
  moduleId: module.id,
  selector: 'zp-login',
  templateUrl: './login.view.html',
  providers: [],
  host: {
    '[@routeAnimation]': "true"
  },
  animations: [
    trigger('formAnimation', Animations.slideUpDown()),
    trigger('routeAnimation', Animations.fadeInOutView())
  ]
})

export class LoginView implements OnChanges, AfterViewInit {

  constructor(
    private router: Router,
  ){}

  model:any={
    firstname:'',
    lastname:'',
    email:''
  }
  
  @Input() formIsVisible : boolean = false
  @HostBinding('class.flex-centered')

  ngOnInit() {
    console.debug('LoginView::ngOnInit', { formIsVisible:this.formIsVisible })
  }

  ngOnChanges() {
    console.debug('LoginView::ngOnChanges', { formIsVisible:this.formIsVisible })
  }

  ngAfterViewInit() {
    this.formIsVisible = true
    console.debug('LoginView::ngAfterViewInit', { formIsVisible:this.formIsVisible })   
  }

  onSubmit() {
    console.debug('LoginView::onSubmit', { model:this.model })
    this.router.navigate(['/dashboard'])
  }

}
