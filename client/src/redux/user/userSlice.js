import { createSlice } from '@reduxjs/toolkit';
//localStorage.removeItem('persist:root');

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // for update user part !

    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) =>{
      state.error = null;
      state.loading =false;
      state.currentUser = action.payload
    },
    updateUserFailure: (state, action) =>{
      state.error = action.payload;
      state.loading=false;
    },
    // for delete user part !
    deleteUserStart: (state)=>{
      state.loading = true;
    }, 
    deleteUserSuccess: (state)=>{
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
    deleteUserFailure: (state, action)=>{
      state.error =  action.payload;
      state.loading = false
    }
  }
})

export const { signInStart,
   signInSuccess, signInFailure, updateUserStart,
   updateUserSuccess, updateUserFailure, deleteUserStart,
   deleteUserSuccess, deleteUserFailure  } = userSlice.actions;

export default userSlice.reducer;