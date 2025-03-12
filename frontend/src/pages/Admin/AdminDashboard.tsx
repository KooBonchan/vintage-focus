import { Typography, Grid, Paper, Box } from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";

const AdminDashboard = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, width: "100%" }}>
      <Box sx={{ maxWidth: 1200, width: "100%", textAlign: "center", overflow: "hidden" }}>
        <Typography variant="h4" gutterBottom>
          대시보드
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {/* 매출 현황 */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: "center", overflow: "hidden" }}>
              <Typography variant="h6">매출 현황</Typography>
              <Box sx={{ minWidth: 400, display: "flex", justifyContent: "center" }}>
                <LineChart
                  xAxis={[{ scaleType: "point", data: ["1월", "2월", "3월", "4월", "5월"] }]}
                  series={[{ data: [500, 800, 700, 1000, 1200], color: "#555555" }]}
                  height={200}
                />
              </Box>
            </Paper>
          </Grid>

          {/* 재고 현황 */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: "center", overflow: "hidden" }}>
              <Typography variant="h6">재고 현황</Typography>
              <Box sx={{ minWidth: 400, display: "flex", justifyContent: "center" }}>
                <BarChart
                  xAxis={[{ scaleType: "band", data: ["카메라", "렌즈", "삼각대", "배터리"] }]}
                  series={[{ data: [50, 30, 20, 15], color: "#777777" }]}
                  height={200}
                />
              </Box>
            </Paper>
          </Grid>

          {/* 배송 상태 */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: "center", overflow: "hidden" }}>
              <Typography variant="h6">배송 상태</Typography>
              
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                {/* 차트 */}
                <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 60, color: "#808080" },
                          { id: 1, value: 30, color: "#A9A9A9" },
                          { id: 2, value: 10, color: "#C0C0C0" },
                        ],
                        innerRadius: 50,
                        outerRadius: 120,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -45,
                        endAngle: 315,
                        cx: 150,
                        cy: 150,
                      },
                    ]}
                    width={100}
                    height={300}
                  />
                </Grid>

                {/* 데이터 출력 (범례) */}
                <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }} />
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box sx={{ width: 16, height: 16, bgcolor: "#808080", mr: 1 }} />
                    <Typography>배송 완료: <b>60%</b></Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box sx={{ width: 16, height: 16, bgcolor: "#A9A9A9", mr: 1 }} />
                    <Typography>배송 중: <b>30%</b></Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: 16, height: 16, bgcolor: "#C0C0C0", mr: 1 }} />
                    <Typography>지연: <b>10%</b></Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
