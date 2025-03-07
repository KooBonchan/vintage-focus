import React from 'react';
import WriteButton from '../components/WriteButton'; // WriteButton 컴포넌트 경로
import { MemoryRouter } from 'react-router-dom';
import { StoryFn, Meta } from '@storybook/react';

export default {
  title: 'Components/WriteButton',
  component: WriteButton,
  tags: ['autodocs'], // 오토독스 활성화
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/sell-inquiry']}>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: StoryFn<{ currentPath: string }> = (args) => {
  // 클릭 이벤트를 처리하는 함수 (이곳에서 경로 변경을 처리)
  const handleClick = (path: string) => {
    console.log(`Navigating to ${path}`);
    // 실제 navigate(path) 등을 사용하여 경로 변경 로직을 작성할 수 있습니다.
  };

  return <WriteButton {...args} onClick={handleClick} />;
};

export const Default = Template.bind({});
Default.args = {
  currentPath: '/sell-inquiry',
};

export const BuyInquiry = Template.bind({});
BuyInquiry.args = {
  currentPath: '/buy-inquiry',
};

