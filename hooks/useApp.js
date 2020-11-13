import React, { useContext } from 'react';

export const AppContext = React.createContext({});

export default () => {
  return (
    useContext(AppContext)
  );
}
