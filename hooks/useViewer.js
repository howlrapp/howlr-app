import React, { useContext } from 'react';

export const ViewerContext = React.createContext({});

export default () => {
  return (
    useContext(ViewerContext)
  );
}