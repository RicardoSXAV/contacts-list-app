import React, { useEffect } from 'react';
import {
  View,
  SectionList,
  StatusBar,
  Platform,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ContactItem from '../../components/ContactItem';
import ContactSectionHeader from '../../components/ContactSectionHeader';
import FavoriteContactDisplay from '../../components/FavoriteContactDisplay';
import Text from '../../components/Text';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getContactsPermission,
  getSectionedContacts,
} from '../../utils/contacts';
import { setContactsState } from '../../store/contacts';
import { config } from '../../styles';

export default function ContactsList() {
  const { contacts, favoriteContact, permissionStatus } = useAppSelector(
    (state) => state.contactsList,
  );
  const dispatch = useAppDispatch();
  const safeArea = useSafeAreaInsets();

  useEffect(() => {
    if (!permissionStatus) {
      getContactsPermission().then(async (status) => {
        dispatch(setContactsState({ permissionStatus: status }));

        if (status !== 'authorized') {
          return;
        }

        const sectionedContacts = await getSectionedContacts();
        dispatch(setContactsState({ contacts: sectionedContacts }));
      });
    }
  }, [contacts, permissionStatus, dispatch]);

  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === 'ios' && (
        <View
          style={{
            width: '100%',
            height: safeArea.top,
            backgroundColor: config.colors.darkBlueGray,
          }}
        />
      )}
      <StatusBar backgroundColor={config.colors.darkBlueGray} />
      <FavoriteContactDisplay />

      {permissionStatus === 'denied' && (
        <View style={styles.messageScreen}>
          <View style={styles.messageContainer}>
            <FastImage
              source={require('../../assets/images/contacts-denied.png')}
              style={{ width: 180, height: 180 }}
              resizeMode="contain"
            />
            <Text
              fontFamily="semiBold"
              fontSize={17}
              textAlign="center"
              color={config.colors.red}
            >
              The application does not work without access to contacts
            </Text>
          </View>
        </View>
      )}

      {contacts.length ? (
        <SectionList
          sections={contacts}
          keyExtractor={(item) => item.recordID}
          renderItem={({ item, index, section }) => {
            const isFavoriteContact =
              favoriteContact?.recordID === item.recordID;
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
          renderSectionHeader={({ section }) => {
            if (
              section.data.length === 1 &&
              section.data[0].recordID === favoriteContact?.recordID
            ) {
              return null;
            }

            return <ContactSectionHeader title={section.title} />;
          }}
          stickySectionHeadersEnabled
          contentContainerStyle={{ alignItems: 'center' }}
        />
      ) : !contacts.length && permissionStatus === 'authorized' ? (
        <View style={styles.messageScreen}>
          <View style={styles.messageContainer}>
            <FastImage
              source={require('../../assets/images/open-book.png')}
              style={{ width: 180, height: 180 }}
              resizeMode="contain"
            />
            <Text
              fontFamily="semiBold"
              fontSize={20}
              textAlign="center"
              color={config.colors.lightBlueGray}
            >
              Your contacts list is empty
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  messageScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    width: '80%',
    paddingVertical: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.colors.white,
  },
});
