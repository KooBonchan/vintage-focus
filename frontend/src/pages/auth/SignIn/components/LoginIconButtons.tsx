import { authConfig } from '@/types/auth';
import { GitHub, Google } from '@mui/icons-material';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import SHA256 from "crypto-js/sha256";
import encBase64 from "crypto-js/enc-base64";


const generateCodeVerifier = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const generateCodeChallenge = async (verifier: string): Promise<string> => {
   const hash = SHA256(verifier);
   const base64Hash = encBase64.stringify(hash);
   return base64Hash
     .replace(/\+/g, "-")
     .replace(/\//g, "_")
     .replace(/=+$/, "");
};

const LoginIconButtons = () => {
  const theme = useTheme();
  const kakaoSrc = theme.palette.mode === "dark" ? "/image/icon/kakao-white.svg" : "/image/icon/kakao.svg";

  const handleLogin = async (provider: keyof typeof authConfig) => {
    const {clientId, redirectUri, scope, authUrl } = authConfig[provider];
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    sessionStorage.setItem('provider', provider);
    sessionStorage.setItem(`${provider}_code_verifier`, codeVerifier);

    const authParams = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    })

    window.location.href = `${authUrl}?${authParams.toString()}`;

  }

  return (
    <Box sx={{ display: 'flex', justifyContent:'space-around', alignItems:'center'}}>
      <Typography flexGrow={1}>
        소셜 계정으로 가입하기
      </Typography>
      <Box display='flex' gap='1rem'>
        <IconButton
          size='small'
          onClick={() => handleLogin('google')}
        >
          <Google />
        </IconButton>
        <IconButton
        size='small'
        onClick={() => handleLogin('kakao')}
        >
          <img src={kakaoSrc} height='20em' />
        </IconButton>
        <IconButton
        size='small'
        onClick={() => handleLogin('github')}
        >
          <GitHub />
        </IconButton>
      </Box>
    </Box>
  )
};

export default LoginIconButtons;