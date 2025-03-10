import { Box, Button, Typography, TextField } from "@mui/material";
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
    setPost(foundPost);
  }, [id]);

  if (!post) {
    return (
      <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3, textAlign: "center" }}>
        <Typography variant="h5">게시글을 찾을 수 없습니다.</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/rental-inquiry")}>
          목록으로 돌아가기
        </Button>
      </Box>
    );
  }

  const handleDelete = () => {
    if (post.locked && post.password !== inputPassword) {
      alert("비밀번호가 틀렸습니다.");
      return;
    }

    // sessionStorage에서 해당 게시글 삭제
    const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    const updatedPosts = storedPosts.filter((p) => p.id.toString() !== id);
    sessionStorage.setItem("posts", JSON.stringify(updatedPosts));

    alert("게시글이 삭제되었습니다.");
    navigate("/rental-inquiry");
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>{post.title}</Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        작성일: {new Date(post.id).toLocaleString()}
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {showContent ? post.content : "내용을 보려면 비밀번호를 입력하세요."}
      </Typography>

      {post.locked && !showContent && (
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            type="password"
            label="비밀번호 입력"
            variant="outlined"
            size="small"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <Button variant="contained" onClick={() => setShowContent(post.password === inputPassword)}>
            확인
          </Button>
        </Box>
      )}

    

      <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={handleDelete}>
        삭제하기
      </Button>
      <Button variant="contained" sx={{ mt: 2, ml: 2 }} onClick={() => navigate("/sell-inquiry")}>
        목록으로 돌아가기
      </Button>
    </Box>
  );
}
