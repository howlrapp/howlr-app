import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

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

import AppLoader from './AppLoader';
import useDebouncedColorScheme from '../hooks/useDebouncedColorScheme';

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

  const { top } = useSafeAreaInsets();

  // See https://github.com/akveo/react-native-ui-kitten/issues/1465
  const mappingFixForPopover = {
    ...mapping,
    components: Platform.OS === 'ios' ? {} : {
      Popover: {
        meta: { parameters: { marginTop: { type: 'number' } } },
        appearances: {
          default: {
            mapping: { marginTop: top },
          },
        },
      },
    },
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={colorScheme === 'dark' ? eva.dark : eva.light}
        customMapping={mappingFixForPopover}
      >
        <AppLoader />
      </ApplicationProvider>
    </>
  );
}

export default AppWithApperance;
