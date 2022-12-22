import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from 'react-native-contacts';

export type ContactsListState = {
  contacts: {
    title: string;
    data: Contact[];
  }[];
  favoriteContact?: Contact;
  permissionStatus?: 'authorized' | 'denied';
};

const initialState: ContactsListState = {
  contacts: [],
  favoriteContact: undefined,
  permissionStatus: undefined,
};

export const contactsListSlice = createSlice({
  name: 'contactsList',
  initialState,
  reducers: {
    setContactsState: (
      state,
      { payload }: PayloadAction<Partial<ContactsListState>>,
    ) => {
      Object.entries(payload).forEach(([name, value]) => {
        state[name as keyof ContactsListState] = value as any;
      });
    },
    toggleFavoriteContact: (
      state,
      { payload }: PayloadAction<{ contact: Contact }>,
    ) => {
      const { contact } = payload;

      if (state.favoriteContact?.recordID === contact.recordID) {
        state.favoriteContact = undefined;
        return;
      }

      state.favoriteContact = contact;
    },
  },
});

export const { setContactsState, toggleFavoriteContact } =
  contactsListSlice.actions;
