import React, { useCallback } from 'react';
import { Input, Icon } from '@ui-kitten/components';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import { isEmpty } from 'lodash';

import useDeviceType from '../hooks/useDeviceType';

const SearchBar = ({ value, onClear, ...props }) => {
  const renderSearchIcon = (props) => (
    <Icon {...props} name="search" />
  )

  const renderClearIcon = useCallback((props) => (
    <TouchableWithoutFeedback
      onPress={onClear}
    >
      <Icon {...props} name="close-outline" />
    </TouchableWithoutFeedback>
  ), [onClear]);

  const deviceType = useDeviceType();

  return (
    <Input
      style={
        [
          styles.input,
          { marginHorizontal: deviceType === Device.DeviceType.PHONE ? 8 : 0 }
        ]
      }
      accessoryRight={isEmpty(value) ? renderSearchIcon : renderClearIcon}
      value={value}
      autoCorrect={false}
      returnKeyType="search"
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 4,
  },
})

export default React.memo(SearchBar);