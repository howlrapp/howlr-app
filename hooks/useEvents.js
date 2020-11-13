import React, { useContext } from 'react';

export const EventsContext = React.createContext({});

export default () => {
  return (
    useContext(EventsContext)
  );
}
