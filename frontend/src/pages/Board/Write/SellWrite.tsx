import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // "X" 아이콘 사용
import { Post } from "../../../types/post";
import CustomButton from "../../../components/CustomButton"; // Importing CustomButton
import { useTheme } from "@mui/material/styles";

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

  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

藉
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
    if (
      !sellerName.trim() ||
      !contact.trim() ||
      !accountHolder.trim() ||
      !bankName.trim() ||
      !accountNumber.trim()
    ) {
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
      images: images.map((file) => file?.name).filter(Boolean),
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
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[900] // Unified dark mode background
            : "white",
        color:
          theme.palette.mode === "dark"
            ? theme.palette.text.primary // Unified dark mode text
            : "black",
        padding: 3,
        borderRadius: "8px",
        border: `1px solid ${
          theme.palette.mode === "dark"
            ? theme.palette.grey[700] // Unified dark mode border
            : "#808080"
        }`,
      }}
    >
      {/* 공개/비공개 설정 (오른쪽 정렬로 제목 위로 이동) */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            공개/비공개
          </Typography>
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
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          sx={{
            mb: 1,
            "& .MuiOutlinedInput-root": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[800] // Unified dark mode input background
                  : "white",
            },
            "& .MuiInputLabel-root": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.secondary // Unified dark mode label
                  : "black",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[600] // Unified dark mode border
                  : "#808080",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[500]
                  : "rgba(0, 0, 0, 0.87)",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
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
          onChange={(e) => {
            setContent(e.target.value);
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[800]
                  : "white",
            },
            "& .MuiInputLabel-root": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.secondary
                  : "black",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[600]
                  : "#808080",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[500]
                  : "rgba(0, 0, 0, 0.87)",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
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
          onChange={(e) => {
            setSellerName(e.target.value);
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[800]
                  : "white",
            },
            "& .MuiInputLabel-root": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.secondary
                  : "black",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[600]
                  : "#808080",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[500]
                  : "rgba(0, 0, 0, 0.87)",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }}
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
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[800]
                  : "white",
            },
            "& .MuiInputLabel-root": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.secondary
                  : "black",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[600]
                  : "#808080",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[500]
                  : "rgba(0, 0, 0, 0.87)",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }}
        />
        <TextField
          label="입금받으실 계좌 성함"
          variant="outlined"
          size="small"
          fullWidth
          value={accountHolder}
          onChange={(e) => {
            setAccountHolder(e.target.value);
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[800]
                  : "white",
            },
            "& .MuiInputLabel-root": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.secondary
                  : "black",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[600]
                  : "#808080",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[500]
                  : "rgba(0, 0, 0, 0.87)",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel
            id="bank-select-label"
            sx={{
              fontSize: "0.9rem",
              top: "-6px",
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.secondary
                  : "black",
            }}
          >
            은행이름
          </InputLabel>
          <Select
            labelId="bank-select-label"
            value={bankName}
            label="은행이름"
            size="small"
            onChange={(e) => {
              setBankName(e.target.value);
            }}
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[800]
                  : "white",
              fontSize: "0.9rem",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[600]
                    : "rgba(0, 0, 0, 0.23)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[500]
                    : "rgba(0, 0, 0, 0.87)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
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
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[800]
                  : "white",
            },
            "& .MuiInputLabel-root": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.secondary
                  : "black",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[600]
                  : "#808080",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[500]
                  : "rgba(0, 0, 0, 0.87)",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
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
              onClick={() => {
                handleAddImage(index);
              }} // 이미지 선택 클릭 핸들러
            />
            {imagePreviews[index] && (
              <Box
                sx={{
                  maxWidth: 400,
                  maxHeight: 400,
                  overflow: "hidden",
                  mt: 1,
                  position: "relative",
                }}
              >
                <img
                  src={imagePreviews[index]}
                  alt={`미리 보기 ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    handleRemoveImage(index);
                  }}
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
              onChange={(e) => {
                handleFileChange(index, e);
              }}
            />
          </Box>
        ))}
      </Box>

      {/* 게시물 공개 설정 */}
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}
      >
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
            sx={{
              mt: 1,
              maxWidth: "300px",
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[800]
                    : "white",
              },
              "& .MuiInputLabel-root": {
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.secondary
                    : "black",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[600]
                    : "#808080",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[500]
                    : "rgba(0, 0, 0, 0.87)",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
            }}
          />
        )}
      </Box>

      {/* 게시글 등록 버튼 (CustomButton으로 변경) */}
      <CustomButton
        label="게시글 등록하기"
        size="colorkingbiglarge" // Use the same size as in BuyWrite
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