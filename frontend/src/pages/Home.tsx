import { styled, Typography } from "@mui/material";

const BodyFiller = styled('div')({
  color: "#00",
  border: "3px solid red",
  padding: 8,
  borderRadius: '6em',
  height: '200vh',
});

export function Home() {
  return (
    <>
      <BodyFiller>
        <Typography sx={{fontSize: '3rem'}}>
        홈입니다. 수정하세요
        </Typography>
        
        
      </BodyFiller>
    </>
  );
}
