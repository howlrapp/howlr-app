import React, { useCallback, useMemo } from 'react';
import { Divider } from '@ui-kitten/components';
import { useLazyQuery } from '@apollo/client';

import useSentLikesUserIds from '../hooks/useSentLikesUserIds';
import useReceivedLikesUserIds from '../hooks/useReceivedLikesUserIds';
import { GET_LIKES } from '../hooks/useGetLikes';

import LikeItem from '../components/likes/LikeItem';
import ResponsiveList from '../components/ResponsiveList';

const Likes = ({
  likes,
  direction,
  ...props
}) => {
  const sentLikesUserIds = useSentLikesUserIds();
  const receivedLikesUserIds = useReceivedLikesUserIds();

  const getItemLayout = useCallback((_data, index) => ({
    length: 55, offset: index * 55, index
  }), []);

  const keyExtractor = useCallback(({ id }) => id, []);

  const renderItem = useCallback(({ item }) => {
    let comment = null;

    if (direction === 'received' && sentLikesUserIds[item.user.id]) {
      comment = "LIKED";
    }
    else if (direction === 'sent' && receivedLikesUserIds[item.user.id]) {
      comment = "LIKES YOU";
    }

    return (
      <LikeItem
        like={item}
        liked={sentLikesUserIds[item.user.id]}
        comment={comment}
      />
    );
  }, [sentLikesUserIds, receivedLikesUserIds]);

  const [ refreshLikes, { loading } ] = useLazyQuery(GET_LIKES, { fetchPolicy: "network-only" });
  const handleRefresh = useCallback(() => {
    refreshLikes();
  }, [refreshLikes]);

  return (
    <ResponsiveList
      initialNumToRender={20}
      getItemLayout={getItemLayout}
      data={likes}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
      onRefresh={handleRefresh}
      refreshing={loading}
      {...props}
    />
  );
}

export default React.memo(Likes);
