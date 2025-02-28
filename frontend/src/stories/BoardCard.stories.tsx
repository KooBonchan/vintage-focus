import { Meta, StoryObj } from "@storybook/react";
import BoardCard from "../components/BoardCard";

// 기본 article 데이터를 설정
const defaultArticle = {
  id: 1,
  title: "Example Article Title",
  author: { name: "John Doe", avatar: "https://avatar.iran.liara.run/public" },
  date: "2025-02-27",
  views: 123,
  tag: "Technology",
};

const meta = {
  title: "Components/BoardCard",
  component: BoardCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    // 기본 값은 설정 가능하지만, 컨트롤은 비활성화됨
    article: defaultArticle,
  },
  argTypes: {
    article: {
      control: false, // article 컨트롤 비활성화
    },
  },
} satisfies Meta<typeof BoardCard>;

export default meta;

type Story = StoryObj<typeof meta>;

// 스토리 객체들을 StoryObj 형식으로 설정
export const Default: Story = {
  args: {
    highlighted: false,
    iconVisible: true,
    tagVisible: true,
  },
};


// manager
export const manager: Story = {
  args: {
    highlighted: false,
    iconVisible: true,
    tagVisible: true,
    backgroundColor: '#d3dbe4',
  },
};


export const HighlightedCard: Story = {
  args: {
    highlighted: true,
  },
};
