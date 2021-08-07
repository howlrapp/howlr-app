import React, { useCallback, useMemo } from 'react';

import useSentLikes from '../hooks/useSentLikes';
import useApp from '../hooks/useApp';

import Likes from './Likes';
import EmptyListSearch from '../components/EmptyListSearch';
import LikeLimitDisclaimer from '../components/likes/LikeLimitDisclaimer';

const SentLikes = (props) => {
  const { maximumLikesCount } = useApp();

  const sentLikes = useSentLikes();

  const limitedSentLikes = useMemo(() => (
    sentLikes.slice(0, maximumLikesCount)
  ), [sentLikes, maximumLikesCount]);

  const ListEmptyComponent = useCallback(() => (
    <EmptyListSearch
      description="Send a Like to users around you that match your interest."
    />
  ), []);

  const ListFooterComponent = useCallback(() => (
    <LikeLimitDisclaimer active={maximumLikesCount <= sentLikes.length} />
  ), [sentLikes.length, maximumLikesCount]);

  return (
    <Likes
      {...props}
      likes={limitedSentLikes}
      direction="sent"
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
    />
  )
}

export default React.memo(SentLikes);
