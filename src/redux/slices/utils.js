import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedModule: null,
  orderType: 0,
  currentTab: "",
  orderDetailsModalOpen: false,
  orderInformation: {},
  welcomeModal: false,
  openForgotPasswordModal: false,
};
export const utilsSlice = createSlice({
  name: "utils-data",
  initialState,
  reducers: {
    setSelectedModule: (state, action) => {
      state.selectedModule = action.payload;
    },
    setOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setOrderDetailsModalOpen: (state, action) => {
      state.orderDetailsModalOpen = action.payload;
    },
    setOrderInformation: (state, action) => {
      state.orderInformation = action.payload;
    },
    setWelcomeModal: (state, action) => {
      state.welcomeModal = action.payload;
    },
    setOpenForgotPasswordModal: (state, action) => {
      state.openForgotPasswordModal = action.payload;
    },
  },
});

export const {
  setSelectedModule,
  setOrderType,
  setCurrentTab,
  setOrderDetailsModalOpen,
  setOrderInformation,
  setWelcomeModal,
  setOpenForgotPasswordModal,
} = utilsSlice.actions;

export default utilsSlice.reducer;
