import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'zp-root',
  styles: [`
    :host,
    .Layout {
      display: flex;
      height: 100%;
      width: 100%;
    }
  `],
  template: '<section class="Layout" zp-connection-status><router-outlet></router-outlet></section>'
})
export class RootComponent {
  constructor(private router: Router) {}
}
