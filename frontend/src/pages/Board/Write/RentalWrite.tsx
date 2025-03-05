import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  MenuItem
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Post } from "../../../types/post";

export default function RentalWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [password, setPassword] = useState("");

  // 사용자 정보 상태
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rentalDate, setRentalDate] = useState(null);
  const [rentalTime, setRentalTime] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [returnTime, setReturnTime] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");

  const defaultNotice = `● 대여하실 날짜와 시간, 반납하실 날짜와 시간을 선택해주세요.
● 대여와 반납은 반드시 같은 지점에서 해 주셔야 합니다.
● 일반카메라용 메모리카드는 기본으로 제공되지 않습니다.\n\n`;

  const [content, setContent] = useState(defaultNotice);

  // 문의 내용 자동 업데이트
  const updateContent = () => {
    if (!name || !phone || !rentalDate || !rentalTime || !returnDate || !returnTime || !pickupLocation) {
      return;
    }

    const rentalDateTime = dayjs(rentalDate).format("YYYY-MM-DD") + " " + dayjs(rentalTime).format("HH:mm");
    const returnDateTime = dayjs(returnDate).format("YYYY-MM-DD") + " " + dayjs(returnTime).format("HH:mm");

    setContent(
      `${defaultNotice}\n👤 성함: ${name}\n📞 전화번호: ${phone}\n📅 대여기간: ${rentalDateTime} ~ ${returnDateTime}\n📍 희망 수령 지점: ${pickupLocation}\n🔒 공개 여부: ${isPublic ? "비공개" : "공개"}\n`
    );
  };

  // 게시글 등록
  const handleSubmit = () => {
    if (!title.trim() || content.trim() === defaultNotice.trim()) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    if (returnDate && rentalDate && dayjs(returnDate).isBefore(dayjs(rentalDate))) {
      alert("반납 날짜는 대여 날짜보다 이후여야 합니다.");
      return;
    }

    const now = new Date().toISOString();
    const existingPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");

    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      author: { name: name || "익명", avatar: "/static/images/avatar/default.png" },
      locked: isPublic, // 공개 상태 반영
      password: isPublic ? password : undefined,
      tag: "대여문의",
      date: now,
      views: 0,
    };

    sessionStorage.setItem("posts", JSON.stringify([newPost, ...existingPosts]));
    alert("게시글이 등록되었습니다.");
    navigate("/rental-inquiry");
  };

  // 구글 맵에서 위치 선택 함수
  const openGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=인천국제공항`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3, backgroundColor: "#FFFFFF", borderRadius: "12px", boxShadow: 2 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#333", textAlign: "center" }}>대여 문의</Typography>

        <TextField
          label="제목"
          variant="filled"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="필독 사항"
          multiline
          variant="filled"
          fullWidth
          value={content}
          sx={{
            mb: 2,
            "& .MuiInputBase-root": {
              textAlign: "left",
              display: "flex",
              alignItems: "flex-start",
              height: "200px",
              padding: "30px",
            },
          }}
        />

        <TextField label="성함" fullWidth value={name} onChange={(e) => { setName(e.target.value); updateContent(); }} sx={{ mb: 2 }} />
        <TextField label="전화번호" fullWidth value={phone} onChange={(e) => { setPhone(e.target.value); updateContent(); }} sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <DatePicker label="대여 날짜" value={rentalDate} onChange={(date) => { setRentalDate(date); updateContent(); }} minDate={dayjs()} />
          <TimePicker label="대여 시간" value={rentalTime} onChange={(time) => { setRentalTime(time); updateContent(); }} />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <DatePicker label="반납 날짜" value={returnDate} onChange={(date) => { setReturnDate(date); updateContent(); }} minDate={rentalDate || dayjs()} />
          <TimePicker label="반납 시간" value={returnTime} onChange={(time) => { setReturnTime(time); updateContent(); }} />
        </Box>

        <TextField
          select
          label="희망 수령 지점"
          value={pickupLocation}
          onChange={(e) => { setPickupLocation(e.target.value); updateContent(); }}
          fullWidth
          onClick={openGoogleMaps}
        >
          <MenuItem value="인천국제공항">인천국제공항</MenuItem>
          <MenuItem value="김포공항">김포공항</MenuItem>
        </TextField>

       
        {/* 공개 여부 및 비밀번호 입력 컨테이너 */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "80px" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>공개/비공개</Typography>
          <FormControlLabel
            control={<Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)} />}
            label=""
            sx={{ m: 0 }}
          />

                {/* 공개(ON, 파란색)일 때 비밀번호 입력창 표시 */}
        {isPublic && ( 
          <TextField
            label="비밀번호 (4자리 숫자)"
            type="password"
            variant="filled"
            fullWidth
            value={password}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, ""); // 숫자만 허용
              if (e.target.value !== input) {
                alert("숫자만 입력 가능합니다."); // 🔹 경고창 추가
              }
              if (input.length <= 4) setPassword(input);
            }}
            inputProps={{
              maxLength: 4,
              pattern: "[0-9]*",
            }}
            sx={{ mt: 1, maxWidth: "300px" }}
          />
        )}



</Box>


        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button variant="contained" sx={{ fontSize: "16px", padding: "12px", width: "200px" }} onClick={handleSubmit}>
            게시글 등록하기
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
