import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, TextField, Button, Switch, FormControlLabel } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function SellDetail() {
  const { id } = useParams(); // ✅ URL에서 id 가져오기

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
        backgroundColor: "#F8F8F8",
        padding: 3,
        borderRadius: "8px",
      }}
    >
      {/* ✅ 제품 정보 */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mb: 3 }}>
        {/* 제품 이미지 */}
        <Box
          sx={{
            width: 120,
            height: 120,
            backgroundColor: "#E0E0E0",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <FavoriteBorderIcon sx={{ position: "absolute", top: 8, left: 8 }} />
          <Typography variant="body2" color="textSecondary">
            이미지
          </Typography>
        </Box>

        {/* 제품 정보 */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            판매판매 (문의 {id})
          </Typography>
          <Typography variant="caption" sx={{ backgroundColor: "#4CAF50", color: "white", px: 1, py: 0.5, borderRadius: "4px" }}>
            제조사
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            등록번호
          </Typography>

          <TextField label="상품가격(원)" variant="outlined" size="small" fullWidth sx={{ mt: 1 }} />
        </Box>
      </Box>

      {/* ✅ 설명 & 주의사항 */}
      <Box sx={{ backgroundColor: "white", p: 2, borderRadius: "8px", mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          문의내용
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ● 대여일을 날짜와 시간, 반납하는 날짜와 시간을 적어주세요.
          <br />● 대여신청 후 변경 불가하니 신중히 작성해주세요.
          <br />● 대여 가능한 물품 리스트 검색해서 특정을 확인 바랍니다.
          <br />● 리퍼비쉬 제품은 기본적으로 제공되지 않습니다.
        </Typography>
      </Box>

      {/* ✅ 상세설명 */}
      <Box sx={{ backgroundColor: "white", p: 2, borderRadius: "8px", mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          설명(내역)
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>정확방법:</strong>
          <br /> 대여기간: 문장이 출력되도록 표시 (년,월,일, 시간, 분 단위까지 한 단위는 30분 단위로 절삭)
          <br /> 화재시 수령 방법: 택배 or 지정장소 수령
        </Typography>
      </Box>

      {/* ✅ 게시물 공개 설정 */}
      <Box sx={{ backgroundColor: "white", p: 2, borderRadius: "8px", mb: 3 }}>
        <FormControlLabel control={<Switch defaultChecked />} label="공개/비공개" />
        <TextField label="비밀번호" type="password" variant="outlined" size="small" fullWidth sx={{ mt: 1 }} />
      </Box>

      {/* ✅ 등록 버튼 */}
      <Button variant="contained" color="primary" fullWidth>
        게시글 등록하기
      </Button>
    </Box>
  );
}
