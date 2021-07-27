import React from 'react';
import { Provider as LegacyReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { store, persistor } from '../legacy/reduxStore';

import AppBootstrap from './AppBootstrap';

const AppReduxLegacyStore = () => {
  return (
    <>
      {Platform.OS === 'ios' ? <StatusBar style={'light'} translucent={false} /> : null}

      <LegacyReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <AppBootstrap />
        </PersistGate>
      </LegacyReduxProvider>
    </>
  );
};

export default AppReduxLegacyStore;
