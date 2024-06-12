import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
<<<<<<< HEAD
=======
import { registerUserApi } from '@api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
>>>>>>> 984f075 (after first review)

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
=======
  const navigate = useNavigate();
  const authed = useSelector((state) => state.auth.authorized);

  useEffect(() => {
    if (authed) {
      navigate('/');
    }
  }, []);
>>>>>>> 984f075 (after first review)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
