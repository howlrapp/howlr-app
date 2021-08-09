import React, { useCallback } from 'react';
import { ListItem, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import useDistance from '../../hooks/useDistance';

import UserAvatar from '../UserAvatar';

const LikeItem = ({
  like,
  liked,
  comment,
}) => {
  const navigation = useNavigation();

  const renderAccessoryRight = useCallback(({ style }) => {
    return (
      comment && <Text category="label" appearance="hint">{comment}</Text>
    );
  }, [liked, comment]);

  const renderAccessoryLeft = useCallback(({ style: { height } }) => (
    <UserAvatar user={like.user} size={height} />
  ), [like.user]);

  const distanceSentence = useDistance(like.user.distance, (distance, unit) => (
    `More than ${distance} ${unit}`
  ));

  const handleOpenProfile = useCallback(() => {
    navigation.navigate('User', { id: like.user.id });
  }, [ like.user.id, navigation ]);

  return (
    <ListItem
      key={like.id}
      onPress={handleOpenProfile}
      title={like.user.name}
      description={distanceSentence}
      accessoryLeft={renderAccessoryLeft}
      accessoryRight={renderAccessoryRight}
    />
  );
}

export default React.memo(LikeItem);
