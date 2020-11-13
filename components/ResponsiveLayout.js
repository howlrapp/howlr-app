import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

import useDeviceType from '../hooks/useDeviceType';

const ResponsiveLayout = ({
  children,
  grow = true,
  background = 'background-basic-color-2',
}) => {
  const theme = useTheme();

  const deviceType = useDeviceType();

  return (
    <View
      style={[
        styles.root,
        {
          flexGrow: grow ? 1 : 0,
          backgroundColor: theme[background],
        }
      ]}
    >
      <View
        style={{
          width: deviceType === Device.DeviceType.PHONE ? '100%' : Constants.manifest.extra.tabletBodyWidth
        }}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    width: 600,
  }
})

export default ResponsiveLayout;
