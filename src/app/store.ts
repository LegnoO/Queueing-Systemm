/** @format */

import { configureStore, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { createLogger } from "redux-logger";
import { combineReducers } from "redux";
import deviceSlice from "../features/deviceSlice";
import thunkMiddleware from "redux-thunk";
// Reducers
// import counterReducer from "./counterSlice";
const rootReducer = combineReducers({
  device: deviceSlice,
});

const loggerMiddleware = createLogger();

const middleware = [thunkMiddleware, loggerMiddleware];

export type RootState = ReturnType<typeof rootReducer>;

// thunk dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});
