import React from 'react';

import UserProfileItem from './UserProfileItem';

const UserProfileItemBio = ({ user, ...props }) => (
  <UserProfileItem
    value={user.bio}
    label="About me"
    {...props}
  />
)

export default React.memo(UserProfileItemBio);
