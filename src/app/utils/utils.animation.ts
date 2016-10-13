import { state, animate, transition, style } from '@angular/core'

export const Animations = {

  slideUpDown: ({ delay = '500ms', easingIn = 'ease-in-out', easingOut = 'ease-in-out' } = {}) => [
    state('true', style({transform: 'translateY(0)', opacity: 1})),
    transition(':enter', [
      style({transform: 'translateY(-50%)', opacity: 0}),
      animate(`${delay} ${easingIn}`) // cubic-bezier(0.175, 0.885, 0.32, 1.275)
    ]),
    transition(':leave', [
      animate(`${delay} ${easingOut}`, style({transform: 'translateY(50%)', opacity: 0}))
    ])
  ],

  fadeInOutView: ({ delay = '500ms', easingIn = 'ease-in-out', easingOut = 'ease-in-out' } = {}) => [
    state('true', style({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    })),
    transition(':enter', [
        animate(`${delay} ${easingIn}`, style({opacity: 1}))
    ]),
    transition(':leave', [
        animate(`${delay} ${easingOut}`, style({opacity: 0}))
    ])
  ]
}
