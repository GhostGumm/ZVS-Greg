import { state, animate, transition, style } from '@angular/core'

export const Animations = {

  slideUpDown: ({ duration = '500ms', easingIn = 'ease-in-out', easingOut = 'ease-in-out' } = {}) => [
    state('true', style({
      transform: 'translateY(0)',
      opacity: 1
    })),
    state('false', style({
      transform: 'translateY(-50%)',
      opacity: 0
    })),
    transition(':enter, 0 => 1', [
      style({
        transform: 'translateY(-50%)',
         opacity: 0
      }),
      animate(`${duration} ${easingIn}`) // cubic-bezier(0.175, 0.885, 0.32, 1.275)
    ]),
    transition(':leave, 1 => 0', [
      animate(`${duration} ${easingOut}`, style({
        transform: 'translateY(50%)',
        opacity: 0
      }))
    ])
  ],

  fadeIn: ({ duration = '500ms', easingIn = 'ease-in-out', easingOut = 'ease-in-out' } = {}) => [
    state('true', style({
      opacity: 1
    })),
    state('false', style({
      opacity: 0
    })),
    transition('0 => 1', [
      animate(`${duration} ${easingIn}`, style({
        opacity: 1
      }))
    ]),
    transition('1 => 0', [
      animate(`${duration} ${easingIn}`, style({
        opacity: 0
      }))
    ]),
    transition(':enter', [
      animate(`${duration} ${easingIn}`, style({
        opacity: 1
      }))
    ]),
    transition(':leave', [
      animate(`${duration} ${easingOut}`, style({
        opacity: 0
      }))
    ])
  ],

  fadeInOutView: ({ duration = '500ms', easingIn = 'ease-in-out', easingOut = 'ease-in-out' } = {}) => [

    state('void', style({
      opacity: 0,
      display: 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    })),
    state('true', style({
      opacity: 1
    })),
    transition(':enter', [
      animate(`${duration} ${easingIn}`, style({
        opacity: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }))
    ]),
    transition(':leave', [
      animate(`${duration} ${easingOut}`, style({
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }))
    ])
  ],

  swipeOutDownView: ({ duration = '500ms', easingIn = 'ease-in-out', easingOut = 'ease-in-out' } = {}) => [

    state('true', style({
      position: 'absolute'
    })),
    state('false', style({
      position: 'absolute',
      display: 'none',
      opacity: 0
    })),
    transition('0 => 1', [
      animate(`${duration} ${easingIn}`, style({
        opacity: 1,
        position: 'absolute'
      }))
    ]),
    transition('1 => 0', [
      animate(`${duration} ${easingIn}`, style({
        opacity: 0,
        transform: 'translate3d(-10%, 0, 0)',
        position: 'absolute'
      }))
    ])
  ],
}
