/** @format */

import { configureStore, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { createLogger } from "redux-logger";
import { combineReducers } from "redux";
import deviceSlice from "../features/deviceSlice";
import serviceSlice from "../features/serviceSlice";
import sequenceSlice from "../features/sequenceSlice"
import roleSlice from "../features/roleSlice"
import accountSlice from "../features/accountSlice"
import activitySlice from "../features/activitySlice"
import userSlice from "../features/userSlice"

import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  device: deviceSlice,
  service: serviceSlice,
  sequence: sequenceSlice,
  role: roleSlice,
  account: accountSlice,
  activity: activitySlice,
  user: userSlice,
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
