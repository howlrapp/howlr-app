import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';

const CountItem = ({ count, label, ...props }) => {
  return (
    <TouchableOpacity
      style={styles.headerLikesCountItem}
      {...props}
    >
      <Text category="s1">{count}</Text>
      <Text category="s2" appearance="hint">{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerLikesCountItem: {
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export default React.memo(CountItem);
