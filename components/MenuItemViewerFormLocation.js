import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { truncate } from 'lodash';
import { StyleSheet, View, Alert, Platform } from 'react-native';
import { Button, MenuItem, Text, Icon } from '@ui-kitten/components';
import {
  useResponsiveScreenWidth,
} from "react-native-responsive-dimensions";

import * as Location from 'expo-location';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Linking from 'expo-linking';

import MapView, { Marker } from 'react-native-maps';

import useApp from '../hooks/useApp';
import useViewer from '../hooks/useViewer';

import FormModal from './FormModal';

const renderPinIcon = (props) => (
  <Icon name="pin-outline" {...props} />
);

const MenuItemViewerFormLocation = ({
  initialValue,
  onSave,
  localities,
  loading,
  title,
  onOpen,
  onClose,
  initialOpen,
  ...props
}) => {
  const { name, locationChangeIntervalMinutes } = useApp();
  const { canChangeLocation } = useViewer();

  const handleWarnLocationChangeUnavailable = useCallback(() => {
    Alert.alert(
      `Unavailable`,
      `You can only change your location up to once every ${locationChangeIntervalMinutes} minutes`,
    );
  }, [locationChangeIntervalMinutes]);

  const viewportWidth = useResponsiveScreenWidth(100);

  const [ modalOpen, setModalOpen ] = useState(false);
  useEffect(() => {
    if (initialOpen) {
      handleOpenModal();
    }
  }, [])

  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
    if (onOpen) {
      onOpen();
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    if (onClose) {
      onClose();
    }
  }, []);

  const [ value, setValue ] = useState(initialValue);

  const hint = useMemo(() => localities.join(', '), [localities]);

  const handleCancel = useCallback(() => {
    setValue(initialValue);
    handleCloseModal();
  });

  const handleSave = useCallback(async () => {
    if (onSave) {
      await onSave(value)
    }

    handleCloseModal();
  }, [value]);

  const handleChangeMarker = useCallback(({ nativeEvent }) => {
    setValue(nativeEvent.coordinate);
  });

  const handleSwitchToCurrentLocation = () => {
    Location.requestPermissionsAsync().then(async ({ status }) => {
      if (status !== 'granted') {
        Alert.alert(
          "Permission denied",
          `You can allow access to your current location by changing ${name}'s permissions in your phone's Setting.`,
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'Change settings',
              onPress: () => {
                if (Platform.OS === 'android') {
                  IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS)
                }
                if (Platform.OS === 'ios') {
                  Linking.openURL("app-settings:")
                }
              }
            },
          ],
        )
        return ;
      }
      const location = await Location.getLastKnownPositionAsync({});
      if (!location) {
        Alert.alert(
          "Error",
          `We couldn't access your location, maybe something is wrong with current phone's settings?`,
        )
        return ;
      }

      // slightly move the location to a random position
      const randomCoords = {
        latitude: location.coords.latitude + Math.random() % 0.02 - 0.01,
        longitude: location.coords.longitude + Math.random() % 0.02 - 0.01,
      }

      setValue(randomCoords);
    });
  }

  const region = useMemo(() => ({
    latitude: value.latitude,
    longitude: value.longitude,
    latitudeDelta: 2,
    longitudeDelta: 2,
  }), [value])

  return (
    <>
      <MenuItem
        onPress={canChangeLocation ? handleOpenModal : handleWarnLocationChangeUnavailable}
        title={title}
        disabled={loading}
        accessoryRight={() => (
          <Text
            appearance="hint"
            category="c1"
            numberOfLines={1}
            ellipsizeMode='head'
          >
            {!loading && truncate(hint, 30)}
          </Text>
        )}
      />
      {
        canChangeLocation && (
          <FormModal
            title={title}
            description={`Please note that, for security reasons, you can only change your location up to once every ${locationChangeIntervalMinutes} minutes.`}
            open={modalOpen}
            onCancel={handleCancel}
            onClose={handleSave}
            adjustToContentHeight
            {...props}
          >
              <View
                style={styles.map}
              >
                <MapView
                  region={region}
                  style={[ styles.mapView, {  width: viewportWidth - 20 }]}
                  onPress={handleChangeMarker}
                  loadingEnabled
                  toolbarEnabled={false}
                  userLocationPriority='low'
                >
                  <Marker coordinate={value} title="My location" />
                </MapView>
                <Button
                  appearance="outline"
                  style={styles.swithToLocationButton}
                  onPress={handleSwitchToCurrentLocation}
                  accessoryLeft={renderPinIcon}
                  disabled={loading}
                >
                  Move to my current location
                </Button>
              </View>
          </FormModal>
        )
      }
    </>
  )
}

const styles = StyleSheet.create({
  swithToLocationButton: {
    marginVertical: 10,
  },
  map: {
    width: '100%',
  },
  mapView: {
    height: 400,
  },
})


export default React.memo(MenuItemViewerFormLocation);
