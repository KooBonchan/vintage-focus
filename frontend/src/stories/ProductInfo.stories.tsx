// src/stories/ProductInfo.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react'; // Meta와 StoryObj를 가져옵니다.
import { ProductInfo } from '../components/ProductInfo'; // 컴포넌트 파일의 경로를 설정합니다.

// Meta 설정 (컴포넌트의 메타데이터 정의)
const meta: Meta<typeof ProductInfo> = {
  title: 'Components/ProductInfo',  // 스토리북에서 보여질 컴포넌트의 이름
  component: ProductInfo,           // 이 스토리의 컴포넌트 설정
  tags: ['autodocs'],               // 자동 문서화 활성화
  parameters: {
    docs: {
      description: {
        component: `
          **ProductInfo** 
          
          ## 기본 사용 예시

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
  },
};

export default meta; // Meta 객체를 default로 export

type Story = StoryObj<typeof meta>; // Story 타입을 설정

// 기본 스토리 정의
export const Default: Story = {
  args: {
    title: '어쩌구 저쩌구', // 기본 상품 제목
    price: '1,000,000원',    // 기본 상품 가격
    description: '내용을 짧게 적어주세요', // 기본 상품 설명
  },
};
