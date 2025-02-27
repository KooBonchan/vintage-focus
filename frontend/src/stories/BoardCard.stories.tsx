import React from "react";
import { Meta, Story } from "@storybook/react";
import BoardCard, { BoardCardProps } from "../components/BoardCard"; // 컴포넌트 경로 맞추기

// 스토리북 메타데이터
export default {
  title: "Components/BoardCard", // 스토리북의 그룹명 및 컴포넌트명
  component: BoardCard,
} as Meta;

// 샘플 Article 데이터
const sampleArticle = {
  id: 1,
  title: "보안 업데이트 안내",
  authors: [{ name: "홍길동", avatar: "https://example.com/avatar.jpg" }],
  date: "2025-02-25",
  views: 1200,
  tag: "보안",
};

// 기본 스토리
const Template: Story<BoardCardProps> = (args) => <BoardCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  article: sampleArticle, // 샘플 데이터를 Default 스토리로 전달
};
