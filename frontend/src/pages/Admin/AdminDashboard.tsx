import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

const AdminDashboard = () => {
  return (
    <Box sx={{ width: "calc(100% - 260px)", mt: 4, display: "flex", justifyContent: "center" }}>
      <Box sx={{ maxWidth: 1200, width: "100%", overflow: "hidden" }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          대시보드
        </Typography>

        <Grid container spacing={3}>
          {/* 매출 현황 */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: "center", overflow: "hidden" }}>
              <Typography variant="h6">📈 매출 현황</Typography>
              <Box sx={{ minWidth: 400 }}>
                <LineChart
                  xAxis={[{ scaleType: "point", data: ["1월", "2월", "3월", "4월", "5월"] }]}
                  series={[{ data: [500, 800, 700, 1000, 1200] }]}
                  height={200}
                />
              </Box>
            </Paper>
          </Grid>

          {/* 재고 현황 */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: "center", overflow: "hidden" }}>
              <Typography variant="h6">📊 재고 현황</Typography>
              <Box sx={{ minWidth: 400 }}>
                <BarChart
                  xAxis={[{ scaleType: "band", data: ["카메라", "렌즈", "삼각대", "배터리"] }]}
                  series={[{ data: [50, 30, 20, 15] }]}
                  height={200}
                />
              </Box>
            </Paper>
          </Grid>

          {/* 배송 상태 */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: "center", overflow: "hidden" }}>
              <Typography variant="h6">🚚 배송 상태</Typography>
              <Box sx={{ minWidth: 400 }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 60, label: "배송 완료" },
                        { id: 1, value: 30, label: "배송 중" },
                        { id: 2, value: 10, label: "지연" },
                      ],
                    },
                  ]}
                  height={200}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
