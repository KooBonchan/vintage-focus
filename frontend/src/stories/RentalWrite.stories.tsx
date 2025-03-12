import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import RentalWrite from "../components/RentalWrite"; // 경로가 올바른지 확인하세요
import { BrowserRouter } from "react-router-dom";

// Meta 객체 정의
const meta: Meta<typeof RentalWrite> = {
  title: "Components/RentalWrite",
  component: RentalWrite,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `**RentalWrite**  
          ## 기본 사용 예시  
          이 컴포넌트는 사용자가 대여 문의를 작성하고 제출할 수 있는 폼입니다.  
          대여에 관련된 필드들(성함, 전화번호, 대여날짜, 반납날짜, 희망 수령 지점, 공개/비공개 설정 등)을 입력하고, 제출 버튼을 통해 문의를 보낼 수 있습니다.  
          - **onSubmit** (function): 제출 버튼 클릭 시 호출되는 함수.`,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    name: { control: "text", description: "성함을 입력합니다." },
    phoneNumber: { control: "text", description: "전화번호를 입력합니다." },
    rentalDate: { control: "date", description: "대여 날짜를 입력합니다." },
    returnDate: { control: "date", description: "반납 날짜를 입력합니다." },
    pickupLocation: { control: "text", description: "희망 수령 지점을 입력합니다." },
    isPublic: { control: "boolean", description: "공개/비공개 여부를 설정합니다." },
    password: { control: "text", description: "비공개 시 사용할 비밀번호(4자리 숫자)" },
    buttonColor: { control: "color", description: "버튼 배경색을 설정합니다." },
    backgroundColor: { control: "color", description: "폼 배경색을 설정합니다." },
    textColor: { control: "color", description: "텍스트 색상을 설정합니다." },
    link: { control: "text", description: "제출 버튼 클릭 시 이동할 경로" },
    onSubmit: { action: "submitted", description: "제출 버튼 클릭 시 호출되는 함수" },
  },
};

export default meta;

// 템플릿 정의
const Template: StoryFn<typeof RentalWrite> = (args) => {
  const [rentalDate, setRentalDate] = useState(args.rentalDate);
  const [returnDate, setReturnDate] = useState(args.returnDate);

  // onChange 핸들러 정의
  const handleRentalDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRentalDate(e.target.value);
  };

  const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReturnDate(e.target.value);
  };

  return (
    <RentalWrite
      {...args}
      rentalDate={rentalDate}
      returnDate={returnDate}
      onRentalDateChange={handleRentalDateChange}
      onReturnDateChange={handleReturnDateChange}
    />
  );
};

// 기본 스토리
export const Default = Template.bind({});
Default.args = {
  name: "",
  phoneNumber: "",
  rentalDate: "2025-03-15", // 기본 날짜 값
  returnDate: "2025-03-20", // 기본 날짜 값
  pickupLocation: "",
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
  name: "홍길동",
  phoneNumber: "010-1234-5678",
  rentalDate: "2025-03-15",
  returnDate: "2025-03-20",
  pickupLocation: "서울역",
  isPublic: true,
  password: "",
  buttonColor: "#445366",
  backgroundColor: "transparent",
  textColor: "#000000",
  link: "/submit",
};
FilledForm.storyName = "데이터 입력 상태";
FilledForm.parameters = {
  docs: {
    description: {
      story: "RentalWrite 컴포넌트에 샘플 데이터가 입력된 상태입니다. 성함, 전화번호, 대여 및 반납 날짜 등이 채워져 있습니다.",
    },
  },
};

// 비공개 설정 및 비밀번호 입력 상태
export const PrivateWithPassword = Template.bind({});
PrivateWithPassword.args = {
  name: "김철수",
  phoneNumber: "010-8765-4321",
  rentalDate: "2025-03-22",
  returnDate: "2025-03-25",
  pickupLocation: "강남역",
  isPublic: false,
  password: "1234",
  buttonColor: "#445366",
  backgroundColor: "#f0f0f0",
  textColor: "#000000",
  link: "/submit",
};
PrivateWithPassword.storyName = "비공개 설정";
PrivateWithPassword.parameters = {
  docs: {
    description: {
      story: "공개/비공개 스위치가 비공개로 설정되고, 비밀번호 입력 필드가 표시된 상태입니다.",
    },
  },
};
