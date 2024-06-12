<<<<<<< HEAD
import { FC } from 'react';

import { TOrder } from '@utils-types';
=======
import { FC, useEffect } from 'react';
import { TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
>>>>>>> 984f075 (after first review)
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
<<<<<<< HEAD
  /** TODO: взять переменные из стора */
  const orders: TOrder[] = [];
  const feed = {};
=======
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  const orders: TOrder[] = useSelector((state) => state.orders.orders);
  const total = useSelector((state) => state.orders.total);
  const totalToday = useSelector((state) => state.orders.totalToday);
>>>>>>> 984f075 (after first review)

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
