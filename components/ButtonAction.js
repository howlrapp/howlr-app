import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@ui-kitten/components';

const ButtonAction = ({
  onPress,
  iconName,
  ...props
}) => {
  return (
    <>
      <View
        style={styles.spacer}
      />
      <TouchableOpacity
        onPress={onPress}
        style={styles.touchable}
      >
        <Icon height={20} width={20} name={iconName} {...props} />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  spacer: {
    height: 1,
    width: 24,
  },
  touchable: {
    position: 'absolute',
    right: 0,
  }
})

export default React.memo(ButtonAction);
