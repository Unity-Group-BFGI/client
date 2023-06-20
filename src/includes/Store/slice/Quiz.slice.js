import { createSlice } from '@reduxjs/toolkit'

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    IELTS_MY_QUIZZES: [],
    IELTS_FREE_QUIZZES: [],
    IELTS_MY_QUIZZES_PAGE_CONFIG: {
      cp: 1,
      pp: 10,
      tp: 1
    }
  },
  reducers: {
    // aka actions with 2 parameters [state,action]
    appendIeltsMyQuizzes: (state,action)                => {
      return {...state, IELTS_MY_QUIZZES: [...state.IELTS_MY_QUIZZES,action.payload] };
    },
    setIeltsMyQuizzes: (state,action)                => {
      return {...state, IELTS_MY_QUIZZES: action.payload };
    },
    appendIeltsFreeQuizzes: (state,action)                => {
      return {...state, IELTS_FREE_QUIZZES: [...action.payload] };
    },
    setIeltsFreeQuizzes: (state,action)                => {
      return {...state, IELTS_FREE_QUIZZES: action.payload };
    },
    setIeltsMyQuizzesPageConfig: (state,action)         => {
      return {...state, ...action.payload };
    }
  },
})

// Action creators are generated for each case reducer function
export const { setIeltsMyQuizzes, appendIeltsMyQuizzes, appendIeltsFreeQuizzes, setIeltsFreeQuizzes, setIeltsMyQuizzesPageConfig } = quizSlice.actions;

export default quizSlice.reducer;