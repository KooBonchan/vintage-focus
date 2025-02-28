import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ActionButton, ButtonProps } from '../components/ActionButton';

/*
export default {
  title: 'Components/ActionButton',
  component: ActionButton,
  argTypes: {
    type: { control: 'select', options: ['p+', 'm-']},
    backgroundColor: { control: 'color' },
    borderColor: { control: 'color' },
    borderRadius: { control: 'number' },
    // onClick: { action: 'clicked' },
    // content: { control: 'text' },
    // fontColor: { control: 'color' },
    // borderWidth: { control: 'number' }, // 테두리 두께 추가
    // borderStyle: { control: 'select', options: ['solid', 'dashed', 'dotted'] }, // 테두리 스타일 추가
  },
  args: {
    type: 'm+',
    backgroundColor: '#ffffff',
  }
} as Meta;

*/

const meta: Meta<typeof ActionButton> = {
  title: 'Components/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['p+', 'm-']},
    backgroundColor: { control: 'color' },
    borderColor: { control: 'color' },
    // onClick: { action: 'clicked' },
    // content: { control: 'text' },
    // fontColor: { control: 'color' },
    // borderWidth: { control: 'number' }, // 테두리 두께 추가
    // borderStyle: { control: 'select', options: ['solid', 'dashed', 'dotted'] }, // 테두리 스타일 추가
  },
  args: {
    backgroundColor: '#ffffff',
  }
};

type Story = StoryObj<typeof ActionButton>;

export default meta;
export const PlusButton: Story = {
  args: {
    type: 'p+',
  }
};
export const MinusButton: Story = {
  args: {
    type: 'm-',
  }
};
