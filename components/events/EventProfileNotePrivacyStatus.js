import React from 'react';

import ProfileNoteList from '../ProfileNoteList';

const privacyStatusInWords = (privacyStatus) => {
  switch(privacyStatus) {
    case "open":
      return "Open to everyone"
    case "liked_only":
      return "Liked only"
    default:
      return privacyStatus.replace('_', ' ')
  }
}

const EventProfileNotePrivacyStatus = ({ event, ...props }) => {
  return (
    <ProfileNoteList
      value={[privacyStatusInWords(event.privacyStatus)]}
      iconName={event.privacyStatus === "liked_only" ? "person-done" : "person"}
      numberOfLines={1}
      {...props}
    />
  );
}

export default React.memo(EventProfileNotePrivacyStatus);
