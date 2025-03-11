import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ProductDetail } from '../components/ProductDetail'; // 경로에 맞게 수정
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter 추가

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

          ## Props  
          - **product** (object): 상품 정보를 담은 객체  
            - **id** (string): 상품 ID  
            - **name** (string): 상품 이름  
            - **price** (number): 상품 가격  
            - **quantity** (number): 상품 수량  
            - **shipping** (number): 배송비  
            - **image** (string): 상품 이미지 URL  
          - **title** (string): 상품 제목. 기본값은 \`product.name\`을 사용합니다.  
          - **description** (string): 상품에 대한 설명.  
          - **buttonBackgroundColor** (string): 버튼 배경색.  
          - **buyLink** (string): 구매하기 버튼 클릭 시 이동할 링크.  
          - **cartLink** (string): 장바구니 버튼 클릭 시 이동할 링크.  
          - **inquiryLink** (string): 문의하기 버튼 클릭 시 이동할 링크.`,
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
        imageSrc: '/image/imsi.jpg', // 기본 이미지 경로',
      },
    },
    title: { control: 'text', description: '상품 제목을 설정합니다.' },
    description: { control: 'text', description: '상품에 대한 설명을 설정합니다.' },
    buttonBackgroundColor: { control: 'color', description: '버튼 배경색을 설정합니다.' },
    buyLink: { control: 'text', description: '구매하기 버튼 클릭 시 이동할 링크' },
    cartLink: { control: 'text', description: '장바구니 버튼 클릭 시 이동할 링크' },
    inquiryLink: { control: 'text', description: '문의하기 버튼 클릭 시 이동할 링크' },
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
      imageSrc: '/image/imsi.jpg', // 기본 이미지 경로,
    },
    title: '빈티지 카메라',
    description: '클래식한 디자인의 빈티지 카메라입니다.',
    buttonBackgroundColor: 'none',
    buyLink: 'https://example.com/buy',
    cartLink: 'https://example.com/cart',
    inquiryLink: 'https://example.com/inquiry',
  },
};

