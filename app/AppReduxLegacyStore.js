import React from 'react';
import { Provider as LegacyReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { StatusBar } from 'expo-status-bar';

import { store, persistor } from '../legacy/reduxStore';

import AppBootstrap from './AppBootstrap';

const AppReduxLegacyStore = () => {
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
