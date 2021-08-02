import React from 'react';

import ProfileNoteList from '../ProfileNoteList';

const EventProfileNoteAddress = ({ event, ...props }) => {
  return (
    <ProfileNoteList
      value={[event.address]}
      iconName="pin"
      numberOfLines={2}
      {...props}
    />
  );
}

export default React.memo(EventProfileNoteAddress);
