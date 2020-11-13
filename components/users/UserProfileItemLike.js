import React from 'react';

import UserProfileItem from './UserProfileItem';

const UserProfileItemLike = ({ user, ...props }) => (
  <UserProfileItem
    value={user.like}
    label="Like"
    {...props}
  />
)

export default React.memo(UserProfileItemLike);
