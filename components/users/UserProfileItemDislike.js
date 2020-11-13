import React from 'react';

import UserProfileItem from './UserProfileItem';

const UserProfileItemDislike = ({ user, ...props }) => (
  <UserProfileItem
    value={user.dislike}
    label="Dislike"
    {...props}
  />
)

export default React.memo(UserProfileItemDislike);
