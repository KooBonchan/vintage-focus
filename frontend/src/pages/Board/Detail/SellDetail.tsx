import { Box, Card, CardContent, Divider, Typography, TextField, Modal, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Post } from "../../../types/post";
import CustomButton from "../../../components/CustomButton";

export default function SellDetail() {
  const navigate = useNavigate();
  const { id, authenticated } = useParams();
  const [searchParams] = useSearchParams();
  const [post, setPost] = useState<Post | null>(null);
  const [inputPassword, setInputPassword] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false); // 비밀번호 모달 상태
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // 삭제 모달 상태
  const [deletePassword, setDeletePassword] = useState(""); // 삭제용 비밀번호 입력
  const theme = useTheme(); // 다크 모드 감지를 위한 hook

  useEffect(() => {
    try {
      const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
      console.log("저장된 게시글:", storedPosts);
      const foundPost = storedPosts.find((p: Post) => p.id.toString() === id);
      console.log("찾은 게시글:", foundPost);
      if (foundPost) {
        setPost(foundPost);
        const isAuthenticatedByQuery = searchParams.get("authenticated") === "true";
        const isAuthenticatedByStorage = sessionStorage.getItem(`post_${id}_authenticated`) === "true";
        const isAuthenticated = isAuthenticatedByQuery || isAuthenticatedByStorage;
        console.log("URL 쿼리 파라미터 (authenticated):", searchParams.get("authenticated"));
        console.log("sessionStorage 인증 상태:", sessionStorage.getItem(`post_${id}_authenticated`));
        console.log("최종 인증 여부 (isAuthenticated):", isAuthenticated);
        setShowContent(!foundPost.locked || isAuthenticated);
        console.log("showContent 초기값:", !foundPost.locked || isAuthenticated);
      } else {
        console.error("해당 ID의 게시글을 찾을 수 없습니다:", id);
      }
    } catch (error) {
      console.error("sessionStorage 파싱 오류:", error);
    }
  }, [id, searchParams]);
  useEffect(()=>{
    if(authenticated === "true") setShowContent(true);
  }, [authenticated, setShowContent]);

  if (!post) {
    return (
      <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3, textAlign: "center" }}>
        <Typography variant="h5">게시글을 찾을 수 없습니다.</Typography>
        <CustomButton label="목록으로 돌아가기" size="medium" onClick={() => navigate("/sell-inquiry")} />
      </Box>
    );
  }

  const handleDeleteConfirm = () => {
    if (post.password === deletePassword) {
      const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
      const updatedPosts = storedPosts.filter((p: Post) => p.id.toString() !== id);
      sessionStorage.setItem("posts", JSON.stringify(updatedPosts));
      sessionStorage.removeItem(`post_${id}_authenticated`);
      alert("게시글이 삭제되었습니다.");
      navigate("/sell-inquiry");
      setOpenDeleteModal(false);
    } else {
      alert("비밀번호가 틀렸습니다.");
      setDeletePassword("");
    }
  };

  const handlePasswordSubmit = () => {
    console.log("입력된 비밀번호:", inputPassword);
    console.log("저장된 비밀번호:", post.password);
    console.log("비밀번호 일치 여부:", post.password === inputPassword);

    if (post.password === inputPassword) {
      setShowContent(true);
      console.log("showContent 업데이트됨:", true);
      sessionStorage.setItem(`post_${id}_authenticated`, "true");
      navigate(`/sell-inquiry/${id}?authenticated=true`, { replace: true });
      setOpenPasswordModal(false);
    } else {
      alert("비밀번호가 틀렸습니다.");
      setInputPassword("");
    }
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length <= 4) {
      setInputPassword(input);
    }
    if (e.target.value !== input) {
      alert("숫자만 입력 가능합니다.");
    }
  };

  const handleDeletePasswordChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length <= 4) {
      setDeletePassword(input);
    }
    if (e.target.value !== input) {
      alert("숫자만 입력 가능합니다.");
    }
  };

  const handleModalClose = () => {
    setOpenPasswordModal(false);
    setOpenDeleteModal(false);
    setInputPassword("");
    setDeletePassword("");
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3 }}>
      <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: "white" }}>
        <CardContent>
          <Typography variant="h6" component="div" color="text.primary" sx={{ fontWeight: "bold", mb: 1 }}>
            제목
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {post.title || "제목이 없습니다."}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="h6" component="div" color="text.primary" sx={{ fontWeight: "bold", mb: 1 }}>
            문의 내용
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2, whiteSpace: "pre-wrap" }}>
            {showContent ? (post.content || "내용이 없습니다.") : "내용을 보려면 비밀번호를 입력하세요."}
          </Typography>

          
        {/* 문의 내용 밑에 구분선 추가 */}
        <Divider sx={{ mb: 2 }} />

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

          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
            <img
              src="/image/notice/mooni.jpg"
              alt="공지사항"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Box>

          <Typography variant="h6" component="div" color="text.primary" sx={{ fontWeight: "bold", mb: 1 }}>
            작성 정보
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            작성자: {post.author.name || "작성자 없음"} | 작성일: {new Date(post.date).toLocaleString()} | 태그: {post.tag || "태그 없음"}
          </Typography>
        </CardContent>
      </Card>

      {/* 비밀번호 입력 모달 */}
      {post.locked && !showContent && (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
            <CustomButton label="비밀번호 입력" size="medium" onClick={() => setOpenPasswordModal(true)} />
            <CustomButton label="삭제하기" size="medium" onClick={() => setOpenDeleteModal(true)} />
          </Box>

          <Modal open={openPasswordModal} onClose={handleModalClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: theme.palette.mode === "dark" ? "black" : "white",
                borderRadius: "8px",
                boxShadow: 24,
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                border: theme.palette.mode === "dark" ? "1px solid white" : "none",
              }}
            >
              <Typography
                variant="h6"
                sx={{ textAlign: "center", color: theme.palette.mode === "dark" ? "white" : "black" }}
              >
                비밀번호 입력 (4자리 숫자)
              </Typography>
              <TextField
                type="password"
                label="비밀번호"
                variant="outlined"
                value={inputPassword}
                onChange={handlePasswordChange}
                inputProps={{ maxLength: 4, pattern: "[0-9]*" }}
                fullWidth
                sx={{
                  input: { color: theme.palette.mode === "dark" ? "white" : "black" },
                  label: { color: theme.palette.mode === "dark" ? "white" : "black" },
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <CustomButton label="확인" size="medium" onClick={handlePasswordSubmit} />
                <CustomButton label="취소" size="medium" onClick={handleModalClose} />
              </Box>
            </Box>
          </Modal>
        </>
      )}

      {/* 삭제 확인 모달 */}
      <Modal open={openDeleteModal} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: theme.palette.mode === "dark" ? "black" : "white",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: theme.palette.mode === "dark" ? "1px solid white" : "none",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center", color: theme.palette.mode === "dark" ? "white" : "black" }}>
            게시글 삭제
          </Typography>
          <Typography sx={{ textAlign: "center", color: theme.palette.mode === "dark" ? "white" : "black" }}>
            정말로 이 게시글을 삭제하시겠습니까?
          </Typography>
          <TextField
            type="password"
            label="비밀번호 (4자리 숫자)"
            variant="outlined"
            value={deletePassword}
            onChange={handleDeletePasswordChange}
            inputProps={{ maxLength: 4, pattern: "[0-9]*" }}
            fullWidth
            sx={{
              input: { color: theme.palette.mode === "dark" ? "white" : "black" },
              label: { color: theme.palette.mode === "dark" ? "white" : "black" },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <CustomButton label="삭제" size="medium" onClick={handleDeleteConfirm} />
            <CustomButton label="취소" size="medium" onClick={handleModalClose} />
          </Box>
        </Box>
      </Modal>

      {/* 버튼 섹션 (내용이 표시된 경우) */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
        {showContent && (
          <CustomButton label="삭제하기" size="medium" onClick={() => setOpenDeleteModal(true)} />
        )}
        <CustomButton label="목록으로 돌아가기" size="medium" onClick={() => navigate("/sell-inquiry")} />
      </Box>
    </Box>
  );
}