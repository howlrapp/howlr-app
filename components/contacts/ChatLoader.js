import React from 'react';
import ThemedContentLoader from '../ThemedContentLoader';
import { View, StyleSheet } from 'react-native';
import {
  useResponsiveScreenWidth,
} from "react-native-responsive-dimensions";
import Constants from 'expo-constants';
import * as Device from 'expo-device';

import useDeviceType from '../../hooks/useDeviceType';

import ResponsiveLayout from '../ResponsiveLayout';

const ChatLoader = () => {
  const width = useResponsiveScreenWidth(100);

  const deviceType = useDeviceType();

  const effectiveWidth = deviceType === Device.DeviceType.PHONE ? width : Constants.manifest.extra.tabletBodyWidth;
  const bubbleWidth = effectiveWidth * 0.67;

  return (
    <View style={styles.root}>
      <ResponsiveLayout
        grow={false}
        background="background-basic-color-1"
      >
        <ThemedContentLoader
          active
          pRows={0}
          titleStyles={{
            height: 90,
            width: effectiveWidth / 2,
            marginLeft: effectiveWidth - bubbleWidth - 20
          }}
        />
        <ThemedContentLoader
          active
          reverse
          pRows={0}
          titleStyles={{
            height: 60,
            width: bubbleWidth
          }}
        />
        <ThemedContentLoader
          active
          reverse
          pRows={0}
          titleStyles={{
            height: 90,
            width: bubbleWidth
          }}
        />
        <ThemedContentLoader
          active
          pRows={0}
          titleStyles={{
            height: 120,
            width: bubbleWidth,
            marginLeft: effectiveWidth - bubbleWidth - 20
          }}
        />
      </ResponsiveLayout>
      <ThemedContentLoader
        active
        pRows={0}
        titleStyles={{
          marginLeft: 0,
          width: width - 20,
          marginBottom: 10,
          height: 40
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflow: 'hidden'
  }
})

export default React.memo(ChatLoader);
