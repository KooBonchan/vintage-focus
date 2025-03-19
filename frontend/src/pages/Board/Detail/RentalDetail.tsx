import { Box, Button, Typography, TextField, Alert, Grid, Modal } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { GoogleMap, LoadScript, Marker, useLoadScript } from "@react-google-maps/api";

export default function RentalDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [inputPassword, setInputPassword] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const mapRef = useRef(null);

  const { 
    productName = "제품이름", 
    productImage = "https://placehold.co/500x450" 
  } = location?.state || {};

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const defaultNoticeItems = [
    "대여하실 날짜와 시간, 반납하실 날짜와 시간을 선택해주세요.",
    "대여와 반납은 반드시 같은 지점에서 해 주셔야 합니다.",
    "일반카메라용 메모리카드는 기본으로 제공되지 않습니다.",
    "대여비는 최종 견적 후 청구되며, 자세한 금액은 문의 시 확인 가능합니다.",
  ];

  useEffect(() => {
    const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    const foundPost = storedPosts.find((p) => p.id.toString() === id);
    console.log("Found post from sessionStorage:", foundPost);
    setPost(foundPost);

    const queryParams = new URLSearchParams(location.search);
    const isAuthenticated = queryParams.get("authenticated") === "true";
    const isAuthenticatedInSession = sessionStorage.getItem(`post_${id}_authenticated`) === "true";

    if (foundPost) {
      if (!foundPost.locked || isAuthenticated || isAuthenticatedInSession) {
        setShowContent(true);
        const updatedPosts = storedPosts.map((p) =>
          p.id.toString() === id ? { ...p, views: (p.views || 0) + 1 } : p
        );
        sessionStorage.setItem("posts", JSON.stringify(updatedPosts));
      } else {
        setShowContent(false);
      }
    }
  }, [id, location.search]);

  if (!post) {
    return (
      <Box sx={{ maxWidth: 900, mx: "auto", p: 3, bgcolor: "#FFFFFF", borderRadius: "12px", boxShadow: 2, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
          게시글을 찾을 수 없습니다.
        </Typography>
        <Button variant="contained" sx={{ fontSize: "16px", px: 4, py: 1.5, borderRadius: "8px" }} onClick={() => navigate("/rental-inquiry")}>
          목록으로 돌아가기
        </Button>
      </Box>
    );
  }

  const handleDeleteClick = () => {
    if (post.locked && !showContent) {
      alert("먼저 비밀번호를 입력하여 내용을 확인해주세요.");
      return;
    }
    setOpenDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    const updatedPosts = storedPosts.filter((p) => p.id.toString() !== id);
    sessionStorage.setItem("posts", JSON.stringify(updatedPosts));
    alert("게시글이 삭제되었습니다.");
    setOpenDeleteModal(false);
    navigate("/rental-inquiry");
  };

  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  const handlePasswordSubmit = () => {
    if (post.password === inputPassword) {
      setShowContent(true);
      sessionStorage.setItem(`post_${post.id}_authenticated`, "true");
      navigate(`${location.pathname}?authenticated=true`, { replace: true });
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (e.target.value !== input) alert("숫자만 입력 가능합니다.");
    if (input.length <= 4) setInputPassword(input);
  };

  const extractDetails = (content) => {
    if (!content) {
      console.warn("Content is undefined or null, returning default values.");
      return {
        write: "없음",
        name: "없음",
        phone: "없음",
        rentalDateTime: "없음",
        returnDateTime: "없음",
        pickupLocation: "없음",
      };
    }

    const lines = content.split("\n");
    const details = {
      write: "없음",
      name: "없음",
      phone: "없음",
      rentalDateTime: "없음",
      returnDateTime: "없음",
      pickupLocation: "없음",
    };

    for (let line of lines) {
      if (line.startsWith("✍️ 문의 내용:")) details.write = line.replace("✍️ 문의 내용: ", "").trim() || "없음";
      else if (line.startsWith("👤 성함:")) details.name = line.replace("👤 성함: ", "").trim() || "없음";
      else if (line.startsWith("📞 전화번호:")) details.phone = line.replace("📞 전화번호: ", "").trim() || "없음";
      else if (line.startsWith("📅 대여 날짜/시간:")) details.rentalDateTime = line.replace("📅 대여 날짜/시간: ", "").trim() || "없음";
      else if (line.startsWith("📆 반납 날짜/시간:")) details.returnDateTime = line.replace("📆 반납 날짜/시간: ", "").trim() || "없음";
      else if (line.startsWith("📍 희망 수령 지점:")) details.pickupLocation = line.replace("📍 희망 수령 지점: ", "").trim() || "없음";
    }

    return details;
  };

  const details = post ? extractDetails(post.content) : {};

  const renderGoogleMap = () => {
    if (!isLoaded) {
      return (
        <Box sx={{ height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography>지도를 불러오는 중...</Typography>
        </Box>
      );
    }

    if (post.rental && post.rental.lat && post.rental.lng) {
      return (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: post.rental.lat, lng: post.rental.lng }}
          zoom={15}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onUnmount={() => {
            mapRef.current = null;
          }}
        >
          <Marker position={{ lat: post.rental.lat, lng: post.rental.lng }} title={post.rental.rentalLocation} />
        </GoogleMap>
      );
    }

    return (
      <Typography variant="body1" sx={{ color: "#e65100", fontSize: "16px", lineHeight: "1.8", ml: 2 }}>
        위치 정보가 없습니다.
      </Typography>
    );
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3, bgcolor: "#FFFFFF", borderRadius: "12px", boxShadow: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#333", textAlign: "center" }}>
        대여 문의 상세
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, color: "#666", textAlign: "center" }}>
        작성일: {new Date(post.date).toLocaleString()}
      </Typography>

      {showContent ? (
        <>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ width: "80%", height: "350px", bgcolor: "#ddd", borderRadius: 2, overflow: "hidden" }}>
                <img
                  src={post.product?.imageUrl || productImage}
                  alt={post.product?.name || productName}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1 }}>제품 이름</Typography>
              <Typography variant="h5" fontWeight="bold">{post.product?.name || productName}</Typography>
            </Grid>
          </Grid>

          {/* 대여비 정보를 별도의 강조 박스로 표시 */}
          <Box
            sx={{
              width: "100%",
              p: 2,
              mb: 2,
              borderRadius: "8px",
              bgcolor: "#fff3e0",
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

          {/* 필독 사항 섹션 */}
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

          <TextField label="제목" fullWidth value={post.title} InputProps={{ readOnly: true }} sx={{ mb: 2 }} />

          <Box sx={{ width: "100%", p: 2, mb: 2, borderRadius: "8px", bgcolor: "#fff3e0", boxShadow: "0 2px 4px rgba(255, 152, 0, 0.2)" }}>
            <Typography variant="subtitle1" sx={{ color: "#e65100", fontWeight: "bold", mb: 2, textAlign: "center" }}>
              소중한 고객님의 문의 내역입니다.
            </Typography>
            <Typography variant="body1" sx={{ color: "#e65100", fontSize: "16px", lineHeight: "1.8", mb: 1 }}>
              ✍️ 문의 내용: {details.write}
            </Typography>
            <Typography variant="body1" sx={{ color: "#e65100", fontSize: "16px", lineHeight: "1.8", mb: 1 }}>
              👤 성함: {details.name}
            </Typography>
            <Typography variant="body1" sx={{ color: "#e65100", fontSize: "16px", lineHeight: "1.8", mb: 1 }}>
              📞 전화번호: {details.phone}
            </Typography>
            <Typography variant="body1" sx={{ color: "#e65100", fontSize: "16px", lineHeight: "1.8", mb: 1 }}>
              📅 대여 날짜/시간: {details.rentalDateTime}
            </Typography>
            <Typography variant="body1" sx={{ color: "#e65100", fontSize: "16px", lineHeight: "1.8", mb: 1 }}>
              📆 반납 날짜/시간: {details.returnDateTime}
            </Typography>
            <Typography variant="body1" sx={{ color: "#e65100", fontSize: "16px", lineHeight: "1.8", mb: 1 }}>
              📍 희망 수령 지점: {details.pickupLocation}
            </Typography>
            {post.rental && post.rental.lat && post.rental.lng && (
              <Box sx={{ borderRadius: "12px", overflow: "hidden", mt: 1 }}>
                {renderGoogleMap()}
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="outlined" color="error" sx={{ fontSize: "16px", px: 4, py: 1.5, borderRadius: "8px" }} onClick={handleDeleteClick}>
              삭제하기
            </Button>
            <Button variant="contained" sx={{ fontSize: "16px", px: 4, py: 1.5, borderRadius: "8px" }} onClick={() => navigate("/rental-inquiry")}>
              목록으로 돌아가기
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ mb: 2, textAlign: "center" }}>
          <Alert severity="info" sx={{ width: "100%", mb: 2, fontSize: "16px", justifyContent: "center" }}>
            내용을 보려면 비밀번호를 입력하세요!
          </Alert>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <TextField
              type="password"
              label="비밀번호 (4자리 숫자)"
              variant="outlined"
              value={inputPassword}
              onChange={handlePasswordChange}
              inputProps={{ maxLength: 4, pattern: "[0-9]*" }}
              sx={{ maxWidth: "300px" }}
            />
            <Button variant="contained" onClick={handlePasswordSubmit} sx={{ fontSize: "16px", px: 4, py: 1.5, borderRadius: "8px" }}>
              확인
            </Button>
          </Box>
        </Box>
      )}

      <Modal open={openDeleteModal} onClose={handleDeleteCancel}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            삭제하시겠습니까?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            이 작업은 되돌릴 수 없습니다.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" color="error" onClick={handleDeleteConfirm} sx={{ px: 4, py: 1.5, borderRadius: "8px" }}>
              확인
            </Button>
            <Button variant="outlined" onClick={handleDeleteCancel} sx={{ px: 4, py: 1.5, borderRadius: "8px" }}>
              취소
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}