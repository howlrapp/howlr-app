import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import {
  useResponsiveScreenWidth,
} from "react-native-responsive-dimensions";

import useDeviceType from '../hooks/useDeviceType';
import { useTheme } from '@ui-kitten/components';

const ResponsiveLayout = ({
  children,
  grow = true,
  background = 'background-basic-color-2',
}) => {
  const theme = useTheme();

  const deviceType = useDeviceType();

  const screenWidth = useResponsiveScreenWidth(100);

  const rootStyle = useMemo(() => [
    styles.root,
    {
      flexGrow: grow ? 1 : 0,
      backgroundColor: theme[background],
    }
  ], [theme])

  const childrenStyle = useMemo(() => ({
    width: deviceType === Device.DeviceType.PHONE ? screenWidth : Math.min(Constants.manifest.extra.tabletBodyWidth, screenWidth),
  }), [deviceType, screenWidth])

  return (
    <View
      style={rootStyle}
    >
      <View
        style={childrenStyle}
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

export default React.memo(ResponsiveLayout);
