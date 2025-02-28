import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export const parameters = {
  docs: {
    source: {
      state: 'open',
    }
  }
}

export default preview;