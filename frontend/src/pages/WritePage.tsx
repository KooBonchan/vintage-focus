import React from "react";
import { useLocation } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function WritePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category") || "매각문의"; // 기본값: 매각문의

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto", textAlign: "center", p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {category} 게시글 작성
      </Typography>
      <TextField label="제목" fullWidth sx={{ mb: 2 }} />
      <TextField label="내용" fullWidth multiline rows={4} sx={{ mb: 2 }} />
      <Button variant="contained" color="primary">
        작성 완료
      </Button>
    </Box>
  );
}
