import { Directive, ElementRef, OnInit, AfterContentInit, OnDestroy, HostListener } from '@angular/core'
import { Subject } from 'rxjs/Subject'

@Directive({
    selector: '[zpScrollGlue]'
})

export class ScrollGlueDirective implements OnInit, AfterContentInit, OnDestroy {
    public el: any
    public isTop: any = new Subject()
    public isLocked: boolean = true
    private _observer: any
    private _oldScrollHeight: number = 0
    private observerConfig = {
      attributes: false,
      childList: true,
      characterData: false
    }

    constructor(private _el: ElementRef) {
      this.el = _el.nativeElement
      // To Improve
      this.isTop = new Subject()
    }

    ngOnInit() {
    }

    @HostListener('scroll')
    onScroll() {
      const scrollTop = this.el.scrollTop
      console.debug('ScrollGlueDirective::onScroll', { scrollTop })
      if (scrollTop === 0) {
        this.isTop.next()
      }
    }

    ngAfterContentInit() {
      this.el.scrollTop = this.el.scrollHeight

      // create an observer instance
      this._observer = new MutationObserver((mutations) => {
        console.debug('ScrollGlueDirective::MutationObserver', {
          scrollHeight: this.el.scrollHeight,
          scrollTop: this.el.scrollTop,
          isLocked: this.isLocked
        })
        if ( this.isLocked ) {
          this.el.scrollTop = this.el.scrollHeight
          setTimeout(() => {
            this._oldScrollHeight = this.el.scrollHeight
            this.el.scrollTop = this.el.scrollHeight
          }, 250)
        }
      })

      let target = this.el

      // pass in the target node, as well as the observer options
      this._observer.observe(target, this.observerConfig)

      console.debug('ScrollGlueDirective::ngAfterContentInit', {
        el: this.el,
        observer: this._observer
      })
    }

    ngOnDestroy() {
      /**
       * To Fix
       */
      if (this._observer) {
        this._observer.disconnect()
      }
    }
}
