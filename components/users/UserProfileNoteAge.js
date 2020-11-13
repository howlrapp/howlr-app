import React from 'react';

import UserProfileNoteList from './UserProfileNoteList';

const UserProfileNoteGenders = ({ user, ...props }) => {
  if (!user.age) {
    return (null);
  }

  return (
    <UserProfileNoteList
      value={[user.age]}
      iconName="gift"
      {...props}
    />
  );
}

export default React.memo(UserProfileNoteGenders);
