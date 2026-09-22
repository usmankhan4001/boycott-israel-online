import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

export function useAdmin() {
  const { isAuthenticated, verifyToken, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    } else {
      verifyToken().then(valid => {
        if (!valid) {
          navigate('/admin/login');
        }
      });
    }
  }, [isAuthenticated, verifyToken, navigate]);

  return { isAuthenticated, isLoading };
}
