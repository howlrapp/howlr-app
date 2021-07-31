import React from 'react';

import ProfileItem from '../ProfileItem';

const UserProfileItemLike = ({ user, ...props }) => (
  <ProfileItem
    value={user.like}
    label="Like"
    {...props}
  />
)

export default React.memo(UserProfileItemLike);
