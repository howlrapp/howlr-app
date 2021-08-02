import React from 'react';
import {
  Text,
  Divider,
  useTheme
} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const DistanceSeparator = ({
  children,
  height,
  withLine
}) => {
  const theme = useTheme();
  
  return (
    <View
      style={[ styles.root, { height: height - 25 }]}
    >
      <Divider
        style={[ styles.divider, { backgroundColor: withLine ? theme['color-basic-transparent-400'] : 'transparent' } ]}
      />
      <Text
        style={styles.text}
      >
        {children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    width: 50,
    marginBottom: 10
  }
})

export default React.memo(DistanceSeparator);
