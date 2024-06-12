import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

// асинхронный thunk для получения данных из API
export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

interface IngredientsState {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: IngredientsState = {
  items: [],
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch ingredients';
        console.log(state.error);
      });
  }
});

export default ingredientsSlice.reducer;
