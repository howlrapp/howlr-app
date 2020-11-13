import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';

import { ApolloProvider } from '@apollo/client';
import apolloClient from '../graphql/apolloClient';

import * as SplashScreen from 'expo-splash-screen';
import Constants from 'expo-constants';

import { usePreventScreenCapture } from 'expo-screen-capture';

import { AppearanceProvider } from 'react-native-appearance';

import * as Device from 'expo-device';

import { DeviceTypeContext } from '../hooks/useDeviceType';
import useEnforceScreenOrientation from '../hooks/useEnforceScreenOrientation';

import AppWithAppearance from './AppWithAppearance';

const AppBootstrap = () => {
  if (!Constants.manifest.extra.allowScreenshots) {
    usePreventScreenCapture();
  }

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const [ deviceType, setDeviceType ] = useState(null);
  useEffect(() => {
    Device.getDeviceTypeAsync().then(setDeviceType);
  }, []);

  useEnforceScreenOrientation();

  return (
    <AppearanceProvider>
      <DeviceTypeContext.Provider value={deviceType}>
        <ApolloProvider client={apolloClient}>
          <AppWithAppearance />
        </ApolloProvider>
      </DeviceTypeContext.Provider>
    </AppearanceProvider>
  )
}

export default AppBootstrap;
