// src/stories/ProductInfo.stories.js

import React from 'react';
import { ProductInfo } from '../components/ProductInfo'; // 경로는 컴포넌트 파일의 위치에 맞게 조정하세요

export default {
  title: "Components/ProductInfo",  // 스토리북에서 보여질 컴포넌트 이름
  component: ProductInfo,  // 컴포넌트 설정
};

const Template = (args) => <ProductInfo {...args} />;

export const Default = Template.bind({});

Default.args = {
  // 필요한 prop을 여기에 추가하거나 기본값을 설정할 수 있습니다.
};
