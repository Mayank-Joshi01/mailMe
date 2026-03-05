// Frontend Code (VerifyPage.tsx)
import { useEffect , useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useAlert } from '../context/AlertConext';
import { useAuth } from '../context/AuthContext';


export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const hasFetched = useRef(false); // 1. Create a flag
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { verifyMagicLink } = useAuth();

  useEffect(() => {
    // 2. Check if we've already started the request
    if (hasFetched.current) return;
    hasFetched.current = true; 

    const verifyToken = async () => {
      const token = searchParams.get('token');
      const email = searchParams.get('email');

      if (!token || !email) {
        showAlert("Invalid link", "error");
        return navigate('/login');
      }

      const result = await verifyMagicLink({ token, email });
      if (result) {
        navigate('/');
      } else {
        navigate('/login');
      }
    };

    verifyToken();
  }, [searchParams, navigate, showAlert]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Verifying your link, please wait...</p>
    </div>
  );
}