import { createSlice } from '@reduxjs/toolkit'

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    CREATE_QUIZ_MODAL: false
  },
  reducers: {
    // aka actions with 2 parameters [state,action]
    createQuizModal: (state,action)                => {
      return {...state, CREATE_QUIZ_MODAL: action.payload};
    }
  },
})

// Action creators are generated for each case reducer function
export const { createQuizModal } = modalsSlice.actions;

export default modalsSlice.reducer;