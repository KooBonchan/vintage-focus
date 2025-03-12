import { useState } from 'react';
import useAuthStore from '@/stores/authStore';
import { 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Box, 
  Paper,
  Divider,
  InputAdornment,
  Grid2
} from '@mui/material';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import { HomeRounded, PersonOutline, Phone } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Register() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    detailAddress: '',
    zipcode: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      `${import.meta.env.VITE_API_ROOT}/auth/register`,
      formData,
      {
        withCredentials: true,
      }
    )
    .then(response => setUser(response.data))
    .then(() => navigate("/"))
    .catch(console.error)
  };

  // TODO: 주소 API 연동
  const handleAddressSearch = () => {
    console.log('Address search clicked');
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mt: 4,
          mb: 4,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          회원가입
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{xs:12}}>
              <TextField
                fullWidth
                id="username"
                value={user?.username ?? "테스트"}
                variant="outlined"
                disabled
                
                slotProps={{
                  input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline color="primary" />
                    </InputAdornment>
                  ),
                }}}
                aria-label="Username (disabled)"
              />
            </Grid2>
            
            <Grid2 size={{xs:12}}>
              <TextField
                fullWidth
                id="phone"
                label="전화번호"
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="01012345678"
                slotProps={{
                  input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="primary" />
                    </InputAdornment>
                  ),
                }}}
                aria-label="Phone Number"
              />
            </Grid2>
            
            <Grid2 size={{xs:12, sm:9}}>
              <TextField
                fullWidth
                id="address"
                label="주소"
                variant="outlined"
                value={formData.address}
                onChange={handleChange}
                required
                slotProps={{
                  input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeRounded color="primary" />
                    </InputAdornment>
                  ),
                  // readOnly: true,
                }}}
                aria-label="Address (read-only)"
              />
            </Grid2>
            
            <Grid2 size={{xs:12, sm:3}}>
              <Button 
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleAddressSearch}
                sx={{ height: '56px' }}
                aria-label="Search Address"
              >
                주소 검색
              </Button>
            </Grid2>
            
            <Grid2 size={{xs:12}}>
              <TextField
                fullWidth
                id="detailAddress"
                label="상세주소"
                variant="outlined"
                value={formData.detailAddress}
                onChange={handleChange}
                required
                aria-label="Detailed Address"
              />
            </Grid2>
            
            <Grid2 size={{xs:12, sm:6}}>
              <TextField
                fullWidth
                id="zipcode"
                label="우편번호"
                variant="outlined"
                value={formData.zipcode}
                onChange={handleChange}
                required
                slotProps={{
                  input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MarkunreadMailboxIcon color="primary" />
                    </InputAdornment>
                  ),
                  // readOnly: true,
                }}}
                aria-label="Zip Code (read-only)"
              />
            </Grid2>
          </Grid2>
          
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1rem',
            }}
            aria-label="Complete Registration"
          >
            회원가입 완료
          </Button>
          
          <Typography
            sx={{
              mt: 2,
              fontSize: '0.85rem',
              color: 'text.secondary',
            }}
          >
            회원가입 시 당사의 서비스 약관 및 개인정보 보호정책에 동의하시는 것으로 간주됩니다.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}