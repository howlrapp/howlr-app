import React from 'react';

import ProfileItem from '../ProfileItem';

const UserProfileItemBio = ({ user, ...props }) => (
  <ProfileItem
    value={user.bio}
    label="About me"
    {...props}
  />
)

export default React.memo(UserProfileItemBio);
