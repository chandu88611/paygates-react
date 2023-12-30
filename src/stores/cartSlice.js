// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchCartProducts } from './cartThunk';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    // Add other reducer actions if needed
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartProducts.fulfilled, (state, action) => {
      // Update the cart state with the fetched data
      return action.payload;
    });
  },
});

export const { setCartProducts } = cartSlice.actions;
export default cartSlice.reducer;
