import { Box, Button, Typography, TextField, Alert, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function RentalDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [inputPassword, setInputPassword] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const { productName = "제품이름", productImage = "https://via.placeholder.com/500x450" } = location.state || {};

  const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_API_KEY"; // 실제 API 키로 교체

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const defaultNoticeItems = [
    "대여하실 날짜와 시간, 반납하실 날짜와 시간을 선택해주세요.",
    "대여와 반납은 반드시 같은 지점에서 해 주셔야 합니다.",
    "일반카메라용 메모리카드는 기본으로 제공되지 않습니다.",
  ];

  useEffect(() => {
    const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    const foundPost = storedPosts.find((p) => p.id.toString() === id);
    console.log("Found post from sessionStorage:", foundPost); // 디버깅용 로그
    setPost(foundPost);

    const queryParams = new URLSearchParams(location.search);
    const isUnlocked = queryParams.get("unlocked") === "true";

    if (foundPost) {
      if (!foundPost.locked || isUnlocked) {
        setShowContent(true);
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

  const handleDelete = () => {
    if (post.locked && post.password !== inputPassword) {
      alert("비밀번호가 틀렸습니다.");
      return;
    }

    const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    const updatedPosts = storedPosts.filter((p) => p.id.toString() !== id);
    sessionStorage.setItem("posts", JSON.stringify(updatedPosts));

    alert("게시글이 삭제되었습니다.");
    navigate("/rental-inquiry");
  };

  const handlePasswordSubmit = () => {
    if (post.password === inputPassword) {
      setShowContent(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (e.target.value !== input) alert("숫자만 입력 가능합니다.");
    if (input.length <= 4) setInputPassword(input);
  };

  // content에서 필요한 정보를 개별적으로 추출
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
    console.log("Extracting from content:", content); // 디버깅용 로그

    for (let line of lines) {
      if (line.startsWith("✍️ 문의 내용:")) {
        details.write = line.replace("✍️ 문의 내용: ", "").trim() || "없음";
      } else if (line.startsWith("👤 성함:")) {
        details.name = line.replace("👤 성함: ", "").trim() || "없음";
      } else if (line.startsWith("📞 전화번호:")) {
        details.phone = line.replace("📞 전화번호: ", "").trim() || "없음";
      } else if (line.startsWith("📅 대여 날짜/시간:")) {
        details.rentalDateTime = line.replace("📅 대여 날짜/시간: ", "").trim() || "없음";
      } else if (line.startsWith("📆 반납 날짜/시간:")) {
        details.returnDateTime = line.replace("📆 반납 날짜/시간: ", "").trim() || "없음";
      } else if (line.startsWith("📍 희망 수령 지점:")) {
        details.pickupLocation = line.replace("📍 희망 수령 지점: ", "").trim() || "없음";
      }
    }

    return details;
  };

  const details = post ? extractDetails(post.content) : {};

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
          {/* 제품 이미지 및 이름 */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ width: "500px", height: "450px", bgcolor: "#ddd", borderRadius: 2, overflow: "hidden" }}>
                <img
                  src={post.product?.imageUrl || productImage}
                  alt={post.product?.name || productName}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                제품 이름
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {post.product?.name || productName}
              </Typography>
            </Grid>
          </Grid>

          {/* 필독 사항 */}
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

          {/* 소중한 고객님의 문의 내역 */}
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
              📍 희망 수령 지점: {details.pickupLocation} {/* 텍스트로 지점 이름 추가 */}
            </Typography>
            {post.rental && post.rental.lat && post.rental.lng ? (
              <Box sx={{ borderRadius: "12px", overflow: "hidden", mt: 1 }}>
                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} onLoad={() => setIsMapLoaded(true)}>
                  {isMapLoaded && (
                    <GoogleMap mapContainerStyle={mapContainerStyle} center={{ lat: post.rental.lat, lng: post.rental.lng }} zoom={15}>
                      <Marker position={{ lat: post.rental.lat, lng: post.rental.lng }} title={post.rental.rentalLocation} />
                    </GoogleMap>
                  )}
                </LoadScript>
              </Box>
            ) : (
              <Typography variant="body1" sx={{ color: "#e65100", fontSize: "16px", lineHeight: "1.8", ml: 2 }}>
                위치 정보가 없습니다.
              </Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="outlined" color="error" sx={{ fontSize: "16px", px: 4, py: 1.5, borderRadius: "8px" }} onClick={handleDelete}>
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
    </Box>
  );
}