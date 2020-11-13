import React, { useContext } from 'react';

export const SessionContext = React.createContext({});

export default () => {
  return (
    useContext(SessionContext)
  );
}
