import { Component, HostBinding, Input, AfterViewInit, OnDestroy, OnInit, trigger } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { fadeInOutView, slideUpDown } from '../../../utils/utils.animation'
import { ApiUser } from '../../../zetapush/api'

@Component({
  selector: 'zp-confirm',
  templateUrl: './confirm-view.component.html',
  providers: [],
  animations: [
    trigger('formAnimation', slideUpDown),
    trigger('routeAnimation', fadeInOutView)
  ]
})
export class ConfirmViewComponent implements AfterViewInit, OnDestroy, OnInit {

  private subscriptions: Array<Subscription> = []
  private errors: Error[] = []
  private token: string = ''
  private password: string = ''
  private confirmation: string = ''

  @Input() formIsVisible: boolean = false

  @HostBinding('class') classes = 'flex-centered flex-height'
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiUser
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe((params) => {
      console.debug('ConfirmViewComponent::params', params)
      this.token = params['token']
    }))
  }

  ngAfterViewInit() {
    this.formIsVisible = true

    console.log('ngAfterViewInit', this)
  }

  ngOnDestroy() {
    console.debug('ConfirmViewComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  onSubmit() {
    console.debug('ConfirmViewComponent::onSubmit', {
      password: this.password,
      confirmation: this.confirmation
    })

    this.api.confirmUserPassword({
      password: this.password,
      token: this.token
    }).then(
      (result) => this.onResetUserPasswordByLogin(result),
      (errors) => this.errors = errors
    )
  }

  onResetUserPasswordByLogin({ password, token }: { password: string, token: string }) {
    this.router.navigate(['/login'])
  }

}
