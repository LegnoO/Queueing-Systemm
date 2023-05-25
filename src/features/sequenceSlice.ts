/** @format */
import { SequenceListType } from "../types/Api";
import { fetchSequence } from "../services/api"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchSequenceList = createAsyncThunk(
  "firebase/fetchSequence",
  fetchSequence
);

interface SequenceState {
  data: SequenceListType[];
  status: "idle" | "pending" | "succeeded" | "failed";
  isLoading: boolean;
  error: string | null;
}

const initialState: SequenceState = {
  data: [],
  status: "idle",
  isLoading: false,
  error: null,
};

const sequenceSlice = createSlice({
  name: "sequence",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSequenceList.pending, (state) => {
        Object.assign(state, {
          isLoading: true,
          status: "pending",
        });
      })
      .addCase(
        fetchSequenceList.fulfilled,
        (state, action: PayloadAction<SequenceListType[]>) => {
          Object.assign(state, {
            isLoading: false,
            status: "succeeded",
            data: action.payload,
          });
        }
      )
      .addCase(fetchSequenceList.rejected, (state, action: any) => {
        Object.assign(state, {
          isLoading: false,
          status: "failed",
          error: action.error.message,
        });
      });
  },
});

export default sequenceSlice.reducer;
