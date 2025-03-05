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

const Template: StoryFn<{ currentPath: string }> = (args) => <WriteButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentPath: '/sell-inquiry',
};

export const BuyInquiry = Template.bind({});
BuyInquiry.args = {
  currentPath: '/buy-inquiry',
};

export const RentalInquiry = Template.bind({});
RentalInquiry.args = {
  currentPath: '/rental-inquiry',
};