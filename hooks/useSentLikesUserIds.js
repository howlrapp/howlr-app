import React, { useContext } from 'react';

export const SentLikesUserIdsContext = React.createContext({});

export default () => {
  return (
    useContext(SentLikesUserIdsContext)
  );
}
