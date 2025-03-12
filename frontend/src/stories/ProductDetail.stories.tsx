import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ProductDetail } from '../components/ProductDetail';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof ProductDetail> = {
  title: 'Components/ProductDetail',
  component: ProductDetail,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `**ProductDetail**  
          ## 기본 사용 예시  
          이 컴포넌트는 상품의 상세 정보를 표시하며, 구매하기, 장바구니 추가, 대여 문의 등의 기능을 제공합니다.  
          관리자 모드에서는 이미지 업로드 기능을 추가로 제공합니다.  

          - **buyLink** (string): 구매하기 버튼 클릭 시 이동할 링크.  
          - **cartLink** (string): 장바구니 버튼 클릭 시 이동할 링크.  
          - **inquiryLink** (string): 문의하기 버튼 클릭 시 이동할 링크.  
          - **isAdmin** (boolean): 관리자 모드 여부를 설정합니다.`,
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    product: {
      control: 'object',
      description: '상품 정보를 담은 객체입니다.',
      defaultValue: {
        id: '1',
        name: '빈티지 카메라',
        price: 150000,
        quantity: 1,
        shipping: 3000,
        imageSrc: '/image/imsi.jpg',
      },
    },
    title: { control: 'text', description: '상품 제목을 설정합니다.' },
    description: { control: 'text', description: '상품에 대한 설명을 설정합니다.' },
    buttonBackgroundColor: { control: 'color', description: '버튼 배경색을 설정합니다.' },
    buyLink: { control: 'text', description: '구매하기 버튼 클릭 시 이동할 링크' },
    cartLink: { control: 'text', description: '장바구니 버튼 클릭 시 이동할 링크' },
    inquiryLink: { control: 'text', description: '문의하기 버튼 클릭 시 이동할 링크' },
    isAdmin: { control: 'boolean', description: '관리자 모드 여부를 설정합니다.', defaultValue: false },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: {
      id: '1',
      name: '빈티지 카메라',
      price: 150000,
      quantity: 1,
      shipping: 3000,
      imageSrc: '/image/imsi.jpg',
    },
    title: '빈티지 카메라',
    description: '클래식한 디자인의 빈티지 카메라입니다.',
    buttonBackgroundColor: 'none',
    buyLink: 'https://example.com/buy',
    cartLink: 'https://example.com/cart',
    inquiryLink: 'https://example.com/inquiry',
    isAdmin: false,
  },
};

export const AdminMode: Story = {
  args: {
    product: {
      id: '1',
      name: '빈티지 카메라',
      price: 150000,
      quantity: 1,
      shipping: 3000,
      imageSrc: '/image/imsi.jpg',
    },
    title: '빈티지 카메라',
    description: '클래식한 디자인의 빈티지 카메라입니다.',
    buttonBackgroundColor: 'none',
    buyLink: 'https://example.com/buy',
    cartLink: 'https://example.com/cart',
    inquiryLink: 'https://example.com/inquiry',
    isAdmin: true,
  },
};