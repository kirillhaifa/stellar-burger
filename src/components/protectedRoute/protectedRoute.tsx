import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { AppDispatch, RootState } from 'src/services/store';
import { Preloader } from '../ui/preloader';
import { useEffect } from 'react';
import { setDesiredUrl } from '../../services/slices/authSlice';
import { useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const authIsChecking = useSelector(
    (state: RootState) => state.auth.authIsChecking
  );
  const authed = useSelector((state: RootState) => state.auth.authorized);
  const location = useLocation();

  useEffect(() => {
    if (!authed) {
      dispatch(setDesiredUrl(location.pathname));
    }
  }, [authed, location.pathname, dispatch]);

  if (authIsChecking) {
    return <Preloader />;
  }

  if (!authed) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
