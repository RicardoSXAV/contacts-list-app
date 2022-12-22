import { Alert, PermissionsAndroid, Platform } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';

export const getSectionedContacts = async () => {
  try {
    const allContacts = await Contacts.getAll();

    const letterMap: Record<string, Contact[]> = {};

    allContacts.forEach((contact) => {
      const { displayName, givenName, familyName } = contact;

      if (!displayName) {
        contact = { ...contact, displayName: `${givenName} ${familyName}` };
      }

      const letter = contact.displayName[0].toUpperCase();

      letterMap[letter] = letterMap[letter] || [];

      letterMap[letter].push(contact);
    });

    const sectionedContacts = Object.entries(letterMap)
      .map(([letter, list]) => ({
        title: letter,
        data: list,
      }))
      .sort((a, b) => a.title.localeCompare(b.title));

    return sectionedContacts;
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'There was an error trying to get all contacts');
  }
};

export const getContactsPermission = async (): Promise<
  'authorized' | 'denied' | undefined
> => {
  try {
    if (Platform.OS === 'ios') {
      const status = await Contacts.requestPermission();

      if (status === 'authorized') {
        return 'authorized';
      } else {
        return 'denied';
      }
    }

    if (Platform.OS === 'android') {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );

      if (status === 'granted') {
        return 'authorized';
      } else {
        return 'denied';
      }
    }
  } catch (error) {
    console.log(error);
    Alert.alert(
      'Permission Error',
      'There was an error trying to ask for contacts permission',
    );
  }
};
