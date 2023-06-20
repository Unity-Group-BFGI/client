import { createSlice } from '@reduxjs/toolkit'

export const storageSlice = createSlice({
  name: 'storage',
  initialState: {
    IS_QUIZ_LOADING : true,
    CURRENT_TAB     : null,
    CURRENT_QUIZ    : null,
    CURRENT_EDITABLE_ID: null
  },
  reducers: {
    // aka actions with 2 parameters [state,action]
    set_is_quiz_loading: (state,action) => {
      return { ...state, IS_QUIZ_LOADING: action.payload };
    },
    set_current_tab: (state,action)   => {
      return { ...state, CURRENT_TAB: action.payload };
    },
    set_current_quiz: (state,action)    => {
      return { ...state, CURRENT_QUIZ: action.payload };
    },
    storage_update: (state,action)         => {
      return { ...state, ...action.payload };
    },
    update_current_quiz: (state,action)     => {
      return { ...state, CURRENT_QUIZ: {...state.CURRENT_QUIZ, ...action.payload }}
    },
    set_current_editable_id: (state,action) => {
      return { ...state, CURRENT_EDITABLE_ID: action.payload }
    }
  }
});

// Action creators are generated for each case reducer function
export const { set_current_quiz, set_current_tab, set_is_quiz_loading, storage_update, update_current_quiz, set_current_editable_id } = storageSlice.actions;

export default storageSlice.reducer;