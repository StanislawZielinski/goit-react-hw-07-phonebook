import { configureStore, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const INIT_STATE = {
    filter: '',
} ;

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INIT_STATE,
  reducers: {
    filterContact(state, action) {
      state.filter = action.payload
    },
  }
})
const store = configureStore({
    reducer: {
        contacts: contactsSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export const { filterContact } = contactsSlice.actions
export default store;