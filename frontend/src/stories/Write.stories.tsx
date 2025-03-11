import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import Write from "../components/Write";

const meta: Meta<typeof Write> = {
  title: "Components/Write",
  component: Write,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "이 컴포넌트는 대여 게시글을 작성하는 양식입니다. 제목, 가격, 내용, 공개 여부, 이미지 업로드 등을 입력할 수 있습니다. 비공개 설정 시 비밀번호를 요구할 수 있습니다.",
      },
    },
  },
  argTypes: {
    buttonColor: { control: "color", description: "버튼 색상을 변경할 수 있습니다." },
    backgroundColor: { control: "color", description: "배경 색상을 변경할 수 있습니다." },
    textColor: { control: "color", description: "텍스트 색상을 변경할 수 있습니다." },
    link: { control: "text", description: "버튼 클릭 시 이동할 URL을 설정할 수 있습니다." },
    title: { control: "text", description: "게시글 제목을 설정할 수 있습니다." },
    price: { control: "text", description: "상품 가격을 설정할 수 있습니다." },
    content: { control: "text", description: "게시글 내용을 설정할 수 있습니다." },
    isPublic: { control: "boolean", description: "게시글 공개 여부를 설정할 수 있습니다." },
    password: { control: "text", description: "비공개 설정 시 필요한 비밀번호를 설정할 수 있습니다." },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

// 기본적인 공개 게시글 예시
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
    link: "/rental-inquiry",
  },
  render: (args) => (
    <Write {...args} />
  ),
};

// 비공개 게시글 예시
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
    link: "/private-post",
  },
  render: (args) => (
    <Write {...args} />
  ),
};

// 이미지 첨부가 포함된 공개 게시글 예시
export const WithImage: Story = {
  args: {
    title: "이미지 포함 게시글",
    price: "1500",
    content: "이미지가 포함된 공개 게시글입니다.",
    isPublic: true,
    password: "",
    buttonColor: "#435265",
    backgroundColor: "#F8F8F8",
    textColor: "text.primary",
    link: "/rental-inquiry",
  },
  render: (args) => (
    <Write {...args} />
  ),
};