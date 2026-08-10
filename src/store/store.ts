import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import favoritesReducer from "./favoritesSlice";
import uiReducer  from "./uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    ui:uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch