import React from 'react';

import useViewer from '../hooks/useViewer';

import Events from './Events';

const MyEvents = () => {
  const { eventsAsParticipant } = useViewer();

  return (
    <Events
      events={eventsAsParticipant}
      callToAction={false}
    />
  );
}

export default React.memo(MyEvents);
