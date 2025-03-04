import { Meta, StoryObj } from "@storybook/react";
import BoardCard from "../components/BoardCard";

// 기본 article 데이터
const defaultArticle = {
  id: 1,
  title: "Example Article Title",
  author: { name: "John Doe", avatar: "https://avatar.iran.liara.run/public" },
  date: "2025-02-27",
  views: 123,
  tag: "Technology",
  locked: false, // 기본적으로 잠금 해제 상태
};

const meta = {
  title: "Components/BoardCard",
  component: BoardCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    article: defaultArticle, // 기본 article 값
    highlighted: false,
    tagVisible: true,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    fontSize: "1rem",
    authorAvatarSize: 40,
    viewsCountColor: "text.secondary",
  },
  argTypes: {
    article: {
      control: false, // article 객체는 컨트롤 비활성화
    },
    highlighted: { control: "boolean" },
    tagVisible: { control: "boolean" },
    backgroundColor: { control: "color" },
    borderColor: { control: "color" },
    fontSize: { control: "text" },
    authorAvatarSize: { control: "number" },
    viewsCountColor: { control: "color" },
    onUnlock: { action: "unlocked" }, // onUnlock 동작 로깅
  },
} satisfies Meta<typeof BoardCard>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 스토리: 잠금 없는 일반적인 게시글
export const Default: Story = {
  args: {
    article: {
      ...defaultArticle,
      locked: false, // 잠금 해제 상태
    },
    highlighted: false,
    tagVisible: true,
  },
};

// 잠긴 게시글: 잠금 아이콘과 모달 테스트
export const Locked: Story = {
  args: {
    article: {
      ...defaultArticle,
      id: 2,
      title: "Locked Article Title",
      locked: true, // 잠금 상태
    },
    highlighted: false,
    tagVisible: true,
    onUnlock: (id, password) => console.log(`Unlocked ID: ${id}, Password: ${password}`),
  },
};

// 매니저 스타일: 배경색이 있는 게시글
export const Manager: Story = {
  args: {
    article: {
      ...defaultArticle,
      locked: false, // 잠금 해제 상태
    },
    highlighted: false,
    tagVisible: true,
    backgroundColor: "#d3dbe4",
  },
};

// 강조된 게시글: 하이라이트 스타일 테스트
export const HighlightedCard: Story = {
  args: {
    article: {
      ...defaultArticle,
      locked: false, // 잠금 해제 상태
    },
    highlighted: true,
  },
};

// 잠긴 강조된 게시글: 잠금 + 하이라이트 조합 테스트
export const LockedHighlighted: Story = {
  args: {
    article: {
      ...defaultArticle,
      id: 3,
      title: "Locked & Highlighted Article",
      locked: true, // 잠금 상태
    },
    highlighted: true,
    tagVisible: true,
    onUnlock: (id, password) => console.log(`Unlocked ID: ${id}, Password: ${password}`),
  },
};