import React, { useCallback, useMemo } from 'react';

import useReceivedLikes from '../hooks/useReceivedLikes';
import useApp from '../hooks/useApp';

import Likes from './Likes';
import EmptyListProfile from '../components/EmptyListProfile';

const ReceivedLikes = (props) => {
  const receivedLikes = useReceivedLikes();

  const ListEmptyComponent = useCallback(() => (
    <EmptyListProfile
      description="Complete your profile to receive more likes and make new friends."
    />
  ), []);

  return (
    <Likes
      {...props}
      likes={receivedLikes}
      direction="received"
      ListEmptyComponent={ListEmptyComponent}
    />
  )
}

export default React.memo(ReceivedLikes);