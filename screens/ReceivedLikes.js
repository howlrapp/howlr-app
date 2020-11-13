import React, { useCallback } from 'react';

import useReceivedLikes from '../hooks/useReceivedLikes';
import useApp from '../hooks/useApp';

import Likes from './Likes';
import EmptyListProfile from '../components/EmptyListProfile';
import LikeLimitDisclaimer from '../components/likes/LikeLimitDisclaimer';

const ReceivedLikes = (props) => {
  const { maximumLikesCount } = useApp();

  const receivedLikes = useReceivedLikes();

  const ListEmptyComponent = useCallback(() => (
    <EmptyListProfile
      description="Complete your profile to receive more likes and make new friends."
    />
  ), []);

  const ListFooterComponent = useCallback(() => (
    <LikeLimitDisclaimer active={maximumLikesCount <= receivedLikes.length} />
  ), [receivedLikes.length, maximumLikesCount]);

  return (
    <Likes
      {...props}
      likes={receivedLikes}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
    />
  )
}

export default React.memo(ReceivedLikes);