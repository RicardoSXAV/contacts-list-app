import { PermissionStatus } from 'react-native';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from 'react-native-contacts';

export type ContactsListState = {
  contacts: {
    title: string;
    data: Contact[];
  }[];
  favoriteContact?: Contact;
  permissionStatus?: PermissionStatus;
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
  },
});

export const { setContactsState } = contactsListSlice.actions;
