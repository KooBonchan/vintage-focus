import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Paper, Box, Typography, TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

let PortOne: any = null;

const pageColors = {
  paperBgcolor: {light: "#fff", dark: "#262626"},
  boxBgcolor: {light: "#fcfcfc", dark: "#595959"},

  secondaryFontColor: {light: "#555", dark: "#ccc"},
}


const DeliveryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderItems = location.state?.orderItems || [];

  

  // 결제 상태 추가
  const [paymentStatus, setPaymentStatus] = useState<{ status: string; message?: string }>({
    status: "",
    message: "",
  });

  const [form, setForm] = useState({
    recipient: "",
    phone: "",
    email: "",
    address: "",
    detailAddress:"",
    postalCode: "",
    totalPrice: "0원",
    shippingFee: "0원",
    finalAmount: "0원",
  });

  const [openModal, setOpenModal] = useState(false); // 모달 
  const [missingFields, setMissingFields] = useState<string[]>([]); // 누락된 필드 저장


  // PortOne SDK 동적 로딩
  useEffect(() => {
    const loadPortOne = async () => {
      try {
        const module = await import("@portone/browser-sdk/v2");
        PortOne = module.default;
      } catch (error) {
      }
    };

    loadPortOne();
  }, []);


  // 주문한 상품의 가격 계산
 useEffect(() => {
    const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalShipping = orderItems.reduce((acc, item) => acc + item.shipping, 0);
    setForm((prev) => ({
      ...prev,
      totalPrice: `${totalPrice.toLocaleString()}원`,
      shippingFee: `${totalShipping.toLocaleString()}원`,
      finalAmount: `${(totalPrice + totalShipping).toLocaleString()}원`,
    }));
  }, [orderItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



   // Daum 우편번호 API가 로드되었는지 확인
   useEffect(() => {
    if (typeof window.daum === "undefined" || typeof window.daum.Postcode === "undefined") {
      console.error("❌ Daum 우편번호 API가 로드되지 않았습니다.");
      alert("우편번호 검색을 사용하려면 인터넷에 연결되어 있어야 합니다.");
    } else {
      console.log("✅ Daum 우편번호 API가 정상적으로 로드되었습니다.");
    }
  }, []);

  // ✅ 우편번호 검색 함수
  const handleSearchAddress = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert("우편번호 API가 로드되지 않았습니다. 페이지를 새로고침해 주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        setForm((prev) => ({
          ...prev,
          address: data.roadAddress, // 선택한 도로명 주소
          postalCode: data.zonecode, // 선택한 우편번호
        }));
      },
    }).open();
  };


 // 필수 입력 필드 검증 함수
 const validateFields = () => {
  const requiredFields: { key: keyof typeof form; label: string }[] = [
    { key: "recipient", label: "주문하시는 분" },
    { key: "phone", label: "전화번호" },
    { key: "email", label: "이메일" },
    { key: "address", label: "받으실 곳" },
    { key: "postalCode", label: "우편번호" },
    { key: "detailAddress", label: "상세 주소" },
  ];

  const missing = requiredFields
    .filter((field) => !form[field.key].trim())
    .map((field) => field.label);

  if (missing.length > 0) {
    setMissingFields(missing);
    setOpenModal(true); // 누락된 필드가 있을 경우 모달 열기
    return false;
  }

  return true;
};



// 🛒 **결제 기능 추가 - 수정예정**
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setPaymentStatus({ status: "PENDING", message: "" });

  if (!form.recipient || !form.phone || !form.email || !form.address || !form.postalCode || !form.detailAddress) {
    alert("모든 필드를 입력해주세요.");
    return;
  }
  try {
    // PortOne SDK 확인
    if (!PortOne) {
      console.error("❌ PortOne SDK가 아직 로드되지 않았습니다.");
      alert("PortOne SDK가 정상적으로 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }


    // 랜덤 결제 ID 생성
    const generateRandomId = () => `test-${new Date().getTime()}`;
    const paymentId = generateRandomId();

    // PortOne 결제 요청
    const payment = await PortOne.requestPayment({
      storeId: "store-e4038486-8d83-41a5-acf1-844a009e0d94",
      channelKey: "channel-key-ebe7daa6-4fe4-41bd-b17d-3495264399b5",
      paymentId,
      orderName: "테스트 상품",
      totalAmount: 1000, // 테스트용 금액 (원하는 금액으로 변경 가능)
      currency: "KRW",
      payMethod: "CARD",
      customData: { item: "test-item" },
    });


    // 결제 실패 처리
    if (payment?.code !== undefined) {
      setPaymentStatus({
        status: "FAILED",
        message: payment.message || "결제 실패",
      });
      alert(`결제 실패: ${payment.message || "알 수 없는 오류"}`);
      return;
    }

    // 결제 성공 처리
    setPaymentStatus({ status: "SUCCESS", message: "결제가 완료되었습니다!" });
    alert("🎉 결제가 완료되었습니다!");

    navigate("/order/complete", { state: { form, orderItems } });

  } catch (error) {
    setPaymentStatus({ status: "FAILED", message: "결제 중 오류 발생" });
    alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
  }
};


  return (
    <Container maxWidth="md" sx={{ py: 4, minHeight: "100vh" }}>
      {/* 주문 상세 내역 */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: pageColors.paperBgcolor, boxShadow: "none", borderRadius: "8px", border: "1px solid #ddd" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" } }>
          주문 상세 내역
        </Typography>
        <Box sx={{ border: "1px solid #ddd", p: 2, borderRadius: "8px", bgcolor: pageColors.boxBgcolor }}>
          <Grid container spacing={1} sx={{ borderBottom: "1px solid #ddd", pb: 1 }}>
            <Grid item xs={2} sx={{ fontWeight: "bold", textAlign: "center" }}>상품 이미지</Grid>
            <Grid item xs={3} sx={{ fontWeight: "bold", textAlign: "center" }}>상품/옵션 정보</Grid>
            <Grid item xs={2} sx={{ fontWeight: "bold", textAlign: "center" }}>수량</Grid>
            <Grid item xs={2} sx={{ fontWeight: "bold", textAlign: "center" }}>상품 금액</Grid>
            <Grid item xs={2} sx={{ fontWeight: "bold", textAlign: "center" }}>합계 금액</Grid>
            <Grid item xs={1} sx={{ fontWeight: "bold", textAlign: "center" }}>배송비</Grid>
          </Grid>

          {orderItems.length > 0 ? (
            orderItems.map((item) => (
              <Grid container spacing={1} key={item.id} sx={{ py: 1, borderBottom: "1px solid #eee", alignItems: "center" }}>
                <Grid item xs={2} sx={{ textAlign: "center" }}>
                  <img src={item.image} alt={item.name} width={80} height={60} style={{ borderRadius: "5px" }} />
                </Grid>
                <Grid item xs={3} sx={{ textAlign: "center" }}>{item.name}</Grid>
                <Grid item xs={2} sx={{ textAlign: "center" }}>{item.quantity}개</Grid>
                <Grid item xs={2} sx={{ textAlign: "center" }}>{item.price.toLocaleString()}원</Grid>
                <Grid item xs={2} sx={{ textAlign: "center" }}>{(item.price * item.quantity).toLocaleString()}원</Grid>
                <Grid item xs={1} sx={{ textAlign: "center" }}>{item.shipping.toLocaleString()}원</Grid>
              </Grid>
            ))
          ) : (
            <Box sx={{ p: 2, textAlign: "center", color: "#777" }}>주문한 상품이 없습니다.</Box>
          )}
        </Box>

           {/* 합계 금액 */}
      <Paper sx={{ p: 2, mt: 3, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", border: "1px solid #ddd", bgcolor: pageColors.paperBgcolor, minHeight: "50px" }}>
        <Typography sx={{ fontWeight: "bold", minWidth: "200px", textAlign: "center" }}>
          총 {orderItems.length}개의 상품 금액 {form.totalPrice}
        </Typography>
        <Typography sx={{ fontWeight: "bold", mx: 2 }}>+</Typography>
        <Typography sx={{ fontWeight: "bold", minWidth: "120px", textAlign: "center" }}>
          배송비 {form.shippingFee}
        </Typography>
        <Typography sx={{ fontWeight: "bold", mx: 2 }}>=</Typography>
        <Typography sx={{ fontWeight: "bold", minWidth: "120px", textAlign: "center" }}>
          합계 {form.finalAmount}
        </Typography>
      </Paper>
      </Paper>

      

      {/* 배송 정보 */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: pageColors.paperBgcolor, boxShadow: "none", borderRadius: "8px", border: "1px solid #ddd" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          배송 정보
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}><Typography sx={{ fontWeight: "bold", color: pageColors.secondaryFontColor }}>주문하시는 분</Typography></Grid>
          <Grid item xs={9}><TextField fullWidth name="recipient" value={form.recipient} onChange={handleChange} variant="outlined" size="small" /></Grid>

          <Grid item xs={3}><Typography sx={{ fontWeight: "bold", color: pageColors.secondaryFontColor }}>전화번호</Typography></Grid>
          <Grid item xs={9}><TextField fullWidth name="phone" value={form.phone} onChange={handleChange} variant="outlined" size="small" /></Grid>

          <Grid item xs={3}><Typography sx={{ fontWeight: "bold", color: pageColors.secondaryFontColor }}>이메일</Typography></Grid>
          <Grid item xs={9}><TextField fullWidth name="email" value={form.email} onChange={handleChange} variant="outlined" size="small" /></Grid>

          <Grid item xs={3}><Typography sx={{ fontWeight: "bold", color: pageColors.secondaryFontColor }}>받으실 곳</Typography></Grid>
          <Grid item xs={6}><TextField fullWidth name="address" value={form.address} onChange={handleChange} variant="outlined" size="small" /></Grid>
          <Grid item xs={3}>
          <Button fullWidth variant="outlined" onClick={handleSearchAddress}>
              우편번호 검색
            </Button>
          </Grid>
          <Grid item xs={3}><Typography sx={{ fontWeight: "bold", color: pageColors.secondaryFontColor }}>우편번호</Typography></Grid>
          <Grid item xs={9}><TextField fullWidth name="postalCode" value={form.postalCode} variant="outlined" size="small" /></Grid>
          
          <Grid item xs={3}><Typography sx={{ fontWeight: "bold", color: pageColors.secondaryFontColor }}>상세 주소</Typography></Grid>
          <Grid item xs={9}><TextField fullWidth name="detailAddress" value={form.detailAddress} onChange={handleChange} variant="outlined" size="small" /></Grid>

        </Grid>
      </Paper>

   

       {/* 결제 정보 */}
       <Paper sx={{ p: 3, mb: 3, bgcolor: pageColors.paperBgcolor, boxShadow: "none", borderRadius: "8px", border: "1px solid #ddd" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          결제 정보
        </Typography>
        <Grid container spacing={0} sx={{ border: "1px solid #ddd", borderRadius: "8px", bgcolor: pageColors.boxBgcolor }}>
          <Grid item xs={3} sx={{ bgcolor: pageColors.boxBgcolor, display: "flex", alignItems: "center", pl: 2, borderBottom: "1px solid #ddd" }}>
            <Typography sx={{ fontWeight: "bold", color: pageColors.secondaryFontColor }}>상품 합계 금액</Typography>
          </Grid>
          <Grid item xs={9} sx={{ borderBottom: "1px solid #ddd" }}>
            <TextField fullWidth disabled value={form.totalPrice} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={3} sx={{ bgcolor: pageColors.boxBgcolor, display: "flex", alignItems: "center", pl: 2, borderBottom: "1px solid #ddd" }}>
            <Typography sx={{ fontWeight: "bold", color: pageColors.secondaryFontColor }}>배송비</Typography>
          </Grid>
          <Grid item xs={9} sx={{ borderBottom: "1px solid #ddd" }}>
            <TextField fullWidth disabled value={form.shippingFee} variant="outlined" size="small" />
          </Grid>

          <Grid item xs={3} sx={{ bgcolor: pageColors.boxBgcolor, display: "flex", alignItems: "center", pl: 2 }}>
            <Typography sx={{ fontWeight: "bold", color: pageColors.secondaryFontColor }}>최종 결제 금액</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField fullWidth disabled value={form.finalAmount} variant="outlined" size="small" />
          </Grid>
        </Grid>
      </Paper>

      {/* 합계 금액 표시 */}
      <Paper
        sx={{
          p: 2,
          mt: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "8px",
          border: "1px solid #ddd",
          bgcolor: pageColors.paperBgcolor,
          minHeight: "50px",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "18px", ml: 2 }}>최종 결제 금액</Typography>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px", color: "#333", mr: 2 }}>
          {form.finalAmount}
        </Typography>
      </Paper>

      {/* 결제 버튼 */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        결제하기
      </Button>


      {/* 모달 */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>입력 확인</DialogTitle>
        <DialogContent>
          <Typography>다음 필수 항목을 입력해주세요:</Typography>
          <ul>
            {missingFields.map((field, index) => (
              <li key={index}>{field}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};






export default DeliveryPage;
