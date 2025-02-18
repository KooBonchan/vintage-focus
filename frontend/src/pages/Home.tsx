import { styled, Typography } from "@mui/material";

const BodyFiller = styled('div')({
  color: "red",
  border: "3px solid red",
  padding: 8,
  borderRadius: '6em',
  height: '200vh',
});

export function Home() {
  return (
    <>
      <BodyFiller>
        홈입니다. 수정하세요
        
      </BodyFiller>
    </>
  );
}
