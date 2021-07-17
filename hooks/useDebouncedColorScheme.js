/**
 * Taken from https://stackoverflow.com/questions/64729084/expo-app-is-blink-at-ios-when-it-is-appeared-to-front-but-android-is-no-problem/64729
 */

import { Appearance } from 'react-native';
import { useEffect, useRef, useState } from 'react';

export default function useDebouncedColorScheme(delay = 500) {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  let timeout = useRef(null).current;

  useEffect(() => {
    Appearance.addChangeListener(onColorSchemeChange);

    return () => {
      resetCurrentTimeout();
      Appearance.removeChangeListener(onColorSchemeChange);
    };
  }, []);

  function onColorSchemeChange(preferences) {
    resetCurrentTimeout();

    timeout = setTimeout(() => {
      setColorScheme(preferences.colorScheme);
    }, delay);
  }

  function resetCurrentTimeout() {
    if (timeout) {
      clearTimeout(timeout);
    }
  }

  return colorScheme;
}
