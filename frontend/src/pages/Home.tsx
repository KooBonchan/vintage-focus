import { Container, styled, Typography } from "@mui/material";
import ThemedContainer from "../components/ThemedContainer";

export function Home() {
  return (
    <ThemedContainer sx={{paddingTop: '100px', height:'180vh',}}>
      <Typography sx={{fontSize: '3rem'}}>
      홈입니다. 수정하세요
      </Typography>  
    </ThemedContainer>
  );
}
