import 'react-native-gesture-handler';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import { enableScreens } from 'react-native-screens';
enableScreens();

import './wdyr';

import React from 'react';

import AppReduxLegacyStore from './app/AppReduxLegacyStore';

const App = () => (
  <AppReduxLegacyStore />
);

export default App;
