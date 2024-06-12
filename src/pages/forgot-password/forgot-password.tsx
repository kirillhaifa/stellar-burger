import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
<<<<<<< HEAD
=======
import { useSelector } from '../../services/store';
>>>>>>> 984f075 (after first review)

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();
<<<<<<< HEAD
=======
  const authed = useSelector((state) => state.auth.authorized);

  useEffect(() => {
    if (authed) {
      navigate('/');
    }
  }, []);
>>>>>>> 984f075 (after first review)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
