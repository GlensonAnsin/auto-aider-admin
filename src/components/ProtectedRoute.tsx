import { useNavigate } from 'react-router';
import { getAccessToken } from '../utils/tokenStorage';
import { useState, type JSX } from 'react';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState<JSX.Element | null>(null);

  (async () => {
    const token = await getAccessToken();
    if (!token) {
      navigate('/login');
    } else {
      setRedirect(children);
    }
  })();

  return <>{redirect}</>;
}
