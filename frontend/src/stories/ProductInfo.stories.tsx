import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ProductInfo } from '../components/ProductInfo';

const meta: Meta<typeof ProductInfo> = {
  title: 'Components/ProductInfo',
  component: ProductInfo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
          **ProductInfo** ## 기본 사용 예시

          ## Props
          - **title** (string): 상품 제목. 기본값은 \`어쩌구 저쩌구\`입니다.
          - **price** (string): 상품 가격. 기본값은 \`1,000,000원\`입니다.
          - **description** (string): 상품에 대한 설명. 기본값은 \`내용을 짧게 적어주세요\`입니다.
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: '상품 제목을 설정합니다.' },
    price: { control: 'text', description: '상품 가격을 설정합니다.' },
    description: { control: 'text', description: '상품에 대한 설명을 설정합니다.' },
    buttonBackgroundColor: { control: 'color', description: '버튼 배경색을 설정합니다.' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '어쩌구 저쩌구',
    price: '1,000,000원',
    description: '내용을 짧게 적어주세요',
  },
};

export const Colored: Story = {
  args: {
    title: '특별한 상품',
    price: '500,000원',
    description: '색상이 추가된 상품 정보입니다.',
    buttonBackgroundColor: '#445366', // 버튼 배경색 변경
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