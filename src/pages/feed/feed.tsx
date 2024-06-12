import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
<<<<<<< HEAD
import { FC } from 'react';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = [];
=======
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { cleanOrders, fetchOrders } from '../../services/slices/ordersSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const orders: TOrder[] = useSelector((state) => state.orders.orders);
>>>>>>> 984f075 (after first review)

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
