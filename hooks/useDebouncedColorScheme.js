import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native-appearance';

const useDebouncedColorScheme = () => {
  const colorScheme = useColorScheme();
  const [ effectiveColorScheme, setEffectiveColorScheme ] = useState(colorScheme);

  // I noticed that useColorScheme flickers between dark and light mode
  // on IOS (but not on the emulator strangely), so we must "debounce" it
  useEffect(() => {
    const colorSchemeTimeout = setTimeout(() => {
      setEffectiveColorScheme(colorScheme);
    }, 500);

    return () => clearTimeout(colorSchemeTimeout);
  }, [colorScheme]);

  return (effectiveColorScheme);
}

export default useDebouncedColorScheme;
