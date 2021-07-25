import React, { useEffect } from 'react';
import { Provider as LegacyReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import { store, persistor } from '../legacy/reduxStore';

import AppBootstrap from './AppBootstrap';

const AppReduxLegacyStore = () => {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  return (
    <>
      <StatusBar style={'light'} />

      <LegacyReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <AppBootstrap />
        </PersistGate>
      </LegacyReduxProvider>
    </>
  );
};

export default AppReduxLegacyStore;
