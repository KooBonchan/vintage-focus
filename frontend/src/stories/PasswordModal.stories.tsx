import React, { useState } from "react";
import PasswordModal from "../components/PasswordModal"; // 경로 확인
import { Meta, StoryObj } from "@storybook/react";

// PasswordModal의 props 타입
interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
  onPasswordCheck: (articleId: number) => void;
  selectedArticle: { id: number; password: string };
  sx?: object;
}

// Meta 설정
export default {
  title: "Components/PasswordModal",
  component: PasswordModal,
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    onClose: { action: "closed" },
    onPasswordCheck: { action: "password-checked" },
    selectedArticle: {
      control: "object",
      defaultValue: { id: 1, password: "1234" },
    },
    sx: {
      control: "object",
      defaultValue: { width: "350px" },
    },
  },
  parameters: {
    docs: {
      description: {
        component: "비밀번호 입력을 받아 확인하는 모달 컴포넌트입니다.",
      },
      page: () => (
        <>
          <h1>비밀번호 입력 모달 (Password Modal)</h1>
          <p>이 모달은 비밀번호를 입력받고 확인하는 기능을 제공합니다.</p>
          <h3>사용 방법</h3>
          <pre>
            {`<PasswordModal 
            open={true} 
            onClose={onClose} 
            onPasswordCheck={onPasswordCheck} 
            selectedArticle={article} 
            />`}
          </pre>
          <h3>Props</h3>
          <ul>
            <li>
              <strong>open</strong>: 모달의 열림 상태 (boolean)
            </li>
            <li>
              <strong>onClose</strong>: 모달을 닫을 때 호출되는 함수
            </li>
            <li>
              <strong>onPasswordCheck</strong>: 비밀번호 확인 시 호출되는 함수
            </li>
            <li>
              <strong>selectedArticle</strong>: 선택된 기사 (id, password 등)
            </li>
            <li>
              <strong>sx</strong>: 모달 스타일링을 위한 MUI sx 객체 (예: {'{'} width: '300px' {'}'} )
            </li>
          </ul>
        </>
      ),
    },
  },
} as Meta<PasswordModalProps>;

// 스토리 템플릿
const Template = (args: PasswordModalProps) => {
  const [open, setOpen] = useState(args.open || false);
  const [selectedArticle] = useState(args.selectedArticle || { id: 1, password: "1234" });

  const handlePasswordCheck = (articleId: number) => {
    alert(`비밀번호 확인 성공! 상세 페이지로 이동합니다. (ID: ${articleId})`);
    setOpen(false);
  };

  return (
    <PasswordModal
      {...args}
      open={open}
      onClose={() => setOpen(false)}
      onPasswordCheck={handlePasswordCheck}
      selectedArticle={selectedArticle}
    />
  );
};

// Default 스토리
export const Default: StoryObj<typeof PasswordModal> = {
  render: Template,
  args: {
    open: true,
    selectedArticle: { id: 1, password: "1234" },
    sx: { width: "350px" },
  },
};

// LargeModal 스토리
export const LargeModal: StoryObj<typeof PasswordModal> = {
  render: Template,
  args: {
    open: true,
    selectedArticle: { id: 1, password: "1234" },
    sx: { width: "500px" },
  },
};
