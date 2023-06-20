import { createSlice } from '@reduxjs/toolkit'

export const apiSlice = createSlice({
  name: 'auth',
  initialState: {
    API_LOADED              : false,
    API_LOADING             : true,
    API_FAILED              : false,
    API_VERIFIED            : false,
    API_CALLED              : false
  },
  reducers: {
    // aka actions with 2 parameters [state,action]
    api_called: (state,action)   => {
      return {...state, API_CALLED: action.payload};
    },
    api_loaded: (state,action)   => {
      return {...state, API_LOADED: action.payload};
    },
    api_loading: (state,action)        => {
      return {...state, API_LOADING: action.payload};
    },
    api_verified: (state, action)        => {
        return {...state, API_VERIFIED: action.payload};
    },
    api_failed: (state, action)        => {
      return {...state, API_FAILED: action.payload};
    },
    api_update: (state,action)         => {
      return {...state,...action.payload};
    },
  },
})

// Action creators are generated for each case reducer function
export const { api_called, api_loading, api_loaded, api_failed, api_verified, api_update } = apiSlice.actions;

export default apiSlice.reducer;