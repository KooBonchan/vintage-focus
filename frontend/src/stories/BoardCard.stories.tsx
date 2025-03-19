import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import BoardCard, { BoardCardProps } from "../components/BoardCard"; // 경로는 프로젝트 구조에 맞게 수정
import { BrowserRouter } from "react-router-dom";
import { action } from "@storybook/addon-actions";
import { Star } from "@mui/icons-material"; // 아이콘 추가

const defaultArticle = {
  id: 1,
  title: "Sample Article",
  author: { name: "John Doe" },
  date: "2025-03-11T10:00:00",
  views: 123,
  tag: "sample",
  locked: false,
};

const meta = {
  title: "Components/BoardCard",
  component: BoardCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    article: defaultArticle,
    link: "/article/1", // 기본 링크
    onClick: () => console.log("Card clicked!"), // 기본 onClick 핸들러
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof BoardCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: defaultArticle,
    link: "/article/1",
    onClick: action("Card clicked"), // Storybook에서 클릭 이벤트 추적
  },
  play: async ({ canvasElement }) => {
    console.log("Navigating to: /article/1");
    action("Navigated to")("/article/1");
  },
};

export const LockedCard: Story = {
  args: {
    article: { ...defaultArticle, locked: true },
    link: "/article/1",
    onClick: action("Locked card clicked"), // 잠긴 카드 클릭 시 이벤트
  },
  play: async ({ canvasElement }) => {
    console.log("Locked card clicked");
    action("Modal opened")("Password modal triggered");
  },
};

export const ManagerMode: Story = {
  args: {
    article: defaultArticle,
    link: "/article/1",
    isManager: true,
    backgroundColor: "#445366", // 매니저 모드에서 배경색 변경 예시
    onClick: action("Manager mode card clicked"), // 매니저 모드 클릭 이벤트
  },
  play: async ({ canvasElement }) => {
    console.log("Navigating to: /article/1 in manager mode");
    action("Navigated to")("/article/1");
  },
  render: (args) => (
    <div
      style={{
        backgroundColor: args.backgroundColor,
        padding: 20,
        borderRadius: 10, // 라운드를 추가
        position: "relative", // 아이콘을 위해 위치 속성 추가
      }}
    >
      <BoardCard {...args} />
      {/* 매니저 모드에 아이콘 추가 */}
      {args.isManager && (
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <Star style={{ color: "white", fontSize: 30 }} />
        </div>
      )}
    </div>
  ),
};

// 하늘색 계열과 회색 카드 추가
export const SkyGrayCard: Story = {
  args: {
    article: defaultArticle,
    link: "/article/1",
    backgroundColor: "#c1d2dd", // 하늘색 계열 배경색
    onClick: action("Sky gray card clicked"), // 하늘색 카드 클릭 이벤트
  },
  play: async ({ canvasElement }) => {
    console.log("Navigating to: /article/1 in SkyGrayCard mode");
    action("Navigated to")("/article/1");
  },
  render: (args) => (
    <div
      style={{
        backgroundColor: args.backgroundColor,
        padding: 20,
        borderRadius: 10,
        position: "relative",
      }}
    >
      <BoardCard {...args} />
    </div>
  ),
};

export const GrayCard: Story = {
  args: {
    article: defaultArticle,
    link: "/article/1",
    backgroundColor: "#d9dceb", // 회색 배경색
    onClick: action("Gray card clicked"), // 회색 카드 클릭 이벤트
  },
  play: async ({ canvasElement }) => {
    console.log("Navigating to: /article/1 in GrayCard mode");
    action("Navigated to")("/article/1");
  },
  render: (args) => (
    <div
      style={{
        backgroundColor: args.backgroundColor,
        padding: 20,
        borderRadius: 10,
        position: "relative",
      }}
    >
      <BoardCard {...args} />
    </div>
  ),
};
