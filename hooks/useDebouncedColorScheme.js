/**
 * Taken from https://stackoverflow.com/questions/64729084/expo-app-is-blink-at-ios-when-it-is-appeared-to-front-but-android-is-no-problem/64729
 */

import { Appearance } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useApolloClient } from '@apollo/client';

import useGetColorScheme, { GET_COLOR_SCHEME } from './useGetColorScheme';

export default function useDebouncedColorScheme(delay = 500) {
  const { data } = useGetColorScheme();
  const preferredColorScheme = data?.colorScheme || "system";

  const [colorScheme, setColorScheme] = useState(
    preferredColorScheme === "system" ? Appearance.getColorScheme() : preferredColorScheme
  );

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
  
  return colorScheme;
}
