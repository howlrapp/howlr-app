import React, { useCallback } from 'react';
import { Divider } from '@ui-kitten/components';
import { useLazyQuery } from '@apollo/client';

import useSentLikesUserIds from '../hooks/useSentLikesUserIds';
import useReceivedLikesUserIds from '../hooks/useReceivedLikesUserIds';
import { GET_LIKES } from '../hooks/useGetLikes';

import LikeItem from '../components/likes/LikeItem';
import ResponsiveList from '../components/ResponsiveList';
import LikeLimitDisclaimer from '../components/likes/LikeLimitDisclaimer';

const Likes = ({
  likes,
  showLikeBack,
  ...props
}) => {
  const sentLikesUserIds = useSentLikesUserIds();
  const receivedLikesUserIds = useReceivedLikesUserIds();

  const getItemLayout = useCallback((_data, index) => ({
    length: 55, offset: index * 55, index
  }), []);

  const keyExtractor = useCallback(({ id }) => id, []);

  const renderItem = useCallback(({ item }) => (
    <LikeItem
      like={item}
      liked={sentLikesUserIds[item.user.id]}
      comment={showLikeBack && receivedLikesUserIds[item.user.id] && sentLikesUserIds[item.user.id] ? "Likes you" : null}
    />
  ), [showLikeBack, sentLikesUserIds, receivedLikesUserIds]);

  const ListFooterComponent = () => (
    <LikeLimitDisclaimer />
  )

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
      ListFooterComponent={ListFooterComponent}
      renderItem={renderItem}
      onRefresh={handleRefresh}
      refreshing={loading}
      {...props}
    />
  );
}

export default React.memo(Likes);
