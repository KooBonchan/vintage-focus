import useAuthStore from "@/stores/authStore";
import { MemberResponse } from "@/types/response";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {setAuth} = useAuthStore();
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
          `${import.meta.env.VITE_API_ROOT}/auth/signin`, // proxying with server request
          {
            provider,
            code,
            codeVerifier,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        const memberInfo:MemberResponse = response.data;
        
        const accessToken = response.headers.getAuthorization?.toString();
        if(!accessToken) { throw new Error('JWT not found in Authorization header') }

        sessionStorage.removeItem(`${provider}_code_verifier`);
        sessionStorage.removeItem('provider');
        setAuth(memberInfo, accessToken);
        if(memberInfo.isRegistered){
          navigate('/');
        } else {
          navigate("/register");
        }
        
      } catch (error) {
        console.error('Error during authentication:', error);
        navigate('/signin?error');
      }
    };

    exchangeCodeForTokens();
  }, [searchParams, navigate, setAuth]);

  return <div>Loading...</div>;
};

export default Callback;