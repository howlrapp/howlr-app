import React, { useCallback, useEffect } from 'react';
import { ListItem, Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import useAddLike from '../../hooks/useAddLike';
import useRemoveLike from '../../hooks/useRemoveLike';
import useDistance from '../../hooks/useDistance';
import { GET_LIKES } from '../../hooks/useGetLikes';
import { GET_VIEWER } from '../../hooks/useGetViewer';
import useResponsiveActionSheet from '../../hooks/useResponsiveActionSheet';
import showTransactionLoader from '../../utils/showTransactionLoader';

import UserAvatar from '../UserAvatar';

const LikeItem = ({
  like,
  liked,
  comment,
  addLikeLabel = "LIKE BACK",
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
            showTransactionLoader(() => (
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
            ))
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
  const handleAddLike = useCallback(() => (
    showTransactionLoader(() => (
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
    ))
  ), [like.user]);

  const renderAccessoryRight = useCallback(({ style }) => {
    if (!liked) {
      return (
        <Button
          size="tiny"
          onPress={handleAddLike}
          disabled={addLikeLoading}
        >
          {addLikeLabel}
        </Button>
      )
    }

    return (
      comment && <Text category="label" appearance="hint">{comment}</Text>
    );
  }, [liked, comment, addLikeLoading, removeLikeLoading]);

  const renderAccessoryLeft = useCallback(({ style: { height } }) => (
    <UserAvatar user={like.user} size={height} />
  ), [like.user]);

  const distanceSentence = useDistance(like.user.distance, (distance, unit) => (
    `More than ${distance} ${unit}`
  ));

  const showActionSheetWithOptions = useResponsiveActionSheet();

  const handleOpenActions = useCallback(() => {
    showActionSheetWithOptions(
      {
        options: [liked ? 'Remove like' : 'Like back', 'Open profile', 'Cancel'],
        cancelButtonIndex: 2,
        destructiveButtonIndex: liked ? 0 : undefined,
        title: like.user.name,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          if (liked) {
            handleRemoveLike()
          } else {
            handleAddLike();
          }
        }
        if (buttonIndex === 1) {
          navigation.navigate('User', { id: like.user.id })
        }
      }
    )

  }, [
    liked,
    like.user,
    showActionSheetWithOptions,
    handleAddLike,
    handleRemoveLike
  ]);

  return (
    <ListItem
      key={like.id}
      onPress={handleOpenActions}
      title={like.user.name}
      description={distanceSentence}
      accessoryLeft={renderAccessoryLeft}
      accessoryRight={renderAccessoryRight}
      disabled={removeLikeLoading || addLikeLoading}
    />
  );
}

export default React.memo(LikeItem);
