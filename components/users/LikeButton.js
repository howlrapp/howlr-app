import React, { useCallback } from 'react';
import { Text, Button, Icon } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';

import useSentLikesUserIds from '../../hooks/useSentLikesUserIds';
import useReceivedLikesUserIds from '../../hooks/useReceivedLikesUserIds';
import useAddLike from '../../hooks/useAddLike';
import useRemoveLike from '../../hooks/useRemoveLike';
import useViewer from '../../hooks/useViewer';

import { GET_VIEWER } from '../../hooks/useGetViewer';

import showTransactionLoader from '../../utils/showTransactionLoader';

const renderLikeIcon = (props) => (
  <Icon name="heart" {...props} />
);

const LikeButton = ({
  user,
  style,
  ...props
}) => {
  const viewer = useViewer();

  const sentLikesUserIds = useSentLikesUserIds();
  const receivedLikesUserIds = useReceivedLikesUserIds();

  const liked = sentLikesUserIds[user.id];

  const [ removeLike, { loading: removeLikeLoading }] = useRemoveLike();
  const handleRemoveLike = useCallback(() => {
    showTransactionLoader(() => (
      removeLike({
        variables: {
          input: {
            likedId: user.id
          }
        },
        awaitRefetchQueries: true,
        refetchQueries: [
          { query: GET_VIEWER },
        ],
        update: (cache, { data: { removeLike } }) => {
          cache.modify({
            id: cache.identify(viewer),
            fields: {
              sentLikes(sentLikes) {
                return (
                  sentLikes.filter((like) => like.id !== removeLike.id)
                )
              }
            }
          })
        }
      })
    ));
  }, [removeLike, user.id, viewer]);

  const [ addLike, { loading: addLikeLoading }] = useAddLike();
  const handleAddLike = useCallback(() => {
    showTransactionLoader(() => (
      addLike({
        variables: {
          input: {
            likedId: user.id
          }
        },
        awaitRefetchQueries: true,
        refetchQueries: [
          { query: GET_VIEWER },
        ],
        update: (cache, { data: { addLike } }) => {
          cache.modify({
            id: cache.identify(viewer),
            fields: {
              sentLikes(sentLikes) {
                return (
                  [  addLike.like, ...sentLikes ]
                )
              }
            }
          })
        }
      })
    ))
  }, [addLike, user.id, viewer]);

  return (
    <View
      style={style}
    >
      <Button
        accessoryLeft={renderLikeIcon}
        status={liked ? 'danger' : 'info'}
        onPress={liked ? handleRemoveLike : handleAddLike}
        disabled={removeLikeLoading || addLikeLoading || user.id === viewer.id}
        {...props}
      >
        {liked ? "UNLIKE" : "LIKE"}
      </Button>
      <Text
        style={styles.text}
        category="label"
        numberOfLines={1}
        ellipsizeMode='middle'
        appearance="hint"
      >
        {
          receivedLikesUserIds[user.id] ? `LIKES YOU` : ""
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
