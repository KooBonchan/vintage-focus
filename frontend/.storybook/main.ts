import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    // mdx 파일과 .stories.tsx/tsx 파일을 찾는 패턴
    "../src/**/*.mdx", 
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", 
  ],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        docs: false, // docs를 비활성화함
      },
    },
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // 파일 경로에서 자동으로 경로를 확장하여 타입스크립트 파일도 잘 인식하도록 설정
  typescript: {
    reactDocgen: 'react-docgen',
  },
};

export default config;
