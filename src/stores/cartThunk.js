import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartProducts = createAsyncThunk('cart/fetchCartProducts', async (client_id) => {
  try {
    const response = await axios.get(`https://payment.globalpbxsoftware.com/api/view-cart-details/${client_id}`);
    return response.data; // Assuming the data you want is in the response's data property
  } catch (error) {
    throw error;
  }
});
