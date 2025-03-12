import { Box, Button, Card, CardContent, Divider, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Post } from "../../../types/post";

export default function SellDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams(); // URL 쿼리 파라미터 사용
  const [post, setPost] = useState<Post | null>(null);
  const [inputPassword, setInputPassword] = useState("");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    try {
      const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
      console.log("저장된 게시글:", storedPosts);
      const foundPost = storedPosts.find((p: Post) => p.id.toString() === id);
      console.log("찾은 게시글:", foundPost);
      if (foundPost) {
        setPost(foundPost);
        // URL 쿼리 파라미터와 sessionStorage에서 인증 여부 확인
        const isAuthenticatedByQuery = searchParams.get("authenticated") === "true";
        const isAuthenticatedByStorage = sessionStorage.getItem(`post_${id}_authenticated`) === "true";
        const isAuthenticated = isAuthenticatedByQuery || isAuthenticatedByStorage;
        console.log("URL 쿼리 파라미터 (authenticated):", searchParams.get("authenticated"));
        console.log("sessionStorage 인증 상태:", sessionStorage.getItem(`post_${id}_authenticated`));
        console.log("최종 인증 여부 (isAuthenticated):", isAuthenticated);
        setShowContent(!foundPost.locked || isAuthenticated); // locked가 false이거나 인증된 경우
        console.log("showContent 초기값:", !foundPost.locked || isAuthenticated);
      } else {
        console.error("해당 ID의 게시글을 찾을 수 없습니다:", id);
      }
    } catch (error) {
      console.error("sessionStorage 파싱 오류:", error);
    }
  }, [id, searchParams]);

  if (!post) {
    return (
      <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3, textAlign: "center" }}>
        <Typography variant="h5">게시글을 찾을 수 없습니다.</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/sell-inquiry")}>
          목록으로 돌아가기
        </Button>
      </Box>
    );
  }

  const handleDelete = () => {
    if (post.locked && !showContent) {
      if (post.password === inputPassword) {
        setShowContent(true);
        if (window.confirm("이 게시글을 삭제하시겠습니까?")) {
          const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
          const updatedPosts = storedPosts.filter((p: Post) => p.id.toString() !== id);
          sessionStorage.setItem("posts", JSON.stringify(updatedPosts));
          // 인증 상태 제거
          sessionStorage.removeItem(`post_${id}_authenticated`);
          alert("게시글이 삭제되었습니다.");
          navigate("/sell-inquiry");
        }
      } else {
        alert("비밀번호가 틀렸습니다.");
      }
    } else {
      if (window.confirm("이 게시글을 삭제하시겠습니까?")) {
        const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
        const updatedPosts = storedPosts.filter((p: Post) => p.id.toString() !== id);
        sessionStorage.setItem("posts", JSON.stringify(updatedPosts));
        // 인증 상태 제거
        sessionStorage.removeItem(`post_${id}_authenticated`);
        alert("게시글이 삭제되었습니다.");
        navigate("/sell-inquiry");
      }
    }
  };

  const handlePasswordSubmit = () => {
    console.log("입력된 비밀번호:", inputPassword);
    console.log("저장된 비밀번호:", post.password);
    console.log("비밀번호 일치 여부:", post.password === inputPassword);

    if (post.password === inputPassword) {
      setShowContent(true);
      console.log("showContent 업데이트됨:", true);
      // 인증 상태를 sessionStorage에 저장
      sessionStorage.setItem(`post_${id}_authenticated`, "true");
      // URL에 authenticated 쿼리 파라미터 추가
      navigate(`/sell-inquiry/${id}?authenticated=true`, { replace: true });
    } else {
      alert("비밀번호가 틀렸습니다.");
      setInputPassword("");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3 }}>
      <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: "white" }}>
        <CardContent>
          {/* 제목 */}
          <Typography variant="h6" component="div" color="text.primary" sx={{ fontWeight: "bold", mb: 1 }}>
            제목
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {post.title || "제목이 없습니다."}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* 문의 내용 */}
          <Typography variant="h6" component="div" color="text.primary" sx={{ fontWeight: "bold", mb: 1 }}>
            문의 내용
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2, whiteSpace: "pre-wrap" }}>
            {showContent ? (post.content || "내용이 없습니다.") : "내용을 보려면 비밀번호를 입력하세요."}
          </Typography>

          {/* 첨부 이미지 */}
          {post.images && post.images.length > 0 && showContent && (
            <>
              <Typography variant="h6" component="div" color="text.primary" sx={{ fontWeight: "bold", mb: 1 }}>
                첨부 이미지
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mb: 3 }}>
                {post.images.map((imageBase64: string, index: number) => (
                  <Box key={index} sx={{ width: "100%", maxWidth: 600, overflow: "hidden" }}>
                    {imageBase64 ? (
                      <img
                        src={imageBase64}
                        alt={`이미지 ${index + 1}`}
                        style={{ width: "100%", height: "auto", objectFit: "contain", borderRadius: 2 }}
                      />
                    ) : (
                      <Typography>이미지 로드 실패</Typography>
                    )}
                  </Box>
                ))}
              </Box>
              <Divider sx={{ mb: 2 }} />
            </>
          )}

          {/* 판매자 정보 */}
          {showContent && (
            <>
              <Typography variant="h6" component="div" color="text.primary" sx={{ fontWeight: "bold", mb: 1 }}>
                소중한 고객님의 정보
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                성함: {post.author.name || "정보 없음"}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                연락처: {post.contact || "정보 없음"}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                입금받으실 계좌 성함: {post.accountHolder || "정보 없음"}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                은행 이름: {post.bankName || "정보 없음"}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                입금받으실 계좌: {post.accountNumber || "정보 없음"}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </>
          )}

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
          {/* 작성 정보 */}
          <Typography variant="h6" component="div" color="text.primary" sx={{ fontWeight: "bold", mb: 1 }}>
            작성 정보
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            작성자: {post.author.name || "작성자 없음"} | 작성일: {new Date(post.date).toLocaleString()} | 태그: {post.tag || "태그 없음"}
          </Typography>
        </CardContent>
      </Card>

      {post.locked && !showContent && (
        <Box sx={{ mt: 2, display: "flex", flexDirection: "row", gap: 1, alignItems: "center" }}>
          <TextField
            type="password"
            label="비밀번호 입력 (4자리 숫자)"
            variant="outlined"
            size="small"
            value={inputPassword}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, "");
              if (input.length <= 4) setInputPassword(input);
            }}
            inputProps={{ maxLength: 4 }}
            sx={{ width: "300px" }}
          />
          <Button variant="contained" color="primary" onClick={handlePasswordSubmit} sx={{ height: "40px" }}>
            확인
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete} sx={{ height: "40px" }}>
            삭제하기
          </Button>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        {showContent && (
          <Button variant="outlined" color="error" onClick={handleDelete} sx={{ borderRadius: 20, px: 2 }}>
            삭제하기
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/sell-inquiry")}
          sx={{ borderRadius: 20, px: 2 }}
        >
          목록으로 돌아가기
        </Button>
      </Box>
    </Box>
  );
}