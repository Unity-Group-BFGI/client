import { createSlice } from '@reduxjs/toolkit'

export const routeSlice = createSlice({
  name: 'route',
  initialState: {
    PARENT : "my-account",
    CHILD  : "my-account-overview",
    SUB_CHILD: "",
    CURRENT_ROUTE: {},
    DYNAMIC_ROUTES_LOADING : false,
    HAS_DYNAMIC_ROUTES: false,
    DYNAMIC_ROUTES: []
  },
  reducers: {
    // aka actions with 2 parameters [state,action]
    parent: (state,action)                => {
      return {...state, PARENT: action.payload};
    },
    child: (state,action)                 => {
      return {...state, CHILD: action.payload};
    },
    current_route: (state,action)         => {
      return {...state, CURRENT_ROUTE: action.payload};
    },
    set_sub_child: (state,action)         => {
      return {...state, SUB_CHILD: action.payload};
    },
    route_update: (state,action)          => {
      return {...state,...action.payload};
    },
  },
})

// Action creators are generated for each case reducer function
export const { route_update, parent, child, current_route, set_sub_child } = routeSlice.actions;

export default routeSlice.reducer;