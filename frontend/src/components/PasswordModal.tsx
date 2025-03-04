// PasswordModal.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

const PasswordModal = ({ open, onClose, onPasswordCheck, selectedArticle, sx }) => {
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // 비밀번호 상태 초기화
  useEffect(() => {
    if (open) {
      setPassword(""); // 모달이 열릴 때마다 비밀번호 초기화
    }
  }, [open]);

  // 모달이 닫힐 때 비밀번호 초기화
  const handleClose = () => {
    setPassword("");  // 비밀번호 초기화
    onClose();         // onClose 호출
  };

  const handleCheckPassword = () => {
    if (selectedArticle && selectedArticle.password === password) {
      onPasswordCheck(selectedArticle.id);
      setPassword(""); // 비밀번호를 확인 후 초기화
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
          backgroundColor: "#333",  // 어두운 배경색
          color: "#fff",  // 텍스트 색상을 흰색으로 설정
          borderRadius: "12px", // 둥근 모서리
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // 그림자 효과
          ...sx,  // 외부에서 전달된 sx 스타일을 적용
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
          fullWidth
          helperText={isFocused ? "" : "비밀번호를 입력하세요 :) "} // 포커스되면 helperText는 숨기고, 아니면 안내 텍스트 보이기
          sx={{
            "& .MuiInputLabel-root": {
              transform: isFocused ? "translate(0, -1.5em) scale(0.75)" : "", // 포커스 되면 라벨이 위로 올라가도록
            },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#555", // 입력 필드 배경색
              borderRadius: "8px", // 둥근 모서리
              color: "#fff", // 입력 텍스트 색상
              "&.Mui-focused": {
                borderColor: "transparent", // 포커스 시 테두리 색을 투명으로 설정
                boxShadow: "none", // 포커스 시 박스 쉐도우 제거
              },
            },
            "& .MuiInputBase-input": {
              color: "#fff", // 입력값 색상
            },
            "& .MuiFormHelperText-root": {
              fontSize: "1.0rem", // Helper text 글씨 크기 증가
              color: "#fff", // 텍스트 색상을 흰색으로 설정
              textAlign: "center", // 텍스트를 가운데 정렬
              marginTop: "8px", // helperText와 입력 필드 사이 간격 추가
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
          marginBottom: "16px", // 버튼 아래에 여유 공간 추가
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "#fff",
            backgroundColor: "#888",
            "&:hover": { backgroundColor: "#445366" },
            fontSize: "1.0rem",  // 버튼 글씨 크기
            padding: "2px 16px",  // 버튼 크기 (높이를 낮추기 위해 padding을 줄임)
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
            fontSize: "1.0rem",  // 버튼 글씨 크기
            padding: "2px 16px",  // 버튼 크기 (높이를 낮추기 위해 padding을 줄임)
          }}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordModal;
