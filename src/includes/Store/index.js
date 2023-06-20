
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/Auth.slice';
import themeSlice from './slice/Theme.slice';
import apiSlice from './slice/Api.slice';
import myAcountSlice from './slice/MyAccount.slice';
import routeSlice from './slice/Route.slice';
import modalsSlice from './slice/modals.slice';
import quizSlice from './slice/Quiz.slice';
import storageSlice from './slice/Storage.slice';

export default configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    api: apiSlice,
    user: myAcountSlice,
    route: routeSlice,
    modals: modalsSlice,
    quiz: quizSlice,
    storage: storageSlice
  },
});
