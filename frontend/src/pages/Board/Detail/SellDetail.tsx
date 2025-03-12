import { Box, Button, Card, CardContent, Divider, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SellDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 게시글 ID 가져오기
  const [post, setPost] = useState(null);
  const [inputPassword, setInputPassword] = useState("");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // sessionStorage에서 게시글 목록 가져오기
    const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    const foundPost = storedPosts.find((p) => p.id.toString() === id);
    console.log("Found post from sessionStorage:", foundPost); // 디버깅 로그
    if (foundPost) {
      setPost(foundPost);
      setShowContent(!foundPost.locked); // locked가 false면 바로 내용 표시
    }
  }, [id]);

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
    // 잠금 상태이고 내용이 아직 표시되지 않은 경우 비밀번호 확인
    if (post.locked && !showContent) {
      if (post.password === inputPassword) {
        setShowContent(true); // 비밀번호가 맞으면 내용 표시
        if (window.confirm("이 게시글을 삭제하시겠습니까?")) {
          // 삭제 확인 후 진행
          const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
          const updatedPosts = storedPosts.filter((p) => p.id.toString() !== id);
          sessionStorage.setItem("posts", JSON.stringify(updatedPosts));
          alert("게시글이 삭제되었습니다.");
          navigate("/sell-inquiry");
        }
      } else {
        alert("비밀번호가 틀렸습니다.");
      }
    } else {
      // 잠금 상태가 아니거나 이미 내용이 표시된 경우 바로 삭제 확인
      if (window.confirm("이 게시글을 삭제하시겠습니까?")) {
        const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
        const updatedPosts = storedPosts.filter((p) => p.id.toString() !== id);
        sessionStorage.setItem("posts", JSON.stringify(updatedPosts));
        alert("게시글이 삭제되었습니다.");
        navigate("/sell-inquiry");
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3 }}>
      {/* 단일 박스 */}
      <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: "#ffffff" }}>
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
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {showContent ? (post.content || "내용이 없습니다.") : "내용을 보려면 비밀번호를 입력하세요."}
          </Typography>

          {/* 이미지 큰 사이즈로 세로 표시 */}
          {post.images && post.images.length > 0 && showContent && (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mb: 3 }}>
              {post.images.map((imageName, index) => {
                console.log(`Image ${index + 1} name: ${imageName}, attempting to display`); // 디버깅 로그
                return (
                  <Box key={index} sx={{ width: "100%", maxWidth: 600, overflow: "hidden" }}>
                    <img
                      src={URL.createObjectURL(
                        new File([], imageName, { type: "image/png" }) // 임시 파일 객체 (실제 데이터 없음)
                      )}
                      alt={`이미지 ${index + 1}`}
                      style={{ width: "100%", height: "auto", objectFit: "contain" }}
                      onError={(e) => console.error(`Image load failed for ${imageName}`, e)} // 에러 로그
                    />
                  </Box>
                );
              })}
            </Box>
          )}

          <Divider sx={{ mb: 2 }} />

          {/* 이미지 추가 */}
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
            <img
              src="/image/notice/mooni.jpg" // Use relative path to the image
              alt="공지사항"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
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

      {/* 비밀번호 입력 (locked가 true이고 내용이 아직 표시되지 않은 경우) */}
      {post.locked && !showContent && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
            justifyContent: "center", // 가운데 정렬로 변경
          }}
        >
          <TextField
            type="password"
            label="비밀번호 입력 (4자리 숫자)"
            variant="outlined"
            size="small"
            value={inputPassword}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, ""); // 숫자만 허용
              if (input.length <= 4) setInputPassword(input);
            }}
            inputProps={{ maxLength: 4 }}
            sx={{ width: "300px" }} // 입력창 크기 고정
          />
          <Button variant="outlined" color="error" onClick={handleDelete} sx={{ height: "40px" }}>
            삭제하기
          </Button>
        </Box>
      )}

      {/* 버튼 섹션 (내용이 표시된 경우) */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
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