/** @format */
import { DeviceListType } from "../types/Api";
import { fetchDevice } from "../services/api"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchDeviceList = createAsyncThunk(
  "firebase/fetchDevice",
  fetchDevice
);

interface DeviceState {
  data: DeviceListType[];
  status: "idle" | "pending" | "succeeded" | "failed";
  isLoading: boolean;
  error: string | null;
}

const initialState: DeviceState = {
  data: [],
  status: "idle",
  isLoading: false,
  error: null,
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeviceList.pending, (state) => {
        Object.assign(state, {
          isLoading: true,
          status: "pending",
        });
      })
      .addCase(
        fetchDeviceList.fulfilled,
        (state, action: PayloadAction<DeviceListType[]>) => {
          Object.assign(state, {
            isLoading: false,
            status: "succeeded",
            data: action.payload,
          });
        }
      )
      .addCase(fetchDeviceList.rejected, (state, action: any) => {
        Object.assign(state, {
          isLoading: false,
          status: "failed",
          error: action.error.message,
        });
      });
  },
});

export default deviceSlice.reducer;
