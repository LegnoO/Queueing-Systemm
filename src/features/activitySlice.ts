/** @format */
import { ActivityListType } from "../types/Api";
import { fetchActivity } from "../services/api"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchActivityList = createAsyncThunk(
  "firebase/fetchActivity",
  fetchActivity
);

interface ActivityState {
  data: ActivityListType[];
  status: "idle" | "pending" | "succeeded" | "failed";
  isLoading: boolean;
  error: string | null;
}

const initialState: ActivityState = {
  data: [],
  status: "idle",
  isLoading: false,
  error: null,
};

const ActivitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityList.pending, (state) => {
        Object.assign(state, {
          isLoading: true,
          status: "pending",
        });
      })
      .addCase(
        fetchActivityList.fulfilled,
        (state, action: PayloadAction<ActivityListType[]>) => {
          Object.assign(state, {
            isLoading: false,
            status: "succeeded",
            data: action.payload,
          });
        }
      )
      .addCase(fetchActivityList.rejected, (state, action: any) => {
        Object.assign(state, {
          isLoading: false,
          status: "failed",
          error: action.error.message,
        });
      });
  },
});

export default ActivitySlice.reducer;
