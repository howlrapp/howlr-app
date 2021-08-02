import React from 'react';

import ProfileNoteList from '../ProfileNoteList';

const UserProfileNoteGenders = ({ user, ...props }) => {
  if (!user.age) {
    return (null);
  }

  return (
    <ProfileNoteList
      value={[user.age]}
      iconName="gift"
      {...props}
    />
  );
}

export default React.memo(UserProfileNoteGenders);
