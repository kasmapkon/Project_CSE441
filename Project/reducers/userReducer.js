import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { userEmail: '' },
  reducers: {
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    logoutUser: (state) => {
      state.userEmail = ''; 
    },
  },
});

export const { setUserEmail, logoutUser } = userSlice.actions;
export default userSlice.reducer;