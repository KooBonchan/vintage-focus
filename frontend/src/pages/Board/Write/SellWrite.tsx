// SellWrite.tsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Post } from "../../../types/post";

export default function SellWrite() {
  const navigate = useNavigate();

  // State management for form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(["", "", ""]);
  const [sellerName, setSellerName] = useState("");
  const [contact, setContact] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [imageBase64s, setImageBase64s] = useState<string[]>([]); // Store Base64 strings

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null]);

  // List of Korean banks
  const bankList = [
    "국민은행",
    "신한은행",
    "우리은행",
    "하나은행",
    "농협은행",
    "기업은행",
    "SC제일은행",
    "수협은행",
    "산업은행",
    "한국씨티은행",
    "카카오뱅크",
    "토스뱅크",
  ];

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIsPublic = !e.target.checked;
    console.log("isPublic changed to:", newIsPublic);
    setIsPublic(newIsPublic);
  };

  const handleAddImage = (index: number) => {
    console.log(`이미지 ${index + 1} 첨부 클릭`);
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]?.click();
    }
  };

  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      const updatedPreviews = [...imagePreviews];
      updatedPreviews[index] = previewUrl;
      setImagePreviews(updatedPreviews);

      // Convert image to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedBase64s = [...imageBase64s];
        updatedBase64s[index] = base64String;
        setImageBase64s(updatedBase64s);
      };
      reader.readAsDataURL(file);

      console.log(`이미지 ${index + 1} 선택됨:`, file.name);
    }
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        if (preview) URL.revokeObjectURL(preview);
      });
    };
  }, [imagePreviews]);

  // Format phone number with hyphens
  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,4})(\d{0,4})$/);
    if (match) {
      return !match[2]
        ? match[1]
        : `${match[1]}-${match[2]}${match[3] ? `-${match[3]}` : ""}`;
    }
    return input;
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }
    if (!sellerName.trim() || !contact.trim() || !accountHolder.trim() || !bankName.trim() || !accountNumber.trim()) {
      alert("성함, 연락처, 계좌 정보를 모두 입력해주세요!");
      return;
    }
    if (!isPublic && password.length !== 4) {
      alert("비밀번호는 4자리 숫자로 입력해주세요!");
      return;
    }

    const now = new Date();
    const formattedDate = now.toISOString();

    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      date: formattedDate,
      views: 0,
      author: { name: sellerName, avatar: "/static/images/avatar/default.png" },
      tag: "매각문의",
      locked: !isPublic,
      password: !isPublic ? password : undefined,
      images: imageBase64s.filter(Boolean), // Store Base64 strings
      contact,
      accountHolder,
      bankName,
      accountNumber,
    };

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
        backgroundColor: "white",
        padding: 3,
        borderRadius: "8px",
      }}
    >
      {/* 제목 입력 */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="제목"
          variant="outlined"
          size="small"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 1, "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
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
          sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
        />
      </Box>

      {/* 추가된 입력 필드들 */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="성함"
          variant="outlined"
          size="small"
          fullWidth
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
          sx={{ mb: 2, "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
        />
        <TextField
          label="연락처 (예: 010-1234-5678)"
          variant="outlined"
          size="small"
          fullWidth
          value={contact}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            setContact(formatted);
          }}
          placeholder="010-1234-5678"
          inputProps={{ maxLength: 13 }}
          sx={{ mb: 2, "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
        />
        <TextField
          label="입금받으실 계좌 성함"
          variant="outlined"
          size="small"
          fullWidth
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
          sx={{ mb: 2, "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="bank-select-label" sx={{ fontSize: "0.9rem", top: "-6px" }}>
            은행이름
          </InputLabel>
          <Select
            labelId="bank-select-label"
            value={bankName}
            label="은행이름"
            size="small"
            onChange={(e) => setBankName(e.target.value)}
            sx={{
              backgroundColor: "white",
              fontSize: "0.9rem",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23)",
                borderWidth: "1px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.87)",
                borderWidth: "1px",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
                borderWidth: "1px",
              },
              "& .MuiSelect-select": {
                padding: "8px 32px 8px 14px",
              },
            }}
          >
            <MenuItem value="">
              <em>선택하세요</em>
            </MenuItem>
            {bankList.map((bank) => (
              <MenuItem key={bank} value={bank}>
                {bank}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="입금받으실 계좌"
          variant="outlined"
          size="small"
          fullWidth
          value={accountNumber}
          onChange={(e) => {
            const input = e.target.value.replace(/[^0-9-]/g, "");
            setAccountNumber(input);
          }}
          sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
        />
      </Box>

      {/* 이미지 첨부 버튼 및 미리 보기 */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        {[0, 1, 2].map((index) => (
          <Box key={index} sx={{ textAlign: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleAddImage(index)}
              sx={{ minWidth: 120, height: 40, mb: 1 }}
            >
              {images[index] ? images[index].name : `이미지 ${index + 1}`}
            </Button>
            {imagePreviews[index] && (
              <Box sx={{ maxWidth: 400, maxHeight: 400, overflow: "hidden", mt: 1 }}>
                <img
                  src={imagePreviews[index]}
                  alt={`미리 보기 ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            )}
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

      {/* 안내사항 */}
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
      </Box>

      {/* 게시물 공개 설정 */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>공개/비공개</Typography>
        <FormControlLabel
          control={<Switch checked={!isPublic} onChange={handleSwitchChange} />}
          label=""
          sx={{ m: 0 }}
        />
        {!isPublic && (
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
            sx={{ mt: 1, maxWidth: "300px", mb: 2 }}
          />
        )}
      </Box>

      {/* 등록 버튼 */}
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        게시글 등록하기
      </Button>
    </Box>
  );
}