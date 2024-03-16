import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IProduct } from "../../../interface/index";
import axiosInstance from "../../../config/axios.config";

interface productsState {
  loading: boolean;
  productList: IProduct[];
  error: null;
}

const initialState: productsState = {
  loading: true,
  productList: [],
  error: null,
};

export const getProductList = createAsyncThunk(
  "products/getProductList",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // get Request
    try {
      const { data } = await axiosInstance.get(
        "/products?limit=10&select=title,price,thumbnail"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "products", // ** Attached with Store
  initialState,
  reducers: {},
  extraReducers: {
    // pending
    [`${getProductList.pending}`]: (state) => {
      state.loading = true;
    },

    // fullfilled
    [`${getProductList.fulfilled}`]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.productList = action.payload;
    },
    // rejected
    [`${getProductList.rejected}`]: (state, action) => {
      state.loading = false;
      state.productList = [];
      state.error = action.payload;
    },
  },
});

export default cartSlice.reducer;
