// Write.stories.tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom"; // 추가
import Write from "../components/Write";

const meta: Meta<typeof Write> = {
  title: "Components/Write",
  component: Write,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "이 컴포넌트는 대여 게시글을 작성하는 양식입니다. 제목, 가격, 내용, 공개 여부 등을 입력할 수 있습니다. 비공개 설정 시 비밀번호를 요구할 수 있습니다.",
      },
    },
  },
  argTypes: {
    buttonColor: { control: "color", description: "버튼 색상을 변경할 수 있습니다." },
    backgroundColor: { control: "color", description: "배경 색상을 변경할 수 있습니다." },
    textColor: { control: "color", description: "텍스트 색상을 변경할 수 있습니다." },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ], // 데코레이터 추가
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "제목",
    price: "1000",
    content: "내용",
    isPublic: true,
    password: "",
    buttonColor: "#435265",
    backgroundColor: "#F8F8F8",
    textColor: "text.primary",
  },
};

export const PublicPost: Story = {
  args: {
    isPublic: true,
    title: "공개 게시글",
    price: "1000",
    content: "이것은 공개 게시글입니다.",
    buttonColor: "#AA1F3E",
    backgroundColor: "#FFFFFF",
    textColor: "text.secondary",
  },
};

export const PrivatePost: Story = {
  args: {
    isPublic: false,
    title: "비공개 게시글",
    price: "2000",
    content: "이것은 비공개 게시글입니다. 비밀번호가 필요합니다.",
    password: "1234",
    buttonColor: "#D32F2F",
    backgroundColor: "#EEEEEE",
    textColor: "text.primary",
  },
};