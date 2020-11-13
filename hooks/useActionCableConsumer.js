import React, { useContext } from 'react';

export const ActionCableConsumerContext = React.createContext({});

export default () => {
  return (
    useContext(ActionCableConsumerContext)
  );
}
