import React, { useEffect } from 'react';
import {
  View,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  SectionList,
} from 'react-native';

import ContactItem from '../../components/ContactItem';
import ContactSectionHeader from '../../components/ContactSectionHeader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSectionedContacts } from '../../utils';
import { setContactsState } from '../../store/contacts';
import FavoriteContactDisplay from '../../components/FavoriteContactDisplay';

export default function ContactsList() {
  const { contacts, favoriteContact, permissionStatus } = useAppSelector(
    (state) => state.contactsList,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!permissionStatus && Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ).then(async (status) => {
        dispatch(setContactsState({ permissionStatus: status }));

        const sectionedContacts = await getSectionedContacts();

        dispatch(setContactsState({ contacts: sectionedContacts }));
      });
    }
  }, [contacts, permissionStatus, dispatch]);

  return (
    <View style={styles.mainContainer}>
      <FavoriteContactDisplay />

      <SectionList
        sections={contacts}
        keyExtractor={(item) => item.recordID}
        renderItem={({ item, index, section }) => {
          const isFavoriteContact = favoriteContact?.recordID === item.recordID;
          const previousIsFavoriteContact =
            section.data[index - 1]?.recordID === favoriteContact?.recordID;
          const nextIsFavoriteContact =
            section.data[index + 1]?.recordID === favoriteContact?.recordID;

          const isFirstItem =
            index === 0 || (index === 1 && previousIsFavoriteContact);
          const isLastItem =
            section.data.length === index + 1 ||
            (section.data.length - 2 === index && nextIsFavoriteContact);

          if (isFavoriteContact) {
            return null;
          }

          return (
            <View
              style={{
                marginTop: isFirstItem ? 40 : 0,
                marginBottom: isLastItem ? 30 : 0,
              }}
            >
              <ContactItem data={item} />
            </View>
          );
        }}
        renderSectionHeader={({ section }) => (
          <ContactSectionHeader title={section.title} />
        )}
        stickySectionHeadersEnabled
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {},
  favoriteContactContainer: {
    width: '100%',
    alignItems: 'center',
  },
  favoriteContactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});
