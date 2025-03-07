// ProductCard.stories.tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ProductCard, { ProductCardProps } from "../components/ProductCard";
import { BrowserRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';

const defaultProduct = {
  image: "https://placehold.co/200x200",
  name: "Sample Product",
  price: "10000",
  manufacturer: "Sample Manufacturer",
  year: "2025",
  id: "1",
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
    height: 360,
    Link: "https://example.com/inquiry", // 기본 문의하기 링크 설정
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 250,
    height: 360,
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  play: async ({ canvasElement }) => {
    console.log("Navigating to: /product/1");
    action("Navigated to")("/product/1");
  },
};

export const SmallCard: Story = {
  args: {
    product: {
      image: "https://placehold.co/150x150",
      name: "Small Product",
      price: "5000",
      manufacturer: "Small Manufacturer",
      year: "2025",
      id: "2",
    },
    width: 200,
    height: 310,
    Link: "https://example.com/small-inquiry", // 다른 문의하기 링크 설정
  },
  play: async ({ canvasElement }) => {
    console.log("Navigating to: /product/2");
    action("Navigated to")("/product/2");
  },
};

export const LargeCard: Story = {
  args: {
    product: {
      image: "https://placehold.co/250x250",
      name: "Large Product",
      price: "15000",
      manufacturer: "Large Manufacturer",
      year: "2025",
      id: "3",
    },
    width: 300,
    height: 410,
    Link: "https://example.com/large-inquiry", // 또 다른 문의하기 링크 설정
  },
  play: async ({ canvasElement }) => {
    console.log("Navigating to: /product/3");
    action("Navigated to")("/product/3");
  },
};