import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import BoardCard, { BoardCardProps } from "../components/BoardCard";

// 기본 article 데이터를 설정
const defaultArticle = {
  id: 1,
  title: "Example Article Title",
  author: { name: "John Doe", avatar: "https://avatar.iran.liara.run/public" },
  date: "2025-02-27",
  views: 123,
  tag: "Technology",
};

const meta: Meta<typeof BoardCard> = {
  title: "Components/BoardCard",
  component: BoardCard,
  argTypes: {
    article: {
      control: "object",
      defaultValue: defaultArticle,
    },
    highlighted: { control: "boolean", defaultValue: false },
    iconVisible: { control: "boolean", defaultValue: true },
    tagVisible: { control: "boolean", defaultValue: true },
    backgroundColor: { control: "color", defaultValue: "#fff" },
    borderColor: { control: "color", defaultValue: "#ddd" },
    fontSize: { control: "text", defaultValue: "1rem" },
    authorAvatarSize: { control: "number", defaultValue: 40 },
    viewsCountColor: { control: "color", defaultValue: "text.secondary" },
  },
};

export default meta;

type Story = StoryObj<typeof BoardCard>;

// 스토리 객체들을 StoryObj 형식으로 설정
export const Default: Story = {
  args: {
    article: defaultArticle,
  },
};

export const HighlightedCard: Story = {
  args: {
    article: defaultArticle,
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
