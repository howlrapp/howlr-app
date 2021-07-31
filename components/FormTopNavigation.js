import React, { useCallback } from 'react';
import { Text, TopNavigation } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ActivityIndicator from './ActivityIndicator';

const FormTopNavigation = ({
  cancelLabel = "Cancel",
  saveLabel = "Save",
  onCancel,
  onSave,
  disabled,
  invalid,
  loading,
  ...props
}) => {
  const accessoryLeft = useCallback(() => {
    if (loading) {
      return (null);
    }

    return (
      <TouchableOpacity
        style={[ styles.touchableOpacity, styles.touchableOpacityCancel ]}
        onPress={onCancel}
      >
        <Text
          status="info"
          category="p1"
          style={[ styles.buttonText, styles.actionLeft ]}
        >
          {cancelLabel}
        </Text>
      </TouchableOpacity>
    );
  }, [onCancel, cancelLabel, loading])

  const accessoryRight = useCallback(() => {
    if (loading) {
      return (
        <View
          style={styles.activityIndicatorContainer}
        >
          <ActivityIndicator size="tiny" status="info" />
        </View>
      )
    }

    return (
      <TouchableOpacity
        onPress={onSave}
        style={[ styles.touchableOpacity, styles.touchableOpacityDone ]}
        disabled={disabled || invalid}
      >
        <Text
          status="info"
          category="s1"
          style={[ styles.buttonText, styles.actionRight, { opacity: invalid ? 0.3 : 1 } ]}
        >
          {saveLabel}
        </Text>
      </TouchableOpacity>
    );
  }, [onSave, saveLabel, disabled, invalid, loading])

  return (
    <TopNavigation
      style={styles.root}
      accessoryLeft={accessoryLeft}
      accessoryRight={accessoryRight}
      alignment="center"
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  actionLeft: {
    paddingLeft: 5,
  },
  actionRight: {
    paddingRight: 5,
  },
  activityIndicatorContainer: {
    marginRight: 10,
  },
  touchableOpacity: {
    paddingVertical: 9,
  },
  touchableOpacityCancel: {
    paddingRight: 20,
  },
  touchableOpacityDone: {
    paddingLeft: 20,
  }
});

export default FormTopNavigation;
