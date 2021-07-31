import React from 'react';
import { format } from 'date-fns';

import ProfileNoteList from '../ProfileNoteList';

const EventProfileNoteDate = ({ event, ...props }) => {
  return (
    <ProfileNoteList
      value={[ format(new Date(event.date), "PPP") ]}
      iconName="calendar"
      numberOfLines={1}
      {...props}
    />
  );
}

export default React.memo(EventProfileNoteDate);
