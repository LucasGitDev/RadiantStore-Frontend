import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthService } from '../services/auth/AuthService';

export default function ConfirmEmail() {
  const { token } = useParams();
  useEffect(() => {
    AuthService.confirmEmail(token as string).then(() => {
      alert('Email confirmado com sucesso!');
    });
  }, []);
  return <Navigate to="/auth/login" />;
}
