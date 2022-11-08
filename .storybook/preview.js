import { addParameters } from '@storybook/react'

addParameters({
  stylesheetToggle: {
    stylesheets: [
      {
        id: 't-color-accent-blue',
        title: 'Blue',
        url: 'http://localhost:3001/assets/main-styles.css',
      },
      {
        id: 't-color-accent-green',
        title: 'Green',
        url: 'http://localhost:3001/assets/main-styles.css',
      },
      {
        id: 'blue',
        title: 'Blue',
        url: 'stylesheets/blue.css',
      },
    ],
  },
});
