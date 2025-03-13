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
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close"; // "X" 아이콘 사용
import { Post } from "../../../types/post";
import CustomButton from "../../../components/CustomButton"; // Importing CustomButton

export default function SellWrite() {
  const navigate = useNavigate();
  const theme = useTheme(); // Access current theme

  // State management for form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [sellerName, setSellerName] = useState("");
  const [contact, setContact] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [imageBase64s, setImageBase64s] = useState<string[]>([]); // Store Base64 strings

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  // 초기화: 3개의 이미지 슬롯 준비
  useEffect(() => {
    setImages(new Array(3).fill(null));
    setImagePreviews(new Array(3).fill(""));
    setImageBase64s(new Array(3).fill(""));
    fileInputRefs.current = new Array(3).fill(null);
  }, []);

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIsPublic = !e.target.checked;
    console.log("isPublic changed to:", newIsPublic);
    setIsPublic(newIsPublic);
  };

  const handleAddImage = (index: number) => {
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

  // 이미지 삭제 함수 (개선됨)
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = null; // null로 초기화
    setImages(updatedImages);

    const updatedPreviews = [...imagePreviews];
    if (updatedPreviews[index]) {
      URL.revokeObjectURL(updatedPreviews[index]); // 메모리 해제
    }
    updatedPreviews[index] = "";
    setImagePreviews(updatedPreviews);

    const updatedBase64s = [...imageBase64s];
    updatedBase64s[index] = "";
    setImageBase64s(updatedBase64s);

    // 파일 입력 초기화
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].value = "";
    }

    console.log(`이미지 ${index + 1} 삭제됨`);
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
    const match = /^(\d{0,3})(\d{0,4})(\d{0,4})$/.exec(cleaned);
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
      date: new Date().toISOString(),
      views: 0,
      author: { name: sellerName, avatar: "/static/images/avatar/default.png" },
      tag: "매각문의",
      locked: !isPublic,
      password: !isPublic ? password : undefined,
      images: images.map((file) => file.name).filter(Boolean),
      contact,
      accountHolder,
      bankName,
      accountNumber,
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
          onChange={(e) => { setTitle(e.target.value); }}
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
          onChange={(e) => { setContent(e.target.value); }}
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

      {/* 추가된 입력 필드들 */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="성함"
          variant="outlined"
          size="small"
          fullWidth
          value={sellerName}
          onChange={(e) => { setSellerName(e.target.value); }}
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
          onChange={(e) => { setAccountHolder(e.target.value); }}
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
            onChange={(e) => { setBankName(e.target.value); }}
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

            <CustomButton
              label={images[index] ? images[index].name : `이미지 ${index + 1}`}
              size="medium"
              onClick={() => { handleAddImage(index); }} // 이미지 선택 클릭 핸들러
            />
            {imagePreviews[index] && (
              <Box sx={{ maxWidth: 400, maxHeight: 400, overflow: "hidden", mt: 1, position: "relative" }}>
                <img
                  src={imagePreviews[index]}
                  alt={`미리 보기 ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => { handleRemoveImage(index); }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={(el) => (fileInputRefs.current[index] = el)}
              onChange={(e) => { handleFileChange(index, e); }}
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

