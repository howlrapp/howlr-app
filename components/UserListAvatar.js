import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { uniqBy } from 'lodash';
import { Text, useTheme } from '@ui-kitten/components';

import UserAvatar from './UserAvatar';

const UserListAvatarMore = ({
  number,
  size,
  style
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        style,
        styles.more,
        {
          minWidth: size,
          minHeight: size,
          backgroundColor: theme['background-basic-color-4'],
          borderRadius: size
        }
      ]}
    >
      <Text
        category="c2"
        style={styles.number}
      >
        {number > 99 ? "99+" : `+${number}`}
      </Text>
    </View>
  )
}

const UserListAvatar = ({
  users,
  max = 4,
  size = 24,
  last,
  style,
}) => {
  const displayedAvatars = useMemo(() => {
    if (last) {
      return uniqBy([ ...users.slice(0, max), last ], ({ id }) => id);
    }

    return users.slice(0, max);
  }, [users, max]);

  if (displayedAvatars.length === 0) {
    return (null);
  }

  return (
    <View
      style={[ styles.root, style ]}
    >
      {
        displayedAvatars.map((user) => (
          <UserAvatar
            key={user.id}
            user={user}
            size={size}
            containerStyle={styles.avatar}
         />
        ))
      }
      {
        users.length > displayedAvatars.length ? (
          <UserListAvatarMore
            size={size}
            style={styles.avatar}
            number={users.length - displayedAvatars.length}
          />
        ) : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    paddingLeft: 5,
  },
  avatar: {
    marginLeft: -5,
  },
  number: {
    fontSize: 10,
  },
  more: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default UserListAvatar;
