import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const LikesCountItem = ({ count, label }) => {
  return (
    <View
      style={styles.headerLikesCountItem}
    >
      <Text category="s1">{count}</Text>
      <Text category="s2" appearance="hint">{label}</Text>
    </View>
  );
}

const LikesTop = ({ user }) => {
  return (
    <View
      style={styles.headerLikesCount}
    >
      <LikesCountItem
        count={user.likedCount}
        label="LIKED"
      />
      <LikesCountItem
        count={user.likersCount}
        label="LIKERS"
      />
    </View>
  );
}


const styles = StyleSheet.create({
  headerLikesCount: {
    paddingVertical: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  headerLikesCountItem: {
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export default React.memo(LikesTop);
