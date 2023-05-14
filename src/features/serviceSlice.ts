/** @format */
import { ServiceListType } from "../types/Api";
import { fetchService } from "../services/api"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchServiceList = createAsyncThunk(
  "firebase/fetchTicket",
  fetchService
);

interface ServiceState {
  data: ServiceListType[];
  status: "idle" | "pending" | "succeeded" | "failed";
  isLoading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  data: [],
  status: "idle",
  isLoading: false,
  error: null,
};

const ServiceSlice = createSlice({
  name: "Service",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceList.pending, (state) => {
        Object.assign(state, {
          isLoading: true,
          status: "pending",
        });
      })
      .addCase(
        fetchServiceList.fulfilled,
        (state, action: PayloadAction<ServiceListType[]>) => {
          Object.assign(state, {
            isLoading: false,
            status: "succeeded",
            data: action.payload,
          });
        }
      )
      .addCase(fetchServiceList.rejected, (state, action: any) => {
        Object.assign(state, {
          isLoading: false,
          status: "failed",
          error: action.error.message,
        });
      });
  },
});

export default ServiceSlice.reducer;
