import React, { useMemo } from 'react';
import { isEmpty } from 'lodash';

import UserProfileNoteList from './UserProfileNoteList';

const UserProfileNoteLocation = ({ user, ...props }) => {
  const location = useMemo(() => (
    user.localities.join(', ')
  ), [user.localities]);

  if (isEmpty(location)) {
    return (null);
  }

  return (
    <UserProfileNoteList
      value={[location]}
      iconName="pin"
      {...props}
    />
  );
}

export default React.memo(UserProfileNoteLocation);
