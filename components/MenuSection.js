import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@ui-kitten/components';

import useDeviceType from '../hooks/useDeviceType';
import * as Device from 'expo-device';

const MenuSection = (props) => {
  const deviceType = useDeviceType();
  const theme = useTheme();

  return (
    <View
      style={[
        deviceType === Device.DeviceType.PHONE ? styles.phone : styles.tablet,
        { borderColor: theme['border-basic-color-3'] },
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  phone: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  tablet: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
    overflow: 'hidden'
  }
});

export default React.memo(MenuSection);
