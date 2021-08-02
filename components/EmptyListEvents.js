import React, { useCallback, useState } from 'react';

import EmptyList from './EmptyList';
import EventForm from './events/EventForm';

const EmptyListEvents = (props) => {
  const [ eventFormOpen, setEventFormOpen ] = useState(false);

  const handleOpenEventForm = useCallback(() => (
    setEventFormOpen(true)
  ), [setEventFormOpen]);

  const handleCloseEventForm = useCallback(() => (
    setEventFormOpen(false)
  ), [setEventFormOpen]);

  return (
    <>
      <EmptyList
        callToAction="Add your own event"
        onPressCallToAction={handleOpenEventForm}
        {...props}
      />
      <EventForm
        title="Add event"
        open={eventFormOpen}
        onCancel={handleCloseEventForm}
        onSave={handleCloseEventForm}
      />
    </>
  )
}

export default React.memo(EmptyListEvents);
