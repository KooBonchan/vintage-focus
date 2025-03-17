export interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
  authUrl: string;
  tokenUrl: string;
}

export const authConfig: Record<string, OAuthConfig> = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
    redirectUri: `${import.meta.env.VITE_FRONT_ROOT}/callback`,
    scope: 'openid profile email',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
  },
  kakao: {
    clientId: import.meta.env.VITE_KAKAO_CLIENT_ID as string,
    redirectUri: `${import.meta.env.VITE_FRONT_ROOT}/callback`,
    scope: 'profile_nickname profile_image',
    authUrl: 'https://kauth.kakao.com/oauth/authorize',
    tokenUrl: 'https://kauth.kakao.com/oauth/token',
  },
  github: {
    clientId: import.meta.env.VITE_GITHUB_CLIENT_ID as string,
    redirectUri: `${import.meta.env.VITE_FRONT_ROOT}/callback`,
    scope: 'read:user',
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
  },
};

