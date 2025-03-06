import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Modal,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Post } from "../../../types/post";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function RentalWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [password, setPassword] = useState("");
  const [write, setWrite] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rentalDate, setRentalDate] = useState(null);
  const [rentalTime, setRentalTime] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [returnTime, setReturnTime] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const GOOGLE_MAPS_API_KEY = "AIzaSyDzgYdB1jOKENQRfUqjJ6OEkPLmAR15HPo";

  const locations = [
    { name: "인천국제공항점", lat: 37.44735, lng: 126.45052 },
    { name: "김포공항점", lat: 37.55868, lng: 126.79445 },
  ];

  const defaultNoticeItems = [
    "대여하실 날짜와 시간, 반납하실 날짜와 시간을 선택해주세요.",
    "대여와 반납은 반드시 같은 지점에서 해 주셔야 합니다.",
    "일반카메라용 메모리카드는 기본으로 제공되지 않습니다.",
  ];

  const defaultNotice = defaultNoticeItems.join("\n");
  const [content, setContent] = useState(defaultNotice);

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
  };

  const updateContent = () => {
    if (!name || !phone || !rentalDate || !rentalTime || !returnDate || !returnTime || !pickupLocation) return;
    const rentalDateTime = dayjs(rentalDate).format("YYYY-MM-DD") + " " + dayjs(rentalTime).format("HH:mm");
    const returnDateTime = dayjs(returnDate).format("YYYY-MM-DD") + " " + dayjs(returnTime).format("HH:mm");
    setContent(
      `${defaultNotice}\n👤 성함: ${name}\n📞 전화번호: ${phone}\n📅 대여기간: ${rentalDateTime} ~ ${returnDateTime}\n📍 희망 수령 지점: ${pickupLocation}\n🔒 공개 여부: ${isPublic ? "비공개" : "공개"}`
    );
  };

  const isValidDateTime = () => {
    if (!rentalDate || !rentalTime || !returnDate || !returnTime) return true;
    const rentalDateTime = dayjs(rentalDate).hour(dayjs(rentalTime).hour()).minute(dayjs(rentalTime).minute());
    const returnDateTime = dayjs(returnDate).hour(dayjs(returnTime).hour()).minute(dayjs(returnTime).minute());
    return returnDateTime.diff(rentalDateTime, "hour", true) >= 3 && returnDateTime.isAfter(rentalDateTime);
  };

  const handleSubmit = () => {
    if (!title.trim() || content.trim() === defaultNotice.trim()) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }
  
    const now = new Date().toISOString();
    const existingPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      author: { name: name || "익명", avatar: "/static/images/avatar/default.png" },
      locked: isPublic,
      password: isPublic ? password : undefined,
      tag: "대여문의",
      date: now,
      views: 0,
      price: "",
    };
    sessionStorage.setItem("posts", JSON.stringify([newPost, ...existingPosts]));
    alert("게시글이 등록되었습니다.");
    navigate("/rental-inquiry");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setSelectedLocation(locations[0]);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleLocationSelect = (location) => setSelectedLocation(location);

  const handleConfirmSelection = () => {
    if (selectedLocation) {
      setPickupLocation(selectedLocation.name);
      updateContent();
    }
    handleCloseModal();
  };

  useEffect(() => {
    if (openModal && selectedLocation) window.dispatchEvent(new Event("resize"));
  }, [openModal, selectedLocation]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 900, mx: "auto", p: 3, bgcolor: "#FFFFFF", borderRadius: "12px", boxShadow: 2 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#333", textAlign: "center" }}>
          대여 문의
        </Typography>

        {/* 필독 사항 */}
        <Box
  sx={{
    width: "100%",
    p: 2,
    mb: 2,
    borderRadius: "8px",
    bgcolor: "#e1f5fe",
    boxShadow: "0 2px 4px rgba(2, 136, 209, 0.2)",
  }}
>
  <Typography variant="subtitle1" sx={{ color: "#0288d1", fontWeight: "bold", mb: 2, textAlign: "center" }}>
    필독 사항
  </Typography>
  {defaultNoticeItems.map((item, index) => (
    <Typography
      key={index}
      variant="body1"
      sx={{
        color: "#0288d1",
        fontSize: "16px",
        lineHeight: "1.8", // 줄 간격 넓혀 가독성 향상
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // 텍스트와 아이콘 가운데 정렬
        mb: 1, // 항목 간 간격
        "&::before": { content: '"●"', mr: 1 }, // 아이콘 추가
        "&:last-child": { mb: 0 }, // 마지막 항목 여백 제거
      }}
    >
      {item}
    </Typography>
  ))}
</Box>

        {/* 입력 필드 */}
        <TextField
          label="제목"
          fullWidth
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            updateContent();
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="문의 내용"
          fullWidth
          value={write}
          onChange={(e) => {
            setWrite(e.target.value);
            updateContent();
          }}
          multiline
          minRows={8}
          maxRows={10}
          sx={{ mb: 2 }}
        />
        <TextField
          label="성함"
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            updateContent();
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="전화번호"
          fullWidth
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            updateContent();
          }}
          sx={{ mb: 2 }}
        />

        {/* 날짜 및 시간 선택 */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <DatePicker
            label="대여 날짜"
            value={rentalDate}
            onChange={(date) => {
              setRentalDate(date);
              if (returnDate && dayjs(date).isAfter(returnDate)) {
                setReturnDate(null);
                setReturnTime(null);
              }
              updateContent();
            }}
            minDate={dayjs()}
            sx={{ flex: 1 }}
          />
          <TimePicker
            label="대여 시간"
            value={rentalTime}
            onChange={(time) => {
              setRentalTime(time);
              if (rentalDate && returnDate && dayjs(rentalDate).isSame(returnDate, "day") && returnTime && dayjs(time).isAfter(returnTime)) {
                setReturnTime(null);
              }
              updateContent();
            }}
            sx={{ flex: 1 }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <DatePicker
            label="반납 날짜"
            value={returnDate}
            onChange={(date) => {
              setReturnDate(date);
              updateContent();
            }}
            minDate={rentalDate || dayjs()}
            sx={{ flex: 1 }}
          />
          <TimePicker
            label="반납 시간"
            value={returnTime}
            onChange={(time) => {
              setReturnTime(time);
              updateContent();
            }}
            minTime={rentalDate && returnDate && dayjs(rentalDate).isSame(returnDate, "day") ? dayjs(rentalTime).add(3, "hour") : null}
            sx={{ flex: 1 }}
          />
        </Box>

        {/* 경고 메시지 */}
        <Alert
          severity="warning"
          sx={{
            width: "100%",
            mb: 2,
            fontSize: "16px",
            textAlign: "center",
            "& .MuiAlert-icon": { color: "#e65100" },
          }}
        >
          최소 3시간부터 대여 시작! 고객님의 원활한 대여를 위해 시간을 체크해 주세요!
        </Alert>

        {/* 희망 수령 지점 */}
        <TextField
          label="희망 수령 지점"
          value={pickupLocation}
          onClick={handleOpenModal}
          fullWidth
          InputProps={{ readOnly: true }}
          sx={{ mb: 2 }}
        />

        {/* 공개/비공개 설정 */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            공개/비공개
          </Typography>
          <FormControlLabel
            control={<Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)} />}
            label=""
            sx={{ m: 0 }}
          />
          {isPublic && (
            <TextField
            label="비밀번호 (4자리 숫자)"
            type="password"
            variant="outlined" // "filled" 대신 "outlined"로 변경
            fullWidth
            value={password}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, "");
              if (e.target.value !== input) alert("숫자만 입력 가능합니다.");
              if (input.length <= 4) setPassword(input);
            }}
            inputProps={{ maxLength: 4, pattern: "[0-9]*" }}
            sx={{ mt: 1, maxWidth: "300px", mb: 2 }} // mb: 2 추가로 간격 통일
          />
          )}
        </Box>

        {/* 제출 버튼 */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ fontSize: "16px", px: 4, py: 1.5, borderRadius: "8px" }}
          >
            게시글 등록하기
          </Button>
        </Box>
      </Box>

      {/* 모달 */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "1000px",
            bgcolor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            p: 4,
            borderRadius: "16px",
            display: "flex",
            gap: 2,
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ width: "70%", borderRadius: "12px", overflow: "hidden" }}>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} onLoad={() => setIsMapLoaded(true)}>
              {isMapLoaded && selectedLocation && (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                  zoom={15}
                >
                  <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} title={selectedLocation.name} />
                </GoogleMap>
              )}
            </LoadScript>
          </Box>
          <Box sx={{ width: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#1976d2", textAlign: "center" }}>
                지점 선택
              </Typography>
              <List sx={{ maxHeight: "400px", overflowY: "auto" }}>
                {locations.map((loc) => (
                  <ListItem
                    button
                    key={loc.name}
                    onClick={() => handleLocationSelect(loc)}
                    sx={{
                      mb: 1,
                      borderRadius: "8px",
                      bgcolor: selectedLocation?.name === loc.name ? "#e3f2fd" : "#fff",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                        transform: "scale(1.02)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={loc.name}
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontWeight: selectedLocation?.name === loc.name ? "bold" : "normal",
                          color: selectedLocation?.name === loc.name ? "#1976d2" : "#333",
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Button
              variant="contained"
              onClick={handleConfirmSelection}
              disabled={!selectedLocation}
              sx={{
                mt: 2,
                alignSelf: "center",
                px: 3,
                py: 1,
                bgcolor: "linear-gradient(45deg, #1976d2, #42a5f5)",
                borderRadius: "8px",
                "&:hover": {
                  bgcolor: "linear-gradient(45deg, #1565c0, #1976d2)",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              선택하기
            </Button>
          </Box>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
}