// Frontend Code (VerifyPage.tsx)
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useAuth } from '../context/AppContext';

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const { showAlert } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');

      if (!token) {
        showAlert("Invalid link", "error");
        return navigate('/login');
      }

      try {
        // NOW we call the backend API
        const response = await fetch(`http://localhost:5000/api/auth/verify-link`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });

        const data = await response.json();

        if (response.ok) {
          showAlert("Email verified! You can now login.", "success");
          navigate('/login');
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