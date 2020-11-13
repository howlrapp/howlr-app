import React from 'react';

import useEvents from '../hooks/useEvents';

import Events from './Events';

const AllEvents = () => {
  const events = useEvents();

  return (
    <Events
      events={events}
      callToAction={true}
    />
  );
}

export default React.memo(AllEvents);
