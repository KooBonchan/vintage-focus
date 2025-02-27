import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Button from '../components/Button';

// Meta는 Storybook에서 컴포넌트의 정보를 제공합니다.
export default {
  title: 'Components/Button', // 스토리북에서 이 스토리가 보여질 경로
  component: Button,
  argTypes: {
    // 각 prop에 대한 설명을 추가할 수 있습니다.
    width: { control: 'number' },
    height: { control: 'number' },
    backgroundColor: { control: 'color' },
    borderColor: { control: 'color' },
    borderRadius: { control: 'number' },
    onClick: { action: 'clicked' }, // 클릭 이벤트를 Storybook에서 시각적으로 확인
    content: { control: 'text' },
  },
} as Meta;

// Default 스토리: 기본 버튼
const Template: StoryFn = (args) => <Button {...args}>{args.content ?? 'Button'}</Button>;

// 기본 버튼 스토리
export const Default = Template.bind({});
Default.args = {
  width: 66,
  height: 22,
  backgroundColor: '#445366',
  borderColor: '#ffffff',
  borderRadius: 10,
  content: 'Button',
};


// 작은 버튼 스토리
export const SmallButton = Template.bind({});
SmallButton.args = {
  width: 50,
  height: 22,
  backgroundColor: '#445366',
  borderColor: '#ffffff',
  borderRadius: 10,
  content: 'Button',
};


// 중간 버튼 스토리
export const MediumButton = Template.bind({});
MediumButton.args = {
  width: 100,
  height: 30,
  backgroundColor: '#445366',
  borderColor: '#ffffff',
  borderRadius: 10,
  content: 'Button',
};

// 큰 버튼 스토리
export const LargeButton = Template.bind({});
LargeButton.args = {
  width: 300,
  height: 35,
  backgroundColor: '#445366',
  borderColor: '#ffffff',
  borderRadius: 10,
  content: 'Button',
};