import Contacts, { Contact } from 'react-native-contacts';

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getSectionedContacts = async () => {
  const allContacts = await Contacts.getAll();

  const letterMap: Record<string, Contact[]> = {};

  allContacts.forEach((contact) => {
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
};
