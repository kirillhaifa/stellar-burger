import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../../services/slices/authSlice';
import { AppDispatch, RootState } from 'src/services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  const userOrders: TOrder[] = useSelector(
    (state: RootState) => state.auth.orders
  );
  const ordersAreLoading = useSelector(
    (state: RootState) => state.auth.ordersIsLoading
  );

  if (ordersAreLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
