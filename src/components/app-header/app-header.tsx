import { FC } from 'react';
import { AppHeaderUI } from '@ui';
<<<<<<< HEAD

export const AppHeader: FC = () => <AppHeaderUI userName='' />;
=======
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector((state) => state.auth.user.name);
  return <AppHeaderUI userName={userName} />;
};
>>>>>>> 984f075 (after first review)
