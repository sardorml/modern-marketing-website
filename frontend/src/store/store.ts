import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import languageReducer from './slices/languageSlice';
import subscriptionReducer from './slices/subscriptionSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchReducer,
      language: languageReducer,
      subscription: subscriptionReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
