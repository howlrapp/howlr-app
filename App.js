import 'react-native-gesture-handler';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';

import * as SplashScreen from 'expo-splash-screen';

import AppReduxLegacyStore from './app/AppReduxLegacyStore';

SplashScreen.preventAutoHideAsync().catch(() => {});

const App = () => (
  <AppReduxLegacyStore />
);

export default App;
