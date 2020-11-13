import React, { useContext } from 'react';

export const DeviceTypeContext = React.createContext({});

export default () => {
  return (
    useContext(DeviceTypeContext)
  );
}
