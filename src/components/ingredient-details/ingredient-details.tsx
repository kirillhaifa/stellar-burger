import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
<<<<<<< HEAD

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientData = null;
=======
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredientData = useSelector((state) => state.ingredients.items).find(
    (ingredient) => ingredient._id === id
  );
>>>>>>> 984f075 (after first review)

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
