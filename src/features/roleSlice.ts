/** @format */
import { RoleListType } from "../types/Api";
import { fetchRole } from "../services/api"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchRoleList = createAsyncThunk(
  "firebase/fetchRole",
  fetchRole
);

interface RoleState {
  data: RoleListType[];
  status: "idle" | "pending" | "succeeded" | "failed";
  isLoading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  data: [],
  status: "idle",
  isLoading: false,
  error: null,
};

const RoleSlice = createSlice({
  name: "Role",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoleList.pending, (state) => {
        Object.assign(state, {
          isLoading: true,
          status: "pending",
        });
      })
      .addCase(
        fetchRoleList.fulfilled,
        (state, action: PayloadAction<RoleListType[]>) => {
          Object.assign(state, {
            isLoading: false,
            status: "succeeded",
            data: action.payload,
          });
        }
      )
      .addCase(fetchRoleList.rejected, (state, action: any) => {
        Object.assign(state, {
          isLoading: false,
          status: "failed",
          error: action.error.message,
        });
      });
  },
});

export default RoleSlice.reducer;
