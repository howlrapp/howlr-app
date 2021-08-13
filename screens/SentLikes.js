import React, { useCallback, useMemo } from 'react';

import useSentLikes from '../hooks/useSentLikes';
import useApp from '../hooks/useApp';

import Likes from './Likes';
import EmptyListSearch from '../components/EmptyListSearch';

const SentLikes = (props) => {
  const sentLikes = useSentLikes();

  const ListEmptyComponent = useCallback(() => (
    <EmptyListSearch
      description="Send a Like to users around you that match your interest."
    />
  ), []);

  return (
    <Likes
      {...props}
      likes={sentLikes}
      direction="sent"
      ListEmptyComponent={ListEmptyComponent}
    />
  )
}

export default React.memo(SentLikes);
