// Frontend Code (VerifyPage.tsx)
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useAuth } from '../context/AppContext';

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const { showAlert } = useAuth();
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      const email = searchParams.get('email');

      if (!token) {
        showAlert("Invalid link", "error");
        return navigate('/login');
      }

      try {
        // NOW we call the backend API
        const response = await fetch(`${API_URL}/api/auth/verify-signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, email })
        });

        const data = await response.json();

        if (response.ok) {
          showAlert("Email verified! ", "success");
          navigate('/');
        } else {
          showAlert(data.message, "error");
        }
      } catch (err) {
        showAlert("Connection error", "error");
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