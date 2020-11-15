import React, { useCallback } from 'react';
import { ListItem, Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Alert } from 'react-native';

import useAddLike from '../../hooks/useAddLike';
import useRemoveLike from '../../hooks/useRemoveLike';
import useDistance from '../../hooks/useDistance';
import { GET_LIKES } from '../../hooks/useGetLikes';
import { GET_VIEWER } from '../../hooks/useGetViewer';

import UserAvatar from '../UserAvatar';

const LikeItem = ({
  like,
  liked,
  comment,
  addLikeLabel = "LIKE",
  removeLikeLabel = "UNLIKE"
}) => {
  const navigation = useNavigation();

  const [ removeLike, { loading: removeLikeLoading }] = useRemoveLike();
  const handleRemoveLike = useCallback(() => {
    Alert.alert(
      `Unlike`,
      `Are you sure you want to remove your Like to ${like.user.name}`,
      [
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => {
            removeLike({
              variables: {
                input: {
                  likedId: like.user.id
                }
              },
              awaitRefetchQueries: true,
              refetchQueries: [
                { query: GET_LIKES },
                { query: GET_VIEWER },
              ],
            })
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        },
      ],
      { cancelable: true }
    );
  }, [like.user]);

  const [ addLike, { loading: addLikeLoading }] = useAddLike();
  const handleAddLike = useCallback(() => {
    addLike({
      variables: {
        input: {
          likedId: like.user.id
        }
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: GET_LIKES },
        { query: GET_VIEWER },
      ],
    })
  }, [like.user]);

  const renderAction = useCallback(() => {
    let action;
    if (liked) {
      action = (
        <Button
          size="tiny"
          appearance="outline"
          status="basic"
          onPress={handleRemoveLike}
          disabled={removeLikeLoading}
          style={styles.button}
        >
          {removeLikeLabel}
        </Button>
      );
    } else {
      action = (
        <Button
          size="tiny"
          appearance="outline"
          onPress={handleAddLike}
          disabled={addLikeLoading}
          style={styles.button}
        >
          {addLikeLabel}
        </Button>
      );
    }

    return (
      <View
        style={styles.actionContainer}
      >
        <View
          style={styles.actionContainerComment}
        >
          {comment && <Text appearance="hint" category="c2">{comment}</Text>}
        </View>
        {action}
      </View>
    );
  }, [liked, comment, addLikeLoading, removeLikeLoading, handleAddLike]);

  const renderAccessoryLeft = useCallback(({ style: { height } }) => (
    <UserAvatar user={like.user} size={height} />
  ), [like.user]);

  const distanceSentence = useDistance(like.user.distance, (distance, unit) => (
    `About ${distance} ${unit} away`
  ));

  const handleGoToUser = useCallback(() => (
    navigation.navigate('User', { id: like.user.id })
  ), [like.user.id]);

  return (
    <ListItem
      key={like.id}
      onPress={handleGoToUser}
      title={like.user.name}
      description={distanceSentence}
      accessoryLeft={renderAccessoryLeft}
      accessoryRight={renderAction}
    />
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionContainerComment: {
    paddingRight: 10
  },
  button: {
    width: 70
  }
})

export default React.memo(LikeItem);
