import { configureStore } from '@reduxjs/toolkit';

import { contactsListSlice } from './contacts';

const store = configureStore({
  reducer: {
    contactsList: contactsListSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
