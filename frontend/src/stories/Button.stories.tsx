import { Meta, StoryObj } from '@storybook/react';
import Button from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: "Click",
    size: "small"
  },
};

export const Colored: Story = {
  args: {
    label: "Submit",
    size: "medium",
    backgroundColor: "primary", // 또는 "secondary", "success", "error" 등 Material UI 색상 테마 사용 가능
    color: "white", // 텍스트 색상
  },
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: '#f0f0f0' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
};