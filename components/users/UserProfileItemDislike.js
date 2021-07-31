import React from 'react';

import ProfileItem from '../ProfileItem';

const UserProfileItemDislike = ({ user, ...props }) => (
  <ProfileItem
    value={user.dislike}
    label="Dislike"
    {...props}
  />
)

export default React.memo(UserProfileItemDislike);
