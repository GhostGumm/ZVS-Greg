import { Directive, ElementRef, AfterContentInit, OnDestroy, HostListener } from '@angular/core'

@Directive({
    selector: '[zpScrollGlue]'
})

export class ScrollGlueDirective implements AfterContentInit, OnDestroy{
    public el: any
    public isLocked: boolean = true
    private _observer: any
    private _oldScrollHeight: number = 0

    constructor(private _el: ElementRef) {
      this.el = _el.nativeElement
    }

    @HostListener('scroll')
    onScroll() {
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
          this._oldScrollHeight = this.el.scrollHeight
          this.el.scrollTop = this.el.scrollHeight
        }
      })

      // configuration of the observer:
      let config = { childList: true, subtree: true }
      let target = this.el

      // pass in the target node, as well as the observer options
      this._observer.observe(target, config)

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