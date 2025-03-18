import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton"; // CustomButton 임포트

// 공지사항 타입 정의
interface Notice {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  content: string; // ✅ content 필드 추가
}

const NoticePage = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchNotices = () => {
      const storedNotices = JSON.parse(sessionStorage.getItem("notices") || "[]");

      const data = storedNotices.length
        ? storedNotices
        : [
            {
              id: 1,
              title: "📸 거래 전 제품 상태 확인 필수!",
              author: "관리자",
              date: "2025-02-28",
              views: 120,
              content: `중고 카메라를 구매하기 전 반드시 제품 상태를 점검해야 합니다.`
            },
            {
              id: 2,
              title: "💳 안전한 결제 방식을 이용하세요",
              author: "관리자",
              date: "2025-02-27",
              views: 95,
              content: `사기를 방지하기 위해 안전한 결제 방식을 이용하세요.`
            },
          ];

      sessionStorage.setItem("notices", JSON.stringify(data)); // ✅ content 포함하여 저장
      setNotices(data);
    };

    fetchNotices();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {/* 공지사항 */}
      </Typography>

      <Box
        sx={{
          mb: 3,
          textAlign: "center",
          border: "1px solid #ddd", 
          borderRadius: "8px", 
          padding: 2,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
        }}
      >
        <img
          src="/image/notice/notice02.jpg"
          alt="공지사항 이미지"
          style={{
            width: "800px",
            height: "auto",
            borderRadius: "8px",
          }}
        />
      </Box>

      <Box
        sx={{
          padding: 3,
          borderRadius: "8px",
          border: "1px solid #ddd",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "background.paper",
        }}
      >
        {notices.map((notice) => (
          <Card
            key={notice.id}
            sx={{
              p: 2,
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "none",
              mb: 2,
              cursor: "pointer",
            }}
          >
            <CardActionArea
              onClick={() => {
                navigate(`/notice/detail/${notice.id}`);
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {notice.title}
                </Typography>
              </Box>

              {notice.id === 1 && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <img
                    src="/image/notice/notice00.jpg"
                    alt="공지사항 이미지"
                    style={{
                      width: "800px",
                      height: "auto",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </Box>
              )}

              {notice.id === 2 && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <img
                    src="/image/notice/notice01.jpg"
                    alt="공지사항 이미지"
                    style={{
                      width: "800px",
                      height: "auto",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </Box>
              )}

              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mt: 1 }}>
                <Typography variant="caption" color="text.primary" fontWeight="bold">
                  {notice.author}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notice.date} • 조회수 {notice.views}
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        {/* CustomButton으로 대체 */}
        <CustomButton
          label="메인으로 돌아가기"
          size="medium"
          onClick={() => navigate("/")}
        />
      </Box>
    </Container>
  );
};

export default NoticePage;
