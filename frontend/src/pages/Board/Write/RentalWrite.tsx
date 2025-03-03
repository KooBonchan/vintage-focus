import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Modal,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

export default function RentalWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [rentalDetails, setRentalDetails] = useState(""); // 추가된 상태
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");
  const [rentalLocation, setRentalLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [open, setOpen] = useState(false);
  const [map, setMap] = useState(null);
  
  const rentalLocations = [
    { name: "강남역점", lat: 37.4979, lng: 127.0276 },
    { name: "홍대점", lat: 37.5574, lng: 126.9236 },
    { name: "잠실점", lat: 37.5133, lng: 127.1009 },
    { name: "김포공항점", lat: 37.5621, lng: 126.8018 },
    { name: "인천국제공항점", lat: 37.4692, lng: 126.451 },
    { name: "제주공항점", lat: 33.507, lng: 126.4929 },
  ];

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google && document.getElementById("map")) {
        initMap();
        return;
      }
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDzgYdB1jOKENQRfUqjJ6OEkPLmAR15HPo&callback=initMap`;
      script.async = true;
      document.body.appendChild(script);
      script.onload = initMap;
    };

    const initMap = () => {
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 37.5665, lng: 126.9780 },
      });
      setMap(mapInstance);
      loadMarkers(mapInstance);
    };

    if (open) {
      setTimeout(loadGoogleMapsScript, 500);
    }
  }, [open]);

  const loadMarkers = (mapInstance) => {
    rentalLocations.forEach((location) => {
      new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: mapInstance,
        title: location.name,
      });
    });
  };

  const handleLocationChange = (event) => {
    const selectedName = event.target.value;
    setRentalLocation(selectedName);
    const selectedLocation = rentalLocations.find((loc) => loc.name === selectedName);
    if (selectedLocation && map) {
      map.setCenter({ lat: selectedLocation.lat, lng: selectedLocation.lng });

      if (window.selectedMarker) {
        window.selectedMarker.setMap(null);
      }
      window.selectedMarker = new window.google.maps.Marker({
        position: { lat: selectedLocation.lat, lng: selectedLocation.lng },
        map: map,
        title: selectedName,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        },
      });
    }
  };

  const handleConfirm = () => {
    if (!rentalLocation || !startDate || !startTime) {
      alert("대여 지점과 날짜/시간을 선택해주세요.");
      return;
    }
    const formattedDate = startDate.format("YYYY-MM-DD");
    const formattedTime = startTime.format("HH:mm");
    setRentalDetails(`대여 지점: ${rentalLocation}\n대여 날짜: ${formattedDate}\n대여 시간: ${formattedTime}`);
    setOpen(false);
  };

  const handleSubmit = () => {
    const finalContent = content.trim() ? content : rentalDetails.trim();
  
    if (!title.trim() || !finalContent) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }
  
    if (!isPublic && password.length !== 4) {
      alert("비밀번호는 4자리 숫자로 입력해주세요.");
      return;
    }
  
    // ✅ 기존 게시글 목록 불러오기
    const existingPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
  
    const newPost = {
      id: Date.now(),
      title,
      price,
      content: finalContent,
      rental: {
        rentalLocation,
        startDate: startDate?.toISOString(),
        startTime: startTime?.toISOString(),
      },
      locked: !isPublic,
      password: isPublic ? null : password,
      tag: "대여문의",
    };
  
    // ✅ 새 게시글을 기존 데이터에 추가
    const updatedPosts = [...existingPosts, newPost];
  
     
    const posts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    sessionStorage.setItem("posts", JSON.stringify([newPost, ...posts]));
  
    alert("게시글이 등록되었습니다.");
    navigate("/rental-inquiry");
  };
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3, backgroundColor: "#F8F8F8", borderRadius: "8px" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>대여 문의</Typography>
        <Button variant="outlined" fullWidth sx={{ mb: 2 }} onClick={() => setOpen(true)}>
          대여 지점 및 날짜 선택
        </Button>
        <TextField 
          label="제목" 
          variant="outlined" 
          fullWidth 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          sx={{ mb: 2 }} 
        />
        <TextField 
          label="문의 내용" 
          multiline 
          rows={2} 
          variant="outlined" 
          fullWidth 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          sx={{ mb: 2 }} 
        />
        <FormControlLabel 
          control={<Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)} />} 
          label="공개/비공개" 
        />
        {!isPublic && (
          <TextField 
            label="비밀번호 (4자리 숫자)" 
            type="password" 
            variant="outlined" 
            size="small" 
            fullWidth 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            sx={{ mt: 1 }} 
          />
        )}
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          게시글 등록하기
        </Button>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 600, margin: "100px auto", padding: 3, backgroundColor: "white", borderRadius: "8px" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>대여 지점 및 날짜 선택</Typography>
            <div id="map" style={{ height: "300px", width: "100%", marginBottom: "10px" }}></div>
            <select onChange={handleLocationChange} value={rentalLocation} style={{ width: "100%", padding: "8px", marginBottom: "10px" }}>
              <option value="">대여 지점을 선택하세요</option>
              {rentalLocations.map((loc) => (
                <option key={loc.name} value={loc.name}>{loc.name}</option>
              ))}
            </select>
            <DatePicker label="대여 날짜" value={startDate} onChange={setStartDate} />
            <TimePicker label="대여 시간" value={startTime} onChange={setStartTime} minutesStep={30} />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleConfirm}>선택 완료</Button>
          </Box>
        </Modal>
      </Box>
    </LocalizationProvider>
  );
}
