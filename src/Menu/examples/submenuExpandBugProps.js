export default {
  items: [
    {
      label: 'Back',
      secondaryLabel: 'Alt+Left Arrow'
    },
    {
      label: 'Forward',
      disabled: true,
      secondaryLabel: 'Alt+Right Arrow'
    },
    {
      label: 'Reload',
      secondaryLabel: 'Ctrl + R'
    },
    '-',
    {
      label: 'Save as...',
      secondaryLabel: 'Ctrl + S'
    },
    {
      label: 'Print...',
      secondaryLabel: 'Ctrl + P'
    },
    {
      label: 'Cast...'
    },
    {
      label: 'Translate to',
      items: [
        {
          label: 'English',
          name: 'en'
        },
        {
          label: 'French',
          name: 'fr'
        },
        {
          label: 'German',
          name: 'de'
        }
      ]
    },
    {
      label: 'Translate to',
      items: [
        {
          label: 'English',
          name: 'en'
        },
        {
          label: 'French',
          name: 'fr'
        },
        {
          label: 'German',
          name: 'de'
        }
      ]
    },
    '-',
    {
      label: 'View page source',
      secondaryLabel: 'Ctrl + U'
    },
    {
      label: 'Inspect',
      secondaryLabel: 'Ctrl + Shift + I'
    }
  ],
  theme: 'default',
  visible: true,
  enableAnimation: true,
  enableSelection: true,
  browserNativeSelectInputs: false,
  fadeDuration: 300,
  fadeTransitionFunction: 'ease',
  showSubMenuDelay: 0,
  hideSubMenuDelay: 0,
  constrainTo: true
};
