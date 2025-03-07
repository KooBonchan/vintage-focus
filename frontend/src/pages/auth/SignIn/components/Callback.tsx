import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const exchangeCodeForTokens = async () => {
      const code = searchParams.get('code');
      if (!code) {
        console.error('No code found in URL');
        navigate('/signin?error');
        return;
      }

      const provider = sessionStorage.getItem('provider') || 'google';
      const codeVerifier = sessionStorage.getItem(`${provider}_code_verifier`);

      if (!codeVerifier) {
        console.error('No code verifier found');
        navigate('/signin?error');
        return;
      }

      try {
        const response = await axios.post(
          'http://localhost:8094/api/auth/exchange', // proxying with server request
          {
            provider,
            code,
            codeVerifier,
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