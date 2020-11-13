import React, { useCallback } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import isDeepEqualBy from '../../utils/isDeepEqualBy';

import UserAvatar from '../UserAvatar';

const INDICATORS = ['contributor', 'like', 'online']

const UserItem = ({
  user,
  size,
  ...props
}) => {
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    navigation.navigate('User', { id: user.id })
  });

  return (
    <TouchableOpacity
      onPress={handlePress}
      {...props}
    >
      <UserAvatar
        user={user}
        size={size}
        indicators={INDICATORS}
        indicatorsBackground='background-basic-color-2'
      />
      <Text
        category="c2"
        numberOfLines={1}
        style={[ styles.text, { width: size }]}
      >
        {user.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    paddingTop: 8,
  }
});

export default React.memo(UserItem, isDeepEqualBy(['style']));
