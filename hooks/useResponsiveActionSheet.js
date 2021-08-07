import { useCallback } from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet'

import useGetColorScheme from './useGetColorScheme';

const useResponsiveActionSheet = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { data } = useGetColorScheme();
  const colorScheme = data?.colorScheme || "system";

  return (
    useCallback((params, callback) => (
      showActionSheetWithOptions({
        ...params,
        userInterfaceStyle: colorScheme === 'system' ? undefined : colorScheme
      }, callback)
    ), [colorScheme])
  );
}

export default useResponsiveActionSheet;
