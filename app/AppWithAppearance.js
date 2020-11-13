import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_800ExtraBold,
} from '@expo-google-fonts/open-sans';

import { default as mapping } from '../mapping.json';

import useDebouncedColorScheme from '../hooks/useDebouncedColorScheme';

import AppLoader from './AppLoader';

const AppWithApperance = () => {
  const colorScheme = useDebouncedColorScheme();

  const [ fontsLoaded ] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={colorScheme === 'dark' ? eva.dark : eva.light}
        customMapping={mapping}
      >
        <AppLoader />
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}

export default AppWithApperance;
