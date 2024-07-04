import { Navigate } from 'react-router';
import { Preloader } from '../ui/preloader';
import { useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const authIsChecking = useSelector((state) => state.auth.authIsChecking);
  const authed = useSelector((state) => state.auth.authorized);
  const location = useLocation();

  if (authIsChecking) {
    return <Preloader />;
  }

  if (!authed) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
