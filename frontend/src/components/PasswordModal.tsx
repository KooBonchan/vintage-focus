import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

// PasswordModal 컴포넌트 먼저 정의
interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
  onPasswordCheck: (articleId: number) => void;
  selectedArticle: { id: number; password: string };
  sx?: object;
}

const PasswordModal = ({
  open,
  onClose,
  onPasswordCheck,
  selectedArticle,
  sx,
}: PasswordModalProps) => {
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (open) {
      setPassword("");
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      localStorage.setItem("modalState", "open");
    } else {
      localStorage.setItem("modalState", "closed");
    }
  }, [open]);

  const handleClose = () => {
    setPassword("");
    onClose();
  };

  const handleCheckPassword = () => {
    if (selectedArticle && selectedArticle.password === password) {
      onPasswordCheck(selectedArticle.id);
      setPassword("");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#333",
          color: "#fff",
          borderRadius: "12px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          ...sx,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", color: "#fff", textAlign: "center" }}>
        비밀번호 입력
      </DialogTitle>
      <DialogContent sx={{ padding: "20px" }}>
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          fullWidth
          helperText={isFocused ? "" : "비밀번호를 입력하세요 :) "}
          sx={{
            "& .MuiInputLabel-root": {
              transform: isFocused ? "translate(0, -1.5em) scale(0.75)" : "",
            },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#555",
              borderRadius: "8px",
              color: "#fff",
              "&.Mui-focused": {
                borderColor: "transparent",
                boxShadow: "none",
              },
            },
            "& .MuiInputBase-input": {
              color: "#fff",
            },
            "& .MuiFormHelperText-root": {
              fontSize: "1.0rem",
              color: "#fff",
              textAlign: "center",
              marginTop: "8px",
            },
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          padding: "8px 16px",
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "#fff",
            backgroundColor: "#888",
            "&:hover": { backgroundColor: "#445366" },
            fontSize: "1.0rem",
            padding: "2px 16px",
          }}
        >
          취소
        </Button>
        <Button
          onClick={handleCheckPassword}
          color="primary"
          sx={{
            backgroundColor: "#888",
            color: "#fff",
            "&:hover": { backgroundColor: "#445366" },
            fontSize: "1.0rem",
            padding: "2px 16px",
          }}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordModal;

// 이제 Meta 설정을 작성합니다.
export const meta = {
  title: "Components/PasswordModal",
  component: PasswordModal,
  tags: ["autodocs"], // AutoDocs 활성화
  argTypes: {
    open: { control: "boolean" },
    selectedArticle: {
      control: "object",
      defaultValue: { id: 1, password: "1234" },
    },
    modalWidth: {
      control: "text",
      defaultValue: "300px",
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

// 기본 Story Template 정의
const Template = (args) => <PasswordModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: true,
  selectedArticle: { id: 1, password: "1234" },
  modalWidth: "300px",
};
