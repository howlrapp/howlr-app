import React from 'react';
import { View, StyleSheet } from 'react-native';

import CountItem from '../CountItem';

const LikesTop = ({ user }) => {
  return (
    <View
      style={styles.headerLikesCount}
    >
      <CountItem
        count={user.likedCount}
        label="LIKED"
        disabled
      />
      <CountItem
        count={user.likersCount}
        label="LIKERS"
        disabled
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
});

export default React.memo(LikesTop);
