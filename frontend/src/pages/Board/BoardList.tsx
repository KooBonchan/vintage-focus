import * as React from "react";
import { Box, Grid, Tabs, Tab, Pagination, useTheme } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import BoardCard from "../../components/BoardCard";
import WriteButton from "@/components/WriteButton";

const categoryRoutes = {
  "/sell-inquiry": "매각문의",
  "/buy-inquiry": "구매문의",
  "/rental-inquiry": "대여문의",
};

export default function BoardList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 8;
  const currentPath = location.pathname;

  const showInquiryBox = currentPath !== "/rental-inquiry";
  const selectedTab = categoryRoutes[currentPath] || "구매문의";

  const theme = useTheme();

  React.useEffect(() => {
    const storedPosts = JSON.parse(sessionStorage.getItem("posts") || "[]");
    setPosts(storedPosts);
  }, []);

  const filteredArticles = posts.filter((article) => article.tag === selectedTab);

  const handleArticleClick = (article) => {
    navigate(`${currentPath}/detail/${article.id}`);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1000, margin: "0 auto", textAlign: "center", p: 2 }}>
      <Tabs
        value={currentPath}
        onChange={(event, newValue) => {
          navigate(newValue);
          setPage(1);
        }}
        centered
        textColor="inherit"
        indicatorColor="primary"
      >
        {Object.entries(categoryRoutes).map(([path, label]) => (
          <Tab key={path} label={label} value={path} />
        ))}
      </Tabs>

      {showInquiryBox && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 2 }}>
          <WriteButton
            currentPath={currentPath}
            onClick={() => navigate(`${currentPath}/write`)}
          />
        </Box>
      )}

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {filteredArticles
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((article) => (
            <Grid item xs={12} key={article.id} sx={{ width: "100%", cursor: "pointer" }} onClick={() => handleArticleClick(article)}>
              <BoardCard
                article={{
                  author: { name: article.author?.name || 'Unknown' },
                  date: article.date || '2025-03-11T10:00:00',
                  id: article.id,
                  locked: article.locked,
                  tag: article.tag,
                  title: article.title,
                  views: article.views,
                }}
                link={`/article/${article.id}`}
                backgroundColor={currentPath === "/sell-inquiry" ? "#c1d2dd" : currentPath === "/buy-inquiry" ? "#d9dceb" : ""}
                onClick={() => handleArticleClick(article)}
              />
            </Grid>
          ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(filteredArticles.length / itemsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}
