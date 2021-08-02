import React from 'react';
import ThemedContentLoader from '../ThemedContentLoader';
import ResponsiveLayout from '../ResponsiveLayout';
import { View, StyleSheet } from 'react-native';

const EventLoader = () => {
  return (
    <ResponsiveLayout
      grow={false}
      background="background-basic-color-1"
    >
      <View
        style={styles.root}
      >
        <ThemedContentLoader
          active
          pRows={4}
          reverse
          tWidth={'100%'}
          tHeight={40}
          pWidth={["100%", 200, "25%", 45]}
        />
      </View>
    </ResponsiveLayout>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
  }
})

export default React.memo(EventLoader);
