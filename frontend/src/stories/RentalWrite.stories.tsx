import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import RentalWrite from "../components/RentalWrite"; // 경로가 올바른지 확인하세요
import { BrowserRouter } from "react-router-dom";

// Meta 객체 정의
const meta: Meta<typeof RentalWrite> = {
  title: "Components/RentalWrite",
  component: RentalWrite,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "RentalWrite는 사용자가 대여 문의를 작성하고 제출할 수 있는 폼 컴포넌트입니다. 날짜, 시간, 위치 선택 및 공개/비공개 설정을 포함합니다.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "게시글 제목",
      defaultValue: "",
    },
    price: {
      control: "text",
      description: "상품 가격",
      defaultValue: "",
    },
    content: {
      control: "text",
      description: "문의 내용",
      defaultValue: "",
    },
    isPublic: {
      control: "boolean",
      description: "공개/비공개 설정",
      defaultValue: true,
    },
    password: {
      control: "text",
      description: "비공개 시 사용할 비밀번호 (4자리 숫자)",
      defaultValue: "",
    },
    buttonColor: {
      control: "color",
      description: "버튼 배경색",
      defaultValue: "#445366",
    },
    backgroundColor: {
      control: "color",
      description: "컨테이너 배경색",
      defaultValue: "transparent",
    },
    textColor: {
      control: "color",
      description: "텍스트 색상",
      defaultValue: "#000000",
    },
    link: {
      control: "text",
      description: "제출 버튼 클릭 시 이동할 경로",
      defaultValue: "",
    },
    onSubmit: { action: "submitted" }, // handleSubmit 호출 시 액션 로깅
  },
};

export default meta;

// 템플릿 정의
const Template: StoryFn<typeof RentalWrite> = (args) => <RentalWrite {...args} />;

// 기본 스토리
export const Default = Template.bind({});
Default.args = {
  title: "",
  price: "",
  content: "",
  isPublic: true,
  password: "",
  buttonColor: "#445366",
  backgroundColor: "transparent",
  textColor: "#000000",
  link: "",
};
Default.storyName = "기본 상태";
Default.parameters = {
  docs: {
    description: {
      story: "RentalWrite 컴포넌트의 기본 상태입니다. 모든 필드가 비어 있으며, 사용자가 직접 입력할 수 있습니다.",
    },
  },
};

// 데이터가 채워진 상태
export const FilledForm = Template.bind({});
FilledForm.args = {
  title: "카메라 대여 문의",
  price: "50000",
  content: "카메라를 3일간 대여하고 싶습니다. 가능한가요?",
  isPublic: true,
  password: "",
  buttonColor: "#445366",
  backgroundColor: "transparent",
  textColor: "#000000",
  link: "",
};
FilledForm.storyName = "데이터 입력 상태";
FilledForm.parameters = {
  docs: {
    description: {
      story: "RentalWrite 컴포넌트에 샘플 데이터가 입력된 상태입니다. 제목, 가격, 내용 등이 채워져 있습니다.",
    },
  },
};

// 비공개 설정 및 비밀번호 입력 상태
export const PrivateWithPassword = Template.bind({});
PrivateWithPassword.args = {
  title: "비밀 대여 문의",
  price: "75000",
  content: "비공개로 문의드립니다. 자세한 내용은 연락 부탁드려요.",
  isPublic: false,
  password: "1234",
  buttonColor: "#445366",
  backgroundColor: "#f0f0f0",
  textColor: "#000000",
  link: "",
};
PrivateWithPassword.storyName = "비공개 설정";
PrivateWithPassword.parameters = {
  docs: {
    description: {
      story: "공개/비공개 스위치가 비공개로 설정되고, 비밀번호 입력 필드가 표시된 상태입니다.",
    },
  },
};
