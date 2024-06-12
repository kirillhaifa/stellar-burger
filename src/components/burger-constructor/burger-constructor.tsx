import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
<<<<<<< HEAD

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
=======
import { clearConstructor } from '../../services/slices/constructorSlice';
import { TNewOrderResponse, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';
import { setDesiredUrl } from '../../services/slices/authSlice';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const authed = useSelector((state) => state.auth.authorized);
  const [orderRequest, setOrderRequest] = useState(false);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { bun, constructorIngredients } = useSelector(
    (state) => state.constructorBurger
  );

>>>>>>> 984f075 (after first review)
  const constructorItems = {
    bun: {
      price: 0
    },
    ingredients: []
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
