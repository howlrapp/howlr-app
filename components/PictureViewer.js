import React, { useRef, useEffect, useCallback } from 'react';
import { Portal } from 'react-native-portalize';
import { Image, View, StyleSheet } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { Platform, TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

import {
  useResponsiveWidth,
  useResponsiveHeight
} from "react-native-responsive-dimensions";
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import useDeviceType from '../hooks/useDeviceType';

import ActivityIndicator from './ActivityIndicator';
import ResponsiveModalize from './ResponsiveModalize';
import ResponsiveViewPager from './ResponsiveViewPager';

const PictureViewer = ({
  pictures,
  index,
  onClose,
}) => {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();

  const deviceType = useDeviceType();

  const modalWidth = (
    deviceType === Device.DeviceType.PHONE ? useResponsiveWidth(100) : Constants.manifest.extra.tabletModalWidth
  );
  const modalHeight = useResponsiveHeight(100) - top - 20;

  const modalizeRef = useRef(null);

  useEffect(() => {
    if (index !== null) {
      modalizeRef.current?.open();
    }
  }, [index]);

  const manualClose = Platform.OS !== 'ios';

  const handleClose = useCallback(() => {
    modalizeRef.current?.close();
  }, [modalizeRef]);

  return (
    <Portal>
      <ResponsiveModalize
        ref={modalizeRef}
        onClose={onClose}
        modalTopOffset={100}
        modalStyle={styles.modal}
        modalHeight={modalHeight}
        panGestureEnabled={!manualClose}
        scrollViewProps={{
          scrollEnabled: false,
          nestedScrollEnabled: false
        }}
        withHandle={!manualClose}
      >
        <View
          style={[ styles.container, { height: modalHeight } ]}
        >
          <ResponsiveViewPager
            style={{
              width: modalWidth,
              height: modalHeight,
              position: 'absolute'
            }}
            initialPage={index}
            orientation={'horizontal'}
            showPageIndicator
          >
            {
              pictures.map((picture, index) => (
                <View
                  key={picture.id}
                >
                  <View
                    style={[
                      styles.loaderContainer,
                      {
                        backgroundColor: theme['background-basic-color-2'],
                        borderTopLeftRadius: index === 0 ? 11 : 0,
                        borderTopRightRadius: index === pictures.length - 1 ? 11 : 0,
                        width: modalWidth,
                        height: modalHeight,
                      }
                    ]}
                  >
                    <ActivityIndicator />
                  </View>
                  <Image
                    source={{ uri: picture.pictureUrl }}
                    style={{
                      borderTopLeftRadius: index === 0 ? 11 : 0,
                      borderTopRightRadius: index === pictures.length - 1 ? 11 : 0,
                      width: modalWidth,
                      height: modalHeight,
                    }}
                  />
                </View>
              ))
            }
          </ResponsiveViewPager>
          {
            manualClose && (
              <TouchableOpacity
                onPress={handleClose}
                style={styles.manualCloseButton}
              >
                <Icon name="close-outline" width={24} height={24} fill="white" />
              </TouchableOpacity>
            )
          }
        </View>
      </ResponsiveModalize>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'transparent'
  },
  loaderContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  container: {
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    overflow: 'hidden'
  },
  manualCloseButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
})

export default React.memo(PictureViewer);
