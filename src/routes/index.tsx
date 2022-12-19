import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Contact } from 'react-native-contacts';

import ContactsList from '../screens/ContactsList';
import ContactDetails from '../screens/ContactDetails';

export type MainStackParamsList = {
  ContactsList: undefined;
  ContactDetails: {
    backgroundColor?: string;
    data: Contact;
  };
};

const Stack = createStackNavigator<MainStackParamsList>();

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="ContactsList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ContactsList" component={ContactsList} />
      <Stack.Screen name="ContactDetails" component={ContactDetails} />
    </Stack.Navigator>
  );
}
