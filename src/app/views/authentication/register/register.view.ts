import { Component, HostBinding, AfterViewInit, OnChanges, Input, trigger } from '@angular/core'
import { Router } from '@angular/router'
import { Animations } from '../../../utils/utils.animation'

@Component({
  selector: 'zp-register',
  templateUrl: './register.view.html',
  providers: [],
  host: {
    '[@routeAnimation]': "true"
  },
  animations: [
    trigger('formAnimation', Animations.slideUpDown()),
    trigger('routeAnimation', Animations.fadeInOutView())
  ]
})

export class RegisterView implements OnChanges, AfterViewInit {

  constructor(
    private router: Router,
  ){}

  model:any = {
    login:'',
    password:''
  }
  
  @Input() formIsVisible : boolean = false
  @HostBinding('class.flex-centered')

  ngOnInit() {
    console.debug('RegisterView::ngOnInit', { formIsVisible:this.formIsVisible })
  }

  ngOnChanges() {
    console.debug('RegisterView::ngOnChanges', { formIsVisible:this.formIsVisible })
  }

  ngAfterViewInit() {
    this.formIsVisible = true
    console.debug('RegisterView::ngAfterViewInit', { formIsVisible:this.formIsVisible })   
  }

  onSubmit() {
    console.debug('RegisterView::onSubmit', { model:this.model })
    this.router.navigate(['/dashboard'])
  }

}
