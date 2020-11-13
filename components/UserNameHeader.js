import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

import UserAvatar from './UserAvatar';

const INDICATORS = ['like', 'online']

const UserNameHeader = ({
  user,
  textProps = {},
  style,
  ...props
}) => {
  if (!user) {
    return (null);
  }

  return (
    <TouchableOpacity
      style={[ styles.root, style ]}
      {...props}
    >
      <UserAvatar user={user} size={32} indicators={INDICATORS} />
      <Text
        {...textProps}
        style={[ textProps.style, styles.text ]}
      >
        {user.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    marginLeft: 10
  }
})

export default React.memo(UserNameHeader);
