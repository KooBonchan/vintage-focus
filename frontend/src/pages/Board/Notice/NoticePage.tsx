import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    // ✅ sessionStorage에서 공지사항 데이터를 불러오기
    const fetchNotices = () => {
      const storedNotices = JSON.parse(sessionStorage.getItem("notices") || "[]");

      let data = storedNotices.length
        ? storedNotices
        : [
            {
              id: 1,
              title: "📸 거래 전 제품 상태 확인 필수!",
              author: "관리자",
              date: "2025-02-28",
              views: 120,
              content: `중고 카메라를 구매하기 전 반드시 제품 상태를 점검해야 합니다.
              
              ✅ **1. 외관 및 바디 확인**
              - 바디에 기스나 충격 흔적이 있는지 체크
              - 렌즈 마운트 부분의 손상 여부 확인
              
              ✅ **2. 센서 및 렌즈 점검**
              - 렌즈 내 먼지, 곰팡이 여부 체크
              - 센서에 핫픽셀, 스크래치가 있는지 확인

              구매 전에 제품 상태를 꼼꼼히 살펴보고 신뢰할 수 있는 판매자로부터 거래하세요.`,
            },
            {
              id: 2,
              title: "💳 안전한 결제 방식을 이용하세요",
              author: "관리자",
              date: "2025-02-27",
              views: 95,
              content: `사기를 방지하기 위해 안전한 결제 방식을 이용하세요.
              
              ✅ **1. 직거래를 선호하세요**
              - 카페, 경찰서 직거래존 등 공공장소에서 거래
              
              ✅ **2. 온라인 거래 시 에스크로 서비스 이용**
              - 네이버페이 안전거래, 번개장터 안전결제 활용
              
              ✅ **3. 계좌이체 거래 시 주의사항**
              - 판매자의 계좌번호를 '더치트'에서 사기 이력 조회
              - 본인 명의가 아닌 타인의 계좌 요구 시 거래 금지

              안전한 결제를 통해 사기 피해를 예방하세요!`,
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
        공지사항
      </Typography>

      {/* 이미지 추가 - 공지사항 목록 위에 배치 */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <img
          src="/image/notice/notice02.jpg" // 상대 경로로 이미지 불러오기
          alt="공지사항 이미지"
          style={{
            width: "800px", // 이미지 크기를 800px로 설정
            height: "auto",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>

      {/* 공지사항 리스트 */}
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

            {/* ID 1번에 이미지 추가 */}
            {notice.id === 1 && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <img
                  src="/image/notice/notice00.jpg" // 상대 경로로 이미지 불러오기
                  alt="공지사항 이미지"
                  style={{
                    width: "800px", // 이미지 크기를 800px로 설정
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Box>
            )}

            {/* ID 2번에 이미지 추가 */}
            {notice.id === 2 && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <img
                  src="/image/notice/notice01.jpg" // 상대 경로로 이미지 불러오기
                  alt="공지사항 이미지"
                  style={{
                    width: "800px", // 이미지 크기를 800px로 설정
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
    </Container>
  );
};

export default NoticePage;
