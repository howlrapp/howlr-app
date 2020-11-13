import React, { useContext } from 'react';

export const ReceivedLikesUserIdsContext = React.createContext({});

export default () => {
  return (
    useContext(ReceivedLikesUserIdsContext)
  );
}
