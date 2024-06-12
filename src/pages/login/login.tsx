import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
<<<<<<< HEAD
=======
import { TAuthResponse, loginUserApi } from '@api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { setData } from '../../services/slices/authSlice';
import { setCookie } from '../../utils/cookie';
>>>>>>> 984f075 (after first review)

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
=======
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authed = useSelector((state) => state.auth.authorized);
  const desiredUrl = useSelector((state) => state.auth.desiredUrl);

  useEffect(() => {
    if (authed) {
      if (desiredUrl) {
        navigate(desiredUrl);
      } else {
        navigate('/');
      }
    }
  }, [authed, desiredUrl, navigate]);
>>>>>>> 984f075 (after first review)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
