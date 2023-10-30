import { configureStore, createSlice } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

 interface Product {
    id: string
    title: string
    price: number
    image01: StaticImageData
    image02: StaticImageData
    image03: StaticImageData
    category: string
    desc: string
    quantity : number
  }

  interface Foodproduct {
    isOpen :boolean
    checkoutdata :Product[]
  }

  const initialState: Foodproduct = {
    isOpen: false,
    checkoutdata: [],
  };

const inputDataSlice = createSlice({
  name: "FoodData",
  initialState,
  reducers: {
    addtoCart_SUCCESS: (state, action) => {
      console.log(action.payload);
      console.log(state.checkoutdata);
      const newItem = action.payload;
      const existingItem = state.checkoutdata.find(
        (item) => item.id === newItem.id
      );
      console.log(existingItem);
      if (existingItem) {
        existingItem.quantity += 1;
        console.log(existingItem);
      } else {
        state.checkoutdata = [...state.checkoutdata, action.payload];
      }

      console.log(state.checkoutdata);
    },

    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    removeCartItem: (state, action) => {
      const removeId = action.payload;
      state.checkoutdata = state.checkoutdata.filter(
        (item) => item.id !== removeId
      );
    },
    addQuantity: (state, action) => {
      const addid = action.payload;
      const existingItem = state.checkoutdata.find((item) => item.id === addid);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    subractQuantity: (state, action) => {
      const subid = action.payload;
      const existingItemIndex = state.checkoutdata.findIndex(
        (item) => item.id === subid
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.checkoutdata[existingItemIndex];

        if (existingItem.quantity === 0) {
          state.checkoutdata.splice(existingItemIndex, 1);
        } else {
          existingItem.quantity -= 1;
        }
      }
    },
    Clearcart :(state)=>{
      state.checkoutdata =[];

    }
  },
});

export const {
  addtoCart_SUCCESS,
  openModal,
  closeModal,
  removeCartItem,
  addQuantity,
  subractQuantity,
  Clearcart
} = inputDataSlice.actions;

const store = configureStore({
  reducer: {
    FoodData: inputDataSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType <typeof store.getState>

export  const storeDispatch = store.dispatch;