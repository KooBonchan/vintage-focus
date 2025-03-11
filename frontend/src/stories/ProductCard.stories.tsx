// ProductCard.stories.tsx
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from 'react-router-dom';
import ProductCard from "../components/ProductCard";
import { ProductResponse } from '@/types/response';

const defaultProduct:ProductResponse = {
  id: 1,
  code: 'sp',
  productImages: ["https://placehold.co/200x200",],
  productName: "Sample Product",
  consumerPrice: 100000,
  sellingPrice: 10000,
  company: "Sample Manufacturer",
  condition: "MINT",
  
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
    condition: ,
  },
  argTypes: {
    condition: ,
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
      productName: "Small Product",
      sellingPrice: "5000",
      manufacturer: "Small Manufacturer",
      condition: "2025",
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
      productName: "Large Product",
      sellingPrice: "15000",
      manufacturer: "Large Manufacturer",
      condition: "2025",
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