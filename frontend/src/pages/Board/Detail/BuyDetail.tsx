import { Box, Card, CardContent, Divider, Typography, TextField, Modal, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CustomButton from "../../../components/CustomButton"; // Ensure correct path
import NoticeList from "../../../components/NoticeList"; // Ensure correct path

export default function BuyDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get post ID from URL
  const [searchParams] = useSearchParams(); // Access URL query parameters
  const [post, setPost] = useState(null);
  const [inputPassword, setInputPassword] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false); // State for password modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // State for delete modal
  const [deletePassword, setDeletePassword] = useState(""); // State for delete password input
  const theme = useTheme(); // Hook for theme (dark/light mode)

  useEffect(() => {
    // Load post from sessionStorage and check if it's locked or not
    try {
      const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
      const foundPost = storedPosts.find((p) => p.id.toString() === id);
      console.log("Found post from sessionStorage:", foundPost);

      if (foundPost) {
        const isAuthenticatedByQuery = searchParams.get("authenticated") === "true";
        const isAuthenticatedByStorage = sessionStorage.getItem(`post_${id}_authenticated`) === "true";
        const isAuthenticated = isAuthenticatedByQuery || isAuthenticatedByStorage;

        console.log("URL query param (authenticated):", searchParams.get("authenticated"));
        console.log("sessionStorage auth state:", sessionStorage.getItem(`post_${id}_authenticated`));
        console.log("Final auth state (isAuthenticated):", isAuthenticated);

        setShowContent(!foundPost.locked || isAuthenticated);
        setPost(foundPost);
        console.log("showContent initial state:", !foundPost.locked || isAuthenticated);
      }
    } catch (error) {
      console.error("Error parsing sessionStorage:", error);
    }
  }, [id, searchParams]);

  useEffect(() => {
    if (searchParams.get("authenticated") === "true") {
      setShowContent(true); // Show content if already authenticated
    }
  }, [searchParams]);

  // Handle post not found
  if (!post) {
    return (
      <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3, textAlign: "center" }}>
        <Typography variant="h5">게시글을 찾을 수 없습니다.</Typography>
        <CustomButton label="목록으로 돌아가기" size="medium" onClick={() => navigate("/buy-inquiry")} />
      </Box>
    );
  }

  // Handle deletion of post
  const handleDeleteConfirm = () => {
    if (post.password === deletePassword) {
      const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
      const updatedPosts = storedPosts.filter((p) => p.id.toString() !== id);
      sessionStorage.setItem("posts", JSON.stringify(updatedPosts));
      sessionStorage.removeItem(`post_${id}_authenticated`);
      alert("게시글이 삭제되었습니다.");
      navigate("/buy-inquiry");
      setOpenDeleteModal(false);
    } else {
      alert("비밀번호가 틀렸습니다.");
      setDeletePassword("");
    }
  };

  // Handle password submission
  const handlePasswordSubmit = () => {
    console.log("Entered password:", inputPassword);
    console.log("Stored password:", post.password);

    if (post.password === inputPassword) {
      setShowContent(true);
      sessionStorage.setItem(`post_${id}_authenticated`, "true");
      navigate(`/buy-inquiry/${id}?authenticated=true`, { replace: true });
      setOpenPasswordModal(false);
    } else {
      alert("비밀번호가 틀렸습니다.");
      setInputPassword("");
    }
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length <= 4) setInputPassword(input);
    if (e.target.value !== input) alert("숫자만 입력 가능합니다.");
  };

  // Handle delete password input change
  const handleDeletePasswordChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length <= 4) setDeletePassword(input);
    if (e.target.value !== input) alert("숫자만 입력 가능합니다.");
  };

  // Handle modal close actions
  const handleModalClose = () => {
    setOpenPasswordModal(false);
    setOpenDeleteModal(false);
    setInputPassword("");
    setDeletePassword("");
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3 }}>
      <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: "#ffffff" }}>
        <CardContent>
          {/* Add NoticeList component */}
          <NoticeList
            backgroundColor="#f3f8fb"
            fontColor="#445366"
            fontSize={13}
            iconColor="#445366"
          />

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
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {showContent ? (post.content || "내용이 없습니다.") : "내용을 보려면 비밀번호를 입력하세요."}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
            <img
              src="/image/notice/mooni2.jpg"
              alt="공지사항"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Box>

          <Box
            sx={{
              backgroundColor: "#e3f2fd",
              padding: "16px",
              borderRadius: 1,
              mb: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="body1" color="text.primary">
              ※ 최종 구매 상담은 빈티지포커스 고객센터에서 고객님께 연락을 드려 유선 상담 후에 확정됩니다.
            </Typography>
            <Typography variant="body1" color="text.primary">
              ※ 변경 사항이 있을 시 게시글을 수정하시면 담당 직원의 확인이 어렵습니다. 번거롭더라도 게시글을 새롭게 작성해 주세요.
            </Typography>
            <Typography variant="body1" color="text.primary">
              ※ 기타 문의사항은 고객센터 <strong>(1588-5454)</strong> 로 연락 주시면 친절히 상담해 드리겠습니다.
            </Typography>
          </Box>

          <Typography variant="h6" component="div" color="text.primary" sx={{ fontWeight: "bold", mb: 1 }}>
            작성 정보
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            작성자: {post.author.name || "작성자 없음"} | 작성일: {new Date(post.date).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      {/* Password input modal */}
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

      {/* Delete confirmation modal */}
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

      {/* Button section */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
        {showContent && (
          <CustomButton label="삭제하기" size="medium" onClick={() => setOpenDeleteModal(true)} />
        )}
        <CustomButton label="목록으로 돌아가기" size="medium" onClick={() => navigate("/buy-inquiry")} />
      </Box>
    </Box>
  );
}
