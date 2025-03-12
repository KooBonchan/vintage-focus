import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Switch, FormControlLabel, useTheme } from "@mui/material";
import { Post } from "../../../types/post";
import CustomButton from "../../../components/CustomButton"; // Importing CustomButton

export default function SellWrite() {
  const navigate = useNavigate();
  const theme = useTheme(); // Access current theme

  // 게시글 데이터 상태 관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true); // 공개/비공개 상태 (기본값: 공개, 스위치 비활성화)
  const [password, setPassword] = useState(""); // 비밀번호 (비공개 시 필수)
  const [images, setImages] = useState<File[]>([]); // 선택된 이미지 파일 저장
  const [imagePreviews, setImagePreviews] = useState<string[]>(["", "", ""]); // 이미지 미리 보기 URL 저장

  // 파일 입력 참조 (각 버튼에 대해 개별적으로 관리)
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null]);

  // 스위치 상태 변경 핸들러 (논리 반대로 설정)
  const handleSwitchChange = (e) => {
    const newIsPublic = !e.target.checked; // 스위치가 체크되면 isPublic을 false로 설정
    setIsPublic(newIsPublic);
  };

  // 이미지 첨부 버튼 클릭 핸들러
  const handleAddImage = (index: number) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]?.click();
    }
  };

  // 파일 선택 핸들러
  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file; // 해당 인덱스에 파일 저장
      setImages(updatedImages);

      // 미리 보기 URL 생성
      const previewUrl = URL.createObjectURL(file);
      const updatedPreviews = [...imagePreviews];
      updatedPreviews[index] = previewUrl; // 해당 인덱스에 미리 보기 URL 저장
      setImagePreviews(updatedPreviews);
    }
  };

  // 게시글 등록 함수
  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    if (!isPublic && password.length !== 4) {
      alert("비밀번호는 4자리 숫자로 입력해주세요!");
      return;
    }

    // 게시글 객체 생성
    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      date: new Date().toISOString(),
      views: 0,
      author: { name: "판매 희망자", avatar: "/static/images/avatar/default.png" },
      tag: "매각문의",
      locked: !isPublic,
      password: !isPublic ? password : undefined,
      images: images.map((file) => file?.name).filter(Boolean),
    };

    // 게시글 저장
    const posts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    sessionStorage.setItem("posts", JSON.stringify([newPost, ...posts]));

    alert("게시글이 성공적으로 등록되었습니다.");
    navigate("/sell-inquiry");
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
        backgroundColor: theme.palette.mode === 'dark' ? '#333' : 'white', // Dark mode background, light mode defaults to white
        color: theme.palette.mode === 'dark' ? 'white' : 'black', // Dark mode text color, light mode defaults to black
        padding: 3,
        borderRadius: "8px",
        border: `1px solid ${theme.palette.mode === 'dark' ? '#fff' : '#808080'}`, // Border color for light mode (gray), and white for dark mode
      }}
    >
      {/* 공개/비공개 설정 (오른쪽 정렬로 제목 위로 이동) */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>공개/비공개</Typography>
          <FormControlLabel
            control={<Switch checked={!isPublic} onChange={handleSwitchChange} />}
            label=""
            sx={{ m: 0 }}
          />
        </Box>
      </Box>

      {/* 제목 입력 */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="제목"
          variant="outlined"
          size="small"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            mb: 1,
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.palette.mode === 'dark' ? '#555' : 'white', // Dark mode input background
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.mode === 'dark' ? 'white' : 'black', // Dark mode label color
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.mode === 'dark' ? 'white' : '#808080', // Light mode border is gray
            },
          }}
        />
      </Box>

      {/* 문의 내용 */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="문의 내용"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.palette.mode === 'dark' ? '#555' : 'white', // Dark mode input background
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.mode === 'dark' ? 'white' : 'black', // Dark mode label color
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.mode === 'dark' ? 'white' : '#808080', // Light mode border is gray
            },
          }}
        />
      </Box>

      {/* 이미지 첨부 버튼 및 미리 보기 */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        {[0, 1, 2].map((index) => (
          <Box key={index} sx={{ textAlign: "center" }}>
            <CustomButton
              label={images[index] ? images[index].name : `이미지 ${index + 1}`}
              size="medium"
              onClick={() => handleAddImage(index)} // 이미지 선택 클릭 핸들러
            />
            {/* 미리 보기 이미지 */}
            {imagePreviews[index] && (
              <Box sx={{ maxWidth: 400, maxHeight: 400, overflow: "hidden", mt: 1 }}>
                <img
                  src={imagePreviews[index]}
                  alt={`미리 보기 ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            )}
            {/* 숨겨진 파일 입력 요소 */}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={(el) => (fileInputRefs.current[index] = el)}
              onChange={(e) => handleFileChange(index, e)}
            />
          </Box>
        ))}
      </Box>

      {/* 비밀번호 입력 (비공개일 경우) */}
      {!isPublic && (
        <Box sx={{ mb: 3 }}>
          <TextField
            label="비밀번호 (4자리 숫자)"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, "");
              if (e.target.value !== input) {
                alert("비밀번호는 숫자만 입력 가능합니다!");
              }
              if (input.length <= 4) {
                setPassword(input);
              }
            }}
            inputProps={{ maxLength: 4, pattern: "[0-9]*" }}
            sx={{
              mt: 1,
              maxWidth: "300px",
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: theme.palette.mode === 'dark' ? '#555' : 'white', // Dark mode input background
              },
              "& .MuiInputLabel-root": {
                color: theme.palette.mode === 'dark' ? 'white' : 'black', // Dark mode label color
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.mode === 'dark' ? 'white' : '#808080', // Light mode border is gray
              },
            }}
          />
        </Box>
      )}

      {/* 게시글 등록하기 버튼 */}
      <CustomButton
        label="게시글 등록하기"
        size="colorkingbiglarge" // Use the size prop as per your specification
        onClick={handleSubmit} // Submit the form on button click
      />

      {/* 이미지 추가 */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
        <img
          src="/image/notice/mooni.jpg" // Use relative path to the image
          alt="공지사항"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
}



      
      /* 안내사항
<Box sx={{ backgroundColor: "#e3f2fd", padding: 2, borderRadius: 2, mb: 3 }}>
  <Typography variant="h6" component="div" color="text.primary" sx={{ fontWeight: "bold", mb: 1 }}>
    안내사항
  </Typography>
  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
     <Typography variant="body1" color="primary" fontWeight="bold">
              ※ 매입 가능 제품: DSLR, 미러리스, 필름 카메라 및 렌즈 (브랜드: 캐논, 니콘, 소니, 후지필름 등)
            </Typography>
            <Typography variant="body1" color="error" fontWeight="bold">
              ※ 매입 불가 제품: 심각한 침수 제품, 수리 이력 있는 제품, 정품이 아닌 제품
            </Typography>
    <Typography variant="body1" color="text.primary">
      ※ 최종 구매 상담은 빈티지포커스 고객센터에서 고객님께 연락을 드려 유선 상담 후에 확정됩니다.
    </Typography>
    <Typography variant="body1" color="text.primary">
      ※ 변경 사항이 있을 시 게시글을 수정하시면 담당 직원의 확인이 어렵습니다. 번거롭더라도 게시글을 새롭게 작성해 주세요.
    </Typography>
    <Typography variant="body1" color="text.primary">
      ※ 기타 문의사항은 고객센터 <strong>(1588-5454)</strong> 로 연락 주시면 친절히 상담해 드리겠습니다.
    </Typography>
 

    <Typography variant="body1" color="text.primary">
      ※ 제품 상태 기준: 기능 정상 작동 필수, 심각한 파손 제품은 매입 불가
    </Typography>
    <Typography variant="body1" color="text.primary">
      ※ 박스 및 구성품 포함 여부에 따라 가격이 달라질 수 있습니다.
    </Typography>
    <Typography variant="body1" color="text.primary">
      ※ 매입 가격은 제품 상태 및 시장 변동에 따라 조정될 수 있습니다.
    </Typography>
    <Typography variant="body1" color="text.primary">
      ※ 택배 거래 가능 (왕복 배송비는 고객 부담), 방문 접수 가능 (운영시간: 평일 10:00 - 18:00)
    </Typography>
    <Typography variant="body1" color="text.primary">
      ※ 당사에서 제품 수령 이후 매입 금액이 마음에 드시지 않을 시, 왕복 배송비는 고객님께서 부담해주셔야합니다.
    </Typography>
  </Box>
</Box> */