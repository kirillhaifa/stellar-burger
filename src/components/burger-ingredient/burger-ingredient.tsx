import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../services/slices/constructorSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { v4 as uuidv4 } from 'uuid';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = (ingredient: TIngredient) => {
      const ingredientWithId: TConstructorIngredient = {
        ...ingredient,
        id: uuidv4()
      };
      dispatch(addItem(ingredientWithId));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={() => handleAdd(ingredient)}
      />
    );
  }
);
