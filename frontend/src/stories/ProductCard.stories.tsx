// ProductCard.stories.tsx

import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ProductCard, { ProductCardProps } from "../components/ProductCard"; // 이제 정상적으로 default import

// 기본 상품 데이터 설정
const defaultProduct = {
  image: "https://placehold.co/200x200",
  name: "Sample Product",
  price: "10000",
  author: {
    name: "John Doe",
    avatar: "https://placehold.co/50x50",
  },
  tag: "Technology",
};

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    product: defaultProduct,
    width: 250,
    height: 300,
  },
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

// 스토리 객체들을 StoryObj 형식으로 설정
export const Default: Story = {
  args: {
    width: 250,
    height: 350,
  },
};

export const SmallCard: Story = {
  args: {
    product: {
      image: "https://placehold.co/150x150",
      name: "Small Product",
      price: "5000",
      author: {
        name: "Jane Doe",
        avatar: "https://placehold.co/50x50",
      },
      tag: "Lifestyle",
    },
    width: 200,
    height: 300,
  },
};

export const LargeCard: Story = {
  args: {
    product: {
      image: "https://placehold.co/250x250",
      name: "Large Product",
      price: "15000",
      author: {
        name: "Alice Smith",
        avatar: "https://placehold.co/50x50",
      },
      tag: "Business",
    },
    width: 300,
    height: 400,
  },
};

