import { Box, Container, styled } from "@mui/material";

const FooterBlock = styled(Container)({
  padding: '2rem',
});

export function Footer() {
  return (
    <FooterBlock>
      푸터
    </FooterBlock>
  );
}
