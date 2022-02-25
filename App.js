import 'react-native-gesture-handler';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync().catch(() => {});

import AppBootstrap from './app/AppBootstrap';

const App = () => (
  <>
    {Platform.OS === 'ios' ? <StatusBar style={'light'} translucent={false} /> : null}
    <AppBootstrap />
  </>
);

export default App;
