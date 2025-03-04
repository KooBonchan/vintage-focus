import React, { useState } from "react";
import PasswordModal from "../components/PasswordModal"; // 경로 확인
import { Meta, Story } from '@storybook/react';  // Storybook 메타 및 스토리

// 기본 설정 및 문서화
const meta: Meta<typeof PasswordModal> = {
  title: 'Components/PasswordModal', // 스토리북에서 표시될 제목
  component: PasswordModal,
  argTypes: {
    open: { control: 'boolean' },
    selectedArticle: { 
      control: 'object',
      defaultValue: { id: 1, password: '1234' },
    },
    modalWidth: { 
      control: 'text', 
      defaultValue: '300px',
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <h1>비밀번호 입력 모달 (Password Modal)</h1>
          <p>이 모달은 비밀번호를 입력받고 확인하는 기능을 제공합니다.</p>
          <h3>사용 방법</h3>
          <pre>{`<PasswordModal open={true} onClose={onClose} onPasswordCheck={onPasswordCheck} selectedArticle={article} />`}</pre>
          <h3>Props</h3>
          <ul>
            <li><strong>open</strong>: 모달의 열림 상태 (boolean)</li>
            <li><strong>onClose</strong>: 모달을 닫을 때 호출되는 함수</li>
            <li><strong>onPasswordCheck</strong>: 비밀번호 확인 시 호출되는 함수</li>
            <li><strong>selectedArticle</strong>: 선택된 기사 (id, password 등)</li>
            <li><strong>modalWidth</strong>: 모달의 너비 (string, px 단위)</li>
          </ul>
        </>
      ),
    },
  },
};

export default meta; // 여기에서 meta를 export default로 해야 함

// 기본 사용 예시
const Template: Story<typeof PasswordModal> = (args) => {
  const [open, setOpen] = useState(args.open || false);
  const [selectedArticle, setSelectedArticle] = useState(args.selectedArticle || { id: 1, password: "1234" });

  const handlePasswordCheck = (articleId: number) => {
    alert(`비밀번호 확인 성공! 상세 페이지로 이동합니다. (ID: ${articleId})`);
    setOpen(false);
  };

  return (
    <PasswordModal
      open={open}
      onClose={() => setOpen(false)}
      onPasswordCheck={handlePasswordCheck}
      selectedArticle={selectedArticle}
      {...args}
      sx={{ width: args.modalWidth }}  // modalWidth를 sx prop으로 전달
    />
  );
};

// 기본 상태의 PasswordModal
export const Default = Template.bind({});
Default.args = {
  open: true,
  selectedArticle: { id: 1, password: '1234' },
  modalWidth: '300px',
};

// 추가 예시 (너비 변경)
export const LargeModal = Template.bind({});
LargeModal.args = {
  open: true,
  selectedArticle: { id: 1, password: '1234' },
  modalWidth: '500px',
};
