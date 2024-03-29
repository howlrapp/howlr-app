/**
 * Taken from https://stackoverflow.com/questions/64729084/expo-app-is-blink-at-ios-when-it-is-appeared-to-front-but-android-is-no-problem/64729
 */

import { Appearance, Platform } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useApolloClient } from '@apollo/client';

import useGetColorScheme, { GET_COLOR_SCHEME } from './useGetColorScheme';

export default function useDebouncedColorScheme(delay = 500) {
  const { data } = useGetColorScheme();
  const preferredColorScheme = data?.colorScheme || "system";

  const [colorScheme, setColorScheme] = useState(
    preferredColorScheme === "system" ? Appearance.getColorScheme() : preferredColorScheme
  );

  // this goes against the rules of hooks, but unless an Android
  // device magically turns into an iPhone it should be fine
  if (Platform.OS === 'ios') {
    useEffect(() => {
      onColorSchemeChange();
    }, [preferredColorScheme])

    let timeout = useRef(null).current;

    useEffect(() => {
      Appearance.addChangeListener(onColorSchemeChange);

      return () => {
        resetCurrentTimeout();
        Appearance.removeChangeListener(onColorSchemeChange);
      };
    }, []);

    const client = useApolloClient();

    function onColorSchemeChange() {
      resetCurrentTimeout();
      timeout = setTimeout(() => {
        const data = client.readQuery({
          query: GET_COLOR_SCHEME
        })

      const preferredColorScheme = data?.colorScheme || "system";
        setColorScheme(
          preferredColorScheme === "system" ? Appearance.getColorScheme() : preferredColorScheme
        );
      }, delay);
    }

    function resetCurrentTimeout() {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }

  if (Platform.OS === 'android') {
    useEffect(() => {
      setColorScheme(
        preferredColorScheme === "system" ? Appearance.getColorScheme() : preferredColorScheme
      );
    }, [preferredColorScheme])
  }

  return colorScheme;
}
