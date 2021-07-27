import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ApolloProvider } from '@apollo/client';
import apolloClient from '../graphql/apolloClient';

import { AppearanceProvider } from 'react-native-appearance';

import * as Device from 'expo-device';

import { DeviceTypeContext } from '../hooks/useDeviceType';
import useEnforceScreenOrientation from '../hooks/useEnforceScreenOrientation';

import AppWithAppearance from './AppWithAppearance';

const AppBootstrap = () => {
  const [ deviceType, setDeviceType ] = useState(null);
  useEffect(() => {
    Device.getDeviceTypeAsync().then(setDeviceType);
  }, []);

  useEnforceScreenOrientation();

  return (
    <AppearanceProvider>
      <DeviceTypeContext.Provider value={deviceType}>
        <ApolloProvider client={apolloClient}>
          <SafeAreaProvider>
            <AppWithAppearance />
          </SafeAreaProvider>
        </ApolloProvider>
      </DeviceTypeContext.Provider>
    </AppearanceProvider>
  )
}

export default AppBootstrap;
