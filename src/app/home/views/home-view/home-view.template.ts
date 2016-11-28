

const CARDS_OPTIONS: any = [{
  showLabel: false
}]

export const CARDS_TEMPLATE: any = [
  {
    title: 'Users',
    content: '15',
    hint: 'Check new user here'
  },
  {
    title: 'Contacts',
    content: '8',
    hint: 'Check contact here'
  },
  {
    title: 'Context',
    content: '3',
    hint: 'Check context here'
  },
  {
    title: '',
    chart: {
      type: 'Pie',
      data: {
        series: [
          10,
          10,
          10
        ]
      },
      options: CARDS_OPTIONS[0]
    },
    actions: [{
      icon: 'settings',
    }, {
      icon: 'share'
    }]
  },
  {
    title: '',
    chart: {
      type: 'Pie',
      data: {
        series: [
          10,
          10,
          10
        ]
      },
      options: CARDS_OPTIONS[0]
    },
    actions: [{
      icon: 'settings',
    }, {
      icon: 'share'
    }]
  },
  {
    title: '',
    chart: {
      type: 'Line',
      class: 'ct-golden-section',
      data: {
        series: [
          [-54, -7, -5, -4, -1, 0, 4, 8, 15, 54, 158]
        ]
      },
      options: CARDS_OPTIONS[0]
    },
    actions: [{
      icon: 'settings',
    }, {
      icon: 'share'
    }]
  }
]
