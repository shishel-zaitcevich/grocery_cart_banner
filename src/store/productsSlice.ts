import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import vinegar from '../assets/images/vinegar.png';
import milk from '../assets/images/milk.png';
import jam from '../assets/images/jam.png';
import cheese from '../assets/images/cheese.png';
import meat from '../assets/images/meat.png';
import turkey from '../assets/images/turkey.png';
import chips from '../assets/images/chips.png';
import pineapple from '../assets/images/pineapple.png';
import banana from '../assets/images/banana.png';
import apple from '../assets/images/apple.png';
import lettuce from '../assets/images/lettuce.png';

export interface Product {
  id: number;
  src: string;
  hidden: boolean;
}

export interface ProductsState {
  dairyProducts: Product[];
  meatProducts: Product[];
  fruitProducts: Product[];
  cartItems: Product[];
}

const initialState: ProductsState = {
  dairyProducts: [
    { id: 1, src: vinegar, hidden: false },
    { id: 2, src: milk, hidden: false },
    { id: 3, src: jam, hidden: false },
    { id: 4, src: cheese, hidden: false },
  ],
  meatProducts: [
    { id: 5, src: meat, hidden: false },
    { id: 6, src: turkey, hidden: false },
    { id: 7, src: chips, hidden: false },
  ],
  fruitProducts: [
    { id: 8, src: pineapple, hidden: false },
    { id: 9, src: banana, hidden: false },
    { id: 10, src: apple, hidden: false },
    { id: 11, src: lettuce, hidden: false },
  ],
  cartItems: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const productToAdd = [state.dairyProducts, state.meatProducts, state.fruitProducts]
        .flat()
        .find((product) => product.src === action.payload);

      if (productToAdd) {
        productToAdd.hidden = true;
        state.cartItems.push(productToAdd);
      }
    },
  },
});

export const { addToCart } = productsSlice.actions;
export default productsSlice.reducer;


