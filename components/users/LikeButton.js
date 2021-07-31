import React, { useCallback } from 'react';
import { Text, Button, Icon } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';

import useSentLikesUserIds from '../../hooks/useSentLikesUserIds';
import useReceivedLikesUserIds from '../../hooks/useReceivedLikesUserIds';
import useAddLike from '../../hooks/useAddLike';
import useRemoveLike from '../../hooks/useRemoveLike';
import useViewer from '../../hooks/useViewer';

import { GET_VIEWER } from '../../hooks/useGetViewer';
import { GET_LIKES } from '../../hooks/useGetLikes';

const renderLikeIcon = (props) => (
  <Icon name="heart" {...props} />
);

const LikeButton = ({
  user,
  style,
  ...props
}) => {
  const { id: viewerId } = useViewer();

  const sentLikesUserIds = useSentLikesUserIds();
  const receivedLikesUserIds = useReceivedLikesUserIds();

  const liked = sentLikesUserIds[user.id];

  const [ removeLike, { loading: removeLikeLoading }] = useRemoveLike();
  const handleRemoveLike = useCallback(() => {
    removeLike({
      variables: {
        input: {
          likedId: user.id
        }
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: GET_LIKES },
        { query: GET_VIEWER },
      ]
    })
  }, [removeLike, user.id]);

  const [ addLike, { loading: addLikeLoading }] = useAddLike();
  const handleAddLike = useCallback(() => {
    addLike({
      variables: {
        input: {
          likedId: user.id
        }
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: GET_LIKES },
        { query: GET_VIEWER },
      ],
    })
  }, [addLike, user.id]);

  return (
    <View
      style={style}
    >
      <Button
        accessoryLeft={renderLikeIcon}
        status={liked ? 'danger' : 'primary'}
        onPress={liked ? handleRemoveLike : handleAddLike}
        disabled={removeLikeLoading || addLikeLoading || user.id === viewerId}
        appearance={liked ? 'outline' : 'filled'}
        {...props}
      >
        {liked ? "UNLIKE" : "LIKE"}
      </Button>
      <Text
        style={styles.text}
        category="c1"
        numberOfLines={1}
        ellipsizeMode='middle'
        appearance="hint"
      >
        {
          receivedLikesUserIds[user.id] ? `Liked you` : ""
        }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 6,
    textAlign: 'center'
  }
})

export default React.memo(LikeButton);
