import { authConfig } from "@/types/auth";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const exchangeCodeForTokens = async () => {
      const code = searchParams.get('code');
      if (!code) {
        console.error('No code found in URL');
        navigate('/signin?error');
        return;
      }

      const provider = sessionStorage.getItem('provider') || 'google';
      const { clientId, redirectUri, tokenUrl } = authConfig[provider];
      const codeVerifier = sessionStorage.getItem(`${provider}_code_verifier`);

      if (!codeVerifier) {
        console.error('No code verifier found');
        navigate('/signin?error');
        return;
      }

      try {
        // Exchange code for tokens


        const response = await axios.post(
          'http://localhost:8094/api/auth/exchange',
          {
            provider,
            code,
            codeVerifier,
            redirectUri,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );



        const tokens = response.data;
        console.log('Tokens received:', tokens);

        // For now, just log the tokens; next step is to store/send them
        const jwt = tokens.id_token || tokens.access_token; // Use id_token if available

        // Clean up sessionStorage
        sessionStorage.removeItem(`${provider}_code_verifier`);
        sessionStorage.removeItem('provider');

        // Redirect to home (or wherever you want)
        navigate('/');
      } catch (error) {
        console.error('Token exchange failed:', error);
        navigate('/signin?error');
      }
    };

    exchangeCodeForTokens();
  }, [searchParams, navigate]);

  return <div>Loading...</div>;
};

export default Callback;