import { Meta, StoryFn } from "@storybook/react";
import ProductCard, { ProductProps } from "../components/ProductCard";


export default {
  title: "Components/ProductCard",
  component: ProductCard,
  argTypes: {
    width: { control: "number", defaultValue: 250 },
    height: { control: "number", defaultValue: 300 },
  },
} as Meta;

const Template: StoryFn<ProductProps> = (args) => <ProductCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  product: {
    image: "https://placehold.co/200x200",
    name: "Sample Product",
    price: "10000",
  },
  width: 250,
  height: 350,
};

export const SmallCard = Template.bind({});
SmallCard.args = {
  product: {
    image: "https://placehold.co/150x150",
    name: "Small Product",
    price: "5000",
  },
  width: 200,
  height: 300,
};

export const LargeCard = Template.bind({});
LargeCard.args = {
  product: {
    image: "https://placehold.co/250x250",
    name: "Large Product",
    price: "15000",
  },
  width: 300,
  height: 400,
};
