import React from 'react';
import {
  Divider,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const DistanceSeparatorStroke = React.memo(({
  separatorColor,
  style,
  visible
}) => {
  const theme = useTheme();

  return (
    <Divider style={[ style, { backgroundColor: visible ? theme[separatorColor] : 'transparent' } ]} />
  );
});

const DistanceSeparator = ({
  children,
  height,
  separatorColor = 'color-basic-transparent-300',
  withStroke = false,
}) => {
  return (
    <View
      style={[ styles.root, { height }]}
    >
      <DistanceSeparatorStroke
        visible={withStroke}
        style={styles.separatorLeft}
        separatorColor={separatorColor}
      />
      <Text
        style={styles.text}
      >
        {children}
      </Text>
      <DistanceSeparatorStroke
        visible={withStroke}
        style={styles.separatorRight}
        separatorColor={separatorColor}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    maxWidth: '80%',
  },
  separatorLeft: {
    flexGrow: 1,
    marginLeft: 20,
    marginRight: 10,
  },
  separatorRight: {
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 20,
  }
})

export default React.memo(DistanceSeparator);
