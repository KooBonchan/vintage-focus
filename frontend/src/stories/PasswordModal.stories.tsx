// src/stories/PasswordModal.stories.js
import React, { useState } from 'react';
import PasswordModal from '../components/PasswordModal';  // 모달 컴포넌트 경로에 맞게 수정

export default {
  title: 'Components/PasswordModal',  // 스토리북에서의 제목
  component: PasswordModal,
  argTypes: {
    open: { control: 'boolean' },  // open을 boolean 타입으로 제어
    selectedArticle: { 
      control: 'object',  // selectedArticle을 object 타입으로 제어
      defaultValue: { id: 1, password: '1234' }, // 기본값 설정
    },
    modalWidth: { 
      control: 'text',  // modalWidth를 텍스트로 제어 (사이즈를 px 단위로 입력)
      defaultValue: '300px', // 기본값 300px
    },
  },
};

// 기본 사용 예시
const Template = (args) => {
  const [open, setOpen] = useState(args.open || false);
  const [selectedArticle, setSelectedArticle] = useState(args.selectedArticle || { id: 1, password: '1234' });

  // 비밀번호 확인 시 처리
  const handlePasswordCheck = (articleId) => {
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
      sx={{ width: args.modalWidth }}  // 모달의 너비를 dynamic하게 적용
    />
  );
};

// 기본 상태의 PasswordModal
export const Default = Template.bind({});
Default.args = {
  open: true,  // 기본적으로 모달이 열리도록 설정
  selectedArticle: { id: 1, password: '1234' },  // 기본 article 설정
  modalWidth: '300px',  // 기본 모달 너비 설정
};

// 모달 너비를 500px로 설정한 예시
export const LargeModal = Template.bind({});
LargeModal.args = {
  open: true,
  selectedArticle: { id: 1, password: '1234' },
  modalWidth: '500px',  // 모달 너비를 500px로 설정
};

// 모달 너비를 600px로 설정한 예시
export const ExtraLargeModal = Template.bind({});
ExtraLargeModal.args = {
  open: true,
  selectedArticle: { id: 1, password: '1234' },
  modalWidth: '600px',  // 모달 너비를 600px로 설정
};
