import React, { useContext } from 'react';

export const SentLikesContext = React.createContext({});

export default () => {
  return (
    useContext(SentLikesContext)
  );
}
