/** @format */
import { DeviceListType } from "../types/Api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// fetchDeviceData
// export const fetchDevice = createAsyncThunk(
//   "firebase/fetchTicket",
//   fetchDeviceData
// );

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
  name: "devices",
  initialState,
  reducers: {
    fetchDeviceStart: (state) => {
      state.status = "pending";
      state.isLoading = true;
      state.error = null;
    },
    fetchDeviceSuccess: (state, action: PayloadAction<DeviceListType[]>) => {
      state.status = "succeeded";
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchDeviceFailure: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchDevice.pending, (state) => {
  //       Object.assign(state, {
  //         isLoading: true,
  //         status: "pending",
  //       });
  //     })
  //     .addCase(
  //       fetchDevice.fulfilled,
  //       (state, action: PayloadAction<Device[]>) => {
  //         Object.assign(state, {
  //           isLoading: false,
  //           status: "succeeded",
  //           data: action.payload,
  //         });
  //       }
  //     )
  //     .addCase(fetchDevice.rejected, (state, action: any) => {
  //       Object.assign(state, {
  //         isLoading: false,
  //         status: "failed",
  //         error: action.error.message,
  //       });
  //     });
  // },
});

export const { fetchDeviceStart, fetchDeviceSuccess, fetchDeviceFailure } =
  deviceSlice.actions;
export default deviceSlice.reducer;
