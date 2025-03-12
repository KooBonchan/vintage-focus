// ProductCard.tsx
import { ProductResponse } from '@/types/response';
import { Box, Card, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';

// ProductCardProps 인터페이스 정의
export interface ProductCardProps {
  product: ProductResponse;
  width?: number;
  height?: number;
}

const ProductCard = ({
  product,
  width = 250,
  height = 330,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleProductClick = () => {
    if (product.id) {
      navigate(`/product/${product.id}`);
    } else {
      navigate(`/product/${product.productName.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  return (
    <Card
      sx={{
        width: width,
        height: height + 10,
        textAlign: "center",
        p: 2,
        borderRadius: 3,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: 6,
          cursor: 'pointer',
        },
        backgroundColor: 'transparent',
      }}
      onClick={handleProductClick} // 카드 클릭 시 상세정보 링크로 이동
    >
      <CardMedia
        component="img"
        image={
          (product.productImages && product.productImages.length > 0) ?
          `${import.meta.env.VITE_IMAGE_RESOURCE_ROOT}/${product.productImages[0]}`
          :
          `/image/icon/camera.svg`}
        alt={product.productName}
        sx={{
          height: height-115,
          borderRadius: 2,
        }}
      />
      <CardContent>
        <Box display="flex">
          <Box id="metadata-wrapper" flexGrow={1}>
            <Typography variant="body1" fontWeight="bold" sx={{ mt: 0.5, fontSize: "1.2em" }}> {/* 타이틀 윗쪽 마진 추가 */}
              {product.productName}
            </Typography>
            <Typography variant="body2" sx={{ mr: 0, fontSize: "0.8em" }}>
              {product.company}
            </Typography>
            <Box display="flex" justifyContent="center" gap={0.5} mt='1rem'>
              {product.consumerPrice && 
                <Typography
                  fontWeight="regular"
                  sx={{
                    textDecoration:"line-through",
                    color: theme.palette.grey[500],
                  }}>
                  {product.consumerPrice.toLocaleString()}
                </Typography>
              }
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontSize: "1.0rem", fontWeight: "bold" }}
              >
                {product.sellingPrice.toLocaleString()} 원
              </Typography>
            </Box>
          </Box>
          <ConditionBattery condition={product.condition} />
        </Box>
        
      </CardContent>
    </Card>
  );
};



const ConditionBattery = ({ condition = 'FAIR' }: { condition?: 'POOR' | 'FAIR' | 'GOOD' | 'EXCELLENT' | 'MINT' }) => {
  const conditionMap: Record<string, any> = {
    MINT:      { height: '100%', color: 'linear-gradient(to top, #3b82f6, #60a5fa)' }, // 파란색 계열
    EXCELLENT: { height: '90%', color: 'linear-gradient(to top, #10b981, #34d399)' }, // 초록색 계열
    GOOD:      { height: '70%', color: 'linear-gradient(to top, #22c55e, #86efac)' },
    FAIR:      { height: '50%', color: 'linear-gradient(to top, #f59e0b, #fbbf24)' }, // 노란색 계열
    POOR:      { height: '20%', color: 'linear-gradient(to top, #ef4444, #f87171)' }  // 빨간색 계열
  };
  
  if (!condition || !conditionMap[condition]) return null;

  return (
    <Box
      width="1.2rem"
      height="5rem"
      mt=".5rem"
      sx={{
        border: '2px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '1rem',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f3f4f6',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: conditionMap[condition].height,
          background: conditionMap[condition].color,
          position: 'absolute',
          bottom: '0',
          borderRadius: '0 0 1rem 1rem',
          transition: 'height 0.3s ease-in-out',
        }}
      />
    </Box>
  );
};



export default ProductCard;