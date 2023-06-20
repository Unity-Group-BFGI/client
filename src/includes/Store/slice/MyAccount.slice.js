import { createSlice } from '@reduxjs/toolkit'

export const myAccountSlice = createSlice({
  name: 'myAccount',
  initialState: {
    USER : {},
    USERMETA: {}
  },
  reducers: {
    // aka actions with 2 parameters [state,action]
    user: (state,action)   => {
      return {...state, USER: action.payload};
    },
    usermeta: (state,action)   => {
      return {...state, USERMETA: action.payload};
    },
    user_update: (state,action)         => {
      return {...state,...action.payload};
    },
  },
})

// Action creators are generated for each case reducer function
export const { user, usermeta, user_update } = myAccountSlice.actions;

export default myAccountSlice.reducer;