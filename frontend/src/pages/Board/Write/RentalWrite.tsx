import React, { useState, useEffect, useRef } from "react";
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
  Grid,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { readProductDetail } from "@/api/productApi";
import { ProductResponse } from "@/types/response";

export default function RentalWrite() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();

  const { 
    productName = "제품이름", 
    productImage = "https://placehold.co/500x450" 
  } = location?.state || {};

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
  const [selectedLocation, setSelectedLocation] = useState<{name:string, lat:number, lng:number} | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(!!window.google?.maps); // 스크립트 로드 상태 추가
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const mapRef = useRef(null); // Ref to store GoogleMap instance

  

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


  const updateContent = () => {
    if (!name || !phone || !rentalDate || !rentalTime || !returnDate || !returnTime || !pickupLocation) return;
    const rentalDateTime = dayjs(rentalDate)
      .hour(dayjs(rentalTime).hour())
      .minute(dayjs(rentalTime).minute())
      .format("YYYY-MM-DD HH:mm");
    const returnDateTime = dayjs(returnDate)
      .hour(dayjs(returnTime).hour())
      .minute(dayjs(returnTime).minute())
      .format("YYYY-MM-DD HH:mm");
    return `${defaultNotice}\n✍️ 문의 내용: ${write}\n👤 성함: ${name}\n📞 전화번호: ${phone}\n📅 대여 날짜/시간: ${rentalDateTime}\n📆 반납 날짜/시간: ${returnDateTime}\n📍 희망 수령 지점: ${pickupLocation}\n🔒 공개 여부: ${isPublic ? "비공개" : "공개"}`;
  };

  const isValidDateTime = () => {
    if (!rentalDate || !rentalTime || !returnDate || !returnTime) return false;
    const rentalDateTime = dayjs(rentalDate)
      .hour(dayjs(rentalTime).hour())
      .minute(dayjs(rentalTime).minute());
    const returnDateTime = dayjs(returnDate)
      .hour(dayjs(returnTime).hour())
      .minute(dayjs(returnTime).minute());
    const diffInHours = returnDateTime.diff(rentalDateTime, "hour", true);
    return diffInHours >= 3 && returnDateTime.isAfter(rentalDateTime);
  };

  const handleSubmit = () => {
    if (!title.trim() || !write.trim()) {
      alert("제목과 문의 내용을 입력해주세요!");
      return;
    }
    if (!isValidDateTime()) {
      alert("대여 기간은 최소 3시간 이상이어야 하며, 반납 시간이 대여 시간보다 늦어야 합니다!");
      return;
    }

    const now = new Date().toISOString();
    const content = updateContent();
    console.log("Saving content:", content);
    const existingPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    const newPost = {
      id: Date.now(),
      title,
      content,
      product: {
        name: product?.modelName || productName,
        imageUrl: product?.productImages?.[0]
          ? `${import.meta.env.VITE_IMAGE_RESOURCE_ROOT}/${product.productImages[0]}`
          : productImage,
      },
      author: { name: name || "익명", avatar: "/static/images/avatar/default.png" },
      locked: isPublic,
      password: isPublic ? password : undefined,
      tag: "대여문의",
      date: now,
      views: 0,
      price: "",
      rental: {
        rentalLocation: pickupLocation,
        startDate: rentalDate ? dayjs(rentalDate).toISOString() : null,
        startTime: rentalTime ? dayjs(rentalTime).toISOString() : null,
        returnDate: returnDate ? dayjs(returnDate).toISOString() : null,
        returnTime: returnTime ? dayjs(returnTime).toISOString() : null,
        lat: selectedLocation?.lat || null,
        lng: selectedLocation?.lng || null,
      },
    };
    sessionStorage.setItem("posts", JSON.stringify([newPost, ...existingPosts]));
    alert("게시글이 등록되었습니다.");
    navigate("/rental-inquiry");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setSelectedLocation(locations[0]); // 모달 열릴 때 기본 위치 설정
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    if (mapRef.current) {
      mapRef.current = null;
    }
  };

  const handleLocationSelect = setSelectedLocation;

  const handleConfirmSelection = () => {
    if (selectedLocation) {
      setPickupLocation(selectedLocation.name);
    }
    handleCloseModal();
  };

  const handleMapLoad = (map) => {
    console.log("Map loaded successfully"); // 디버깅 로그 추가
    mapRef.current = map;
    setIsMapLoaded(true);
  };

  const handleMapUnmount = () => {
    console.log("Map unmounted"); // 디버깅 로그 추가
    mapRef.current = null;
    setIsMapLoaded(false);
  };

  const handleScriptLoad = () => {
    console.log("Google Maps script loaded"); // 디버깅 로그 추가
    setIsScriptLoaded(true);
  };

  const handleScriptError = () => {
    console.error("Failed to load Google Maps script"); // 에러 로그 추가
    setIsScriptLoaded(false);
  };

  // 창 크기 조정 이벤트 제거 (필요 시 조건부로 추가 가능)
  // useEffect(() => {
  //   if (openModal && selectedLocation) {
  //     window.dispatchEvent(new Event("resize"));
  //   }
  // }, [openModal, selectedLocation]);

  useEffect(() => {
    if (!productId) return;
    const idNum = parseInt(productId);
    if (!idNum) return;

    let isMounted = true;

    readProductDetail(idNum)
      .then((data) => {
        if (isMounted) setProduct(data);
      })
      .catch((error) => {
        if (isMounted) console.error("Failed to load product details:", error);
      });

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, [productId]);




  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 900, mx: "auto", p: 3, bgcolor: "#FFFFFF", borderRadius: "12px", boxShadow: 2 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#333", textAlign: "center" }}>
          대여 문의
        </Typography>

        {product?.productImages ? (
          <Grid2 container spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 3 }}>
            <Grid2 xs={12} sm={4} md={3}>
              <Box
                sx={{
                  width: { xs: "120px", sm: "150px" },
                  height: { xs: "120px", sm: "150px" },
                  bgcolor: "#ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                  mx: "auto",
                }}
              >
                <img
                src={`${import.meta.env.VITE_IMAGE_RESOURCE_ROOT}/${product.productImages[0]}`}
                alt={product.modelName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // 변경: 이미지가 빈 공간 없이 꽉 차도록 설정
                  borderRadius: "8px",
                }}
              />

              </Box>
            </Grid2>
            <Grid2 xs={12} sm={8} md={9}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  color: "#333",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              >
                {product.modelName}
              </Typography>
            </Grid2>
          </Grid2>
        ) : (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ width: "100%", height: "300px", bgcolor: "#ddd", borderRadius: "8px", overflow: "hidden" }}>
                <img
                  src={productImage}
                  alt={productName}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                {productName}
              </Typography>
            </Grid>
          </Grid>
        )}


        {/* 대여비 정보를 별도의 강조 박스로 표시 */}
        <Box
          sx={{
            width: "100%",
            p: 2,
            mb: 2,
            borderRadius: "8px",
            bgcolor: "#fff3e0", // 주황색 배경으로 강조
            border: "1px solid #ff9800",
            boxShadow: "0 2px 4px rgba(255, 152, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#ff9800",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "8px" }}>⚠️</span> 대여비: 최종 견적 후 청구됩니다!
          </Typography>
        </Box>
        <Box sx={{ width: "100%", p: 2, mb: 2, borderRadius: "8px", bgcolor: "#e1f5fe", boxShadow: "0 2px 4px rgba(2, 136, 209, 0.2)" }}>
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
                lineHeight: "1.8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
                "&::before": { content: '"●"', mr: 1 },
                "&:last-child": { mb: 0 },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        <TextField label="제목" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
        <TextField
          label="문의 내용"
          fullWidth
          value={write}
          onChange={(e) => setWrite(e.target.value)}
          multiline
          minRows={4}
          sx={{ mb: 2 }}
        />
        <TextField label="성함" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
        <TextField label="전화번호" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <DatePicker
            label="대여 날짜"
            value={rentalDate}
            onChange={(date) => setRentalDate(date)}
            minDate={dayjs()}
            sx={{ flex: 1 }}
          />
          <TimePicker label="대여 시간" value={rentalTime} onChange={(time) => setRentalTime(time)} sx={{ flex: 1 }} />
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <DatePicker
            label="반납 날짜"
            value={returnDate}
            onChange={(date) => setReturnDate(date)}
            minDate={rentalDate || dayjs()}
            sx={{ flex: 1 }}
          />
          <TimePicker
            label="반납 시간"
            value={returnTime}
            onChange={(time) => setReturnTime(time)}
            minTime={
              rentalDate && rentalTime && dayjs(returnDate).isSame(rentalDate, "day")
                ? dayjs(rentalTime).add(3, "hour")
                : null
            }
            sx={{ flex: 1 }}
          />
        </Box>

        {!isValidDateTime() && rentalDate && rentalTime && returnDate && returnTime && (
          <Alert severity="error" sx={{ width: "100%", mb: 2, fontSize: "16px", textAlign: "center" }}>
            반납 시간은 대여 시간보다 최소 3시간 이후여야 합니다!
          </Alert>
        )}
        <Alert
          severity="warning"
          sx={{ width: "100%", mb: 2, fontSize: "16px", textAlign: "center", "& .MuiAlert-icon": { color: "#e65100" } }}
        >
          최소 3시간부터 대여 시작! 고객님의 원활한 대여를 위해 시간을 체크해 주세요!
        </Alert>

        <TextField
          label="희망 수령 지점"
          value={pickupLocation}
          onClick={handleOpenModal}
          fullWidth
          InputProps={{ readOnly: true }}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            공개/비공개
          </Typography>
          <FormControlLabel
            control={<Switch checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />}
            label=""
            sx={{ m: 0 }}
          />
          {isPublic && (
            <TextField
              label="비밀번호 (4자리 숫자)"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, "");
                if (e.target.value !== input) alert("숫자만 입력 가능합니다.");
                if (input.length <= 4) setPassword(input);
              }}
              inputProps={{ maxLength: 4, pattern: "[0-9]*" }}
              sx={{ mt: 1, maxWidth: "300px", mb: 2 }}
            />
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={handleSubmit} sx={{ fontSize: "16px", px: 4, py: 1.5, borderRadius: "8px" }}>
            게시글 등록하기
          </Button>
        </Box>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "900px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: "12px",
            display: "flex",
            gap: 2,
          }}
        >
          <Box sx={{ width: "70%", borderRadius: "12px", overflow: "hidden" }}>
            
              <MapComponent selectedLocation={selectedLocation} />
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
                    onClick={() => {handleLocationSelect(loc)}}
                    sx={{
                      mb: 1,
                      borderRadius: "8px",
                      bgcolor: selectedLocation?.name === loc.name ? "#e3f2fd" : "#fff",
                      transition: "all 0.3s ease",
                      "&:hover": { bgcolor: "#f5f5f5", transform: "scale(1.02)", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" },
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
                "&:hover": { bgcolor: "linear-gradient(45deg, #1565c0, #1976d2)", transform: "scale(1.05)" },
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



function MapComponent({ selectedLocation }) {
  

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const handleMapLoad = (map) => {
  
  };

  const handleMapUnmount = (map) => {
 
  };

  const handleScriptError = (error) => {

  };

  return (

  <GoogleMap
    mapContainerStyle={{
      width: "100%",
      height: "500px",
    }}
    center={{ lat: selectedLocation?.lat ?? 1, lng: selectedLocation?.lng ?? 1 }}
    zoom={15}
    onLoad={handleMapLoad}
    onUnmount={handleMapUnmount}
  >
    {selectedLocation && (
      <Marker
        position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
        title={selectedLocation.name}
      />
    )}
  </GoogleMap>
  );
}