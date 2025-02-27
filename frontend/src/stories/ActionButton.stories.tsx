import { Meta, StoryFn } from '@storybook/react';
import ActionButton from '../components/ActionButton';

export default {
  title: 'Components/ActionButton',
  component: ActionButton,
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    backgroundColor: { control: 'color' },
    borderColor: { control: 'color' },
    borderRadius: { control: 'number' },
    onClick: { action: 'clicked' },
    content: { control: 'text' },
    fontColor: { control: 'color' },
    borderWidth: { control: 'number' }, // 테두리 두께 추가
    borderStyle: { control: 'select', options: ['solid', 'dashed', 'dotted'] }, // 테두리 스타일 추가
  },
} as Meta;

const Template: StoryFn = (args) => <ActionButton {...args}>{args.content ?? 'Button'}</ActionButton>;

// 플러스 액션 버튼 스토리
export const PlusButton = Template.bind({});
PlusButton.args = {
  width: 35,
  height: 35,
  backgroundColor: '#ffffff',
  borderColor: '#445366',
  borderRadius: 50,  // 원형
  content: '+',
  fontColor: '#445366', // 폰트 색상 지정
  borderWidth: 2, // 테두리 두께 지정
  borderStyle: 'solid', // 테두리 스타일 지정
};

// 마이너스 액션 버튼 스토리
export const MinusButton = Template.bind({});
MinusButton.args = {
  width: 35,
  height: 35,
  backgroundColor: '#ffffff',
  borderColor: '#445366',
  borderRadius: 50,  // 원형
  content: '-',
  fontColor: '#445366', // 폰트 색상 지정
  borderWidth: 2, // 테두리 두께 지정
  borderStyle: 'solid', // 테두리 스타일 지정
};
