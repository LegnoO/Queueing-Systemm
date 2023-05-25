/** @format */
import { AccountListType } from "../types/Api";
import { fetchAccount } from "../services/api"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchAccountList = createAsyncThunk(
  "firebase/fetchAccount",
  fetchAccount
);

interface AccountState {
  data: AccountListType[];
  status: "idle" | "pending" | "succeeded" | "failed";
  isLoading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  data: [],
  status: "idle",
  isLoading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountList.pending, (state) => {
        Object.assign(state, {
          isLoading: true,
          status: "pending",
        });
      })
      .addCase(
        fetchAccountList.fulfilled,
        (state, action: PayloadAction<AccountListType[]>) => {
          Object.assign(state, {
            isLoading: false,
            status: "succeeded",
            data: action.payload,
          });
        }
      )
      .addCase(fetchAccountList.rejected, (state, action: any) => {
        Object.assign(state, {
          isLoading: false,
          status: "failed",
          error: action.error.message,
        });
      });
  },
});

export default accountSlice.reducer;
