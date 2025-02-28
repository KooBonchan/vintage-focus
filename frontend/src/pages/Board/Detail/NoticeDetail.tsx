import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, Card } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// 공지사항 타입 정의
interface Notice {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  content: string;
}

const NoticeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const fetchNotice = async () => {
      const storedNotices = JSON.parse(sessionStorage.getItem("notices") || "[]");

      const foundNotice = storedNotices.find((n) => n.id === Number(id));

      if (foundNotice) {
        // ✅ 조회수 증가 처리
        const updatedNotice = { ...foundNotice, views: foundNotice.views + 1 };

        // ✅ 업데이트된 조회수를 `sessionStorage`에 반영
        const updatedNotices = storedNotices.map((n) => (n.id === updatedNotice.id ? updatedNotice : n));
        sessionStorage.setItem("notices", JSON.stringify(updatedNotices));

        // ✅ 상태 업데이트
        setNotice(updatedNotice);
      }
    };

    fetchNotice();
  }, [id]);

  if (!notice) return <Typography>공지사항을 찾을 수 없습니다.</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
        뒤로 가기
      </Button>

      <Card sx={{ p: 4, mt: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          {notice.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {notice.date} • 작성자: {notice.author} • 조회수 {notice.views}
        </Typography>

        <Box sx={{ mt: 3, borderTop: "1px solid #ddd", pt: 3 }}>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {notice.content}
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default NoticeDetail;
