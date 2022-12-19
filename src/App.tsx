import React from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';

import Routes from './routes';
import store from './store';
import { config } from './styles';

const CustomTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: config.colors.blueGray,
  },
};

export default function App() {
  return (
    <NavigationContainer theme={CustomTheme}>
      <ReduxProvider store={store}>
        <Routes />
      </ReduxProvider>
    </NavigationContainer>
  );
}
