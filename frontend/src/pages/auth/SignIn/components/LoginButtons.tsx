import { authConfig } from '@/types/auth';
import { GitHub, Google } from '@mui/icons-material';
import { Box, Button, useTheme } from '@mui/material';

const generateCodeVerifier = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const generateCodeChallenge = async (verifier: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const LoginButtons = () => {
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button fullWidth variant="outlined"
        onClick={() => handleLogin('google')}
        startIcon={<Google />}
      >
        Sign in with Google
      </Button>
      <Button fullWidth variant="outlined"
        onClick={() => handleLogin('kakao')}
        startIcon={<img src={kakaoSrc} height='20em' />}
      >
        Sign in with Kakao

      </Button>
      <Button fullWidth variant="outlined"
        onClick={() => handleLogin('github')}
        startIcon={<GitHub />}
      >
        Sign in with Github
      </Button>
    </Box>
  )
};

export default LoginButtons;