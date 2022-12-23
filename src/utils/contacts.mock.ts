import { LaunchArguments } from 'react-native-launch-arguments';

interface ContactsUtilsArgs {
  isDenied?: boolean;
}

export const getSectionedContacts = async () => {
  return new Promise((resolve) => {
    resolve([
      {
        title: 'A',
        data: [
          {
            birthday: { day: 29, month: 8, year: 1985 },
            company: '',
            displayName: 'Anna Haro',
            emailAddresses: [{ email: 'anna-haro@mac.com', label: 'home' }],
            familyName: 'Haro',
            givenName: 'Anna',
            hasThumbnail: false,
            imAddresses: [],
            jobTitle: '',
            middleName: '',
            phoneNumbers: [{ label: 'home', number: '555-522-8243' }],
            postalAddresses: [
              {
                city: 'Sausalito',
                country: 'USA',
                label: 'home',
                postCode: '94965',
                region: 'CA',
                state: 'CA',
                street: '1001  Leavenworth Street',
              },
            ],
            recordID: 'F57C8277-585D-4327-88A6-B5689FF69DFE',
            thumbnailPath: '',
            urlAddresses: [],
          },
        ],
      },
    ]);
  });
};

export const getContactsPermission = async (): Promise<
  'authorized' | 'denied' | undefined
> => {
  const { isDenied } = LaunchArguments.value<ContactsUtilsArgs>();

  console.log(isDenied);

  return new Promise((resolve) => {
    if (isDenied) {
      resolve('denied');
    } else {
      resolve('authorized');
    }
  });
};
