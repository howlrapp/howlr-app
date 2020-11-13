import React, { useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@ui-kitten/components';

const ProgressBar = ({
  width = 220,
  steps = [],
}) => {
  const theme = useTheme();

  const [ barWidth ] = useState(new Animated.Value(0));

  const currentStepsCount = useMemo(() => (
    steps.filter((step) => step)
  ), [steps]);

  useEffect(() => {
    Animated.timing(barWidth, {
      toValue: (width / steps.length) * currentStepsCount.length - 2,
      duration: 30,
      useNativeDriver: false,
    }).start();
  }, [currentStepsCount, steps]);

  return (
    <View
      style={[
        styles.root,
        {
          width,
          borderColor: theme['color-basic-transparent-400']
        }
      ]}
    >
      <Animated.View
        style={[
          styles.bar,
          {
            width: barWidth,
            backgroundColor: theme['color-basic-transparent-400']
          }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    height: 8,
    borderRadius: 5,
  },
  bar: {
    height: 6,
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 5
  }
})

export default ProgressBar;
