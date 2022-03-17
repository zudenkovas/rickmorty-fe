import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from './auth/reducer';
import charactersReducer from './characters/reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    characters: charactersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
