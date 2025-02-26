import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductCard from '../components/ProductCard'; // 경로를 실제 위치에 맞게 수정

export default {
  title: 'Components/ProductCard', // Storybook에서 컴포넌트 카테고리와 이름
  component: ProductCard, // 사용할 컴포넌트
} as ComponentMeta<typeof ProductCard>;

// Template: ProductCard의 기본 모양을 만들고 args로 다양한 상태를 관리
const Template: ComponentStory<typeof ProductCard> = (args) => <ProductCard {...args} />;

// 기본 ProductCard 스토리
export const Default = Template.bind({});
Default.args = {
  product: {
    image: 'https://placehold.co/250x250', // 예시 이미지
    name: '빈티지 카메라',
    price: '120,000',
  },
};

// 다른 예시를 추가할 수 있습니다 (옵션으로 추가)
export const Discounted = Template.bind({});
Discounted.args = {
  product: {
    image: 'https://placehold.co/250x250',
    name: '액션 카메라',
    price: '80,000', // 할인된 가격
  },
};
