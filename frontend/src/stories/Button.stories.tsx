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
