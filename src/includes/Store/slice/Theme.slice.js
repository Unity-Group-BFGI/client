import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    THEME             : "light",
    WIDTH             : null,
    SIDEBAR           : true,
    LOCKED            : false,
    X                 : null,
    Y                 : null
  },
  reducers: {
    // aka actions with 2 parameters [state,action]
    theme: (state,action)   => {
      return {...state, THEME: action.payload};
    },
    width: (state,action)        => {
      return {...state, WIDTH: action.payload};
    },
    sidebar: (state,action)             => {
      return {...state, SIDEBAR: action.payload};
    },
    locked: (state,action) => {
      return {...state, LOCKED: action.payload};
    },
    y:  (state,action)                    => {
      return {...state,Y: action.payload}
    },
    theme_update: (state,action)         => {
      return {...state,...action.payload};
    }
  },
})

// Action creators are generated for each case reducer function
export const { theme, width, sidebar, locked, y, theme_update } = themeSlice.actions;

export default themeSlice.reducer;