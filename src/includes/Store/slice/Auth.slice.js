import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    AUTH_LOADED             : false,
    AUTH_LOADING            : true,
    IS_USER_LOGGED_IN       : false,
    AUTH_USER               : {},
    AUTH_TOKENS             : {}
  },
  reducers: {
    // aka actions with 2 parameters [state,action]
    is_user_logged_in: (state,action)   => {
      return {...state, IS_USER_LOGGED_IN: action.payload};
    },
    auth_loading: (state,action)        => {
      return {...state, AUTH_LOADING: action.payload};
    },
    auth_loaded: (state, action)        => {
      return {...state, AUTH_LOADED: action.payload};
    },
    auth_user: (state,action)           => {
      return {...state, AUTH_USER: action.payload};
    },
    auth_tokens: (state,action)         => {
      return {...state, AUTH_TOKENS: action.payload };
    },
    auth_update: (state,action)         => {
      return {...state,...action.payload};
    }
  },
})

// Action creators are generated for each case reducer function
export const { is_user_logged_in, auth_loading, auth_loaded, auth_user, auth_tokens, auth_update } = authSlice.actions;

export default authSlice.reducer;