import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import BoardCard, { BoardCardProps } from "../components/BoardCard";
import { fn } from "@storybook/test";

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
    article: defaultArticle,
  }
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
    article: {
      ...defaultArticle,
      locked: true,  // 잠금 아이콘을 보이게 하는 부분
    },
  },
};


export const HighlightedCard: Story = {
  args: {
    highlighted: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    article: defaultArticle,
    iconVisible: false,
  },
};

export const WithoutTag: Story = {
  args: {
    article: defaultArticle,
    tagVisible: false,
  },
};

export const CustomBackgroundColor: Story = {
  args: {
    article: defaultArticle,
    backgroundColor: "#f0f8ff", // 배경 색상 변경
  },
};

export const CustomBorderColor: Story = {
  args: {
    article: defaultArticle,
    borderColor: "#ff5733", // 테두리 색상 변경
  },
};

export const CustomFontSize: Story = {
  args: {
    article: defaultArticle,
    fontSize: "1.5rem", // 폰트 크기 변경
  },
};

export const CustomAvatarSize: Story = {
  args: {
    article: defaultArticle,
    authorAvatarSize: 50, // 아바타 크기 변경
  },
};

export const CustomViewsCountColor: Story = {
  args: {
    article: defaultArticle,
    viewsCountColor: "#ff5733", // 조회수 색상 변경
  },
};
