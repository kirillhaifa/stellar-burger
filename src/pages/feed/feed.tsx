import { getFeedsApi } from '@api';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanOrders, fetchOrders } from '../../services/slices/ordersSlice';
import { AppDispatch, RootState } from 'src/services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.orders
  );

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(cleanOrders());
        dispatch(fetchOrders());
      }}
    />
  );
};
