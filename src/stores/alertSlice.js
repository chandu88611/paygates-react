import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    message: '',
    color: '',
    alert:""
  },
  reducers: {
    setAlert: (state, action) => {
      state.message = action.payload.message;
      state.color = action.payload.color;
      state.alert=action.payload.alert
    }
  },
});

export const { setAlert } = alertSlice.actions;
export default alertSlice.reducer;
