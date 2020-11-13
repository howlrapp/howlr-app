import React, { useContext } from 'react';

export const ReceivedLikesContext = React.createContext({});

export default () => {
  return (
    useContext(ReceivedLikesContext)
  );
}
