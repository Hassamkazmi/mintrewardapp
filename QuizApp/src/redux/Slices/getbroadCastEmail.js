import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const broadCastEmailSlice = createSlice({
  name: "broadCastEmail",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchbroadCastEmail.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchbroadCastEmail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchbroadCastEmail.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default broadCastEmailSlice.reducer;




export const fetchbroadCastEmail = createAsyncThunk(
  "/broadCastEmailget/fetch",
  async () => {

    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/customer/emails/BroadCastAllEmailCustomers`,
      config
    );
    const CustomersData = res.data;
    return CustomersData;
  }
);




