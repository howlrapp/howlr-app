import React, { useMemo } from 'react';
import { isEmpty } from 'lodash';

import ProfileNoteList from '../ProfileNoteList';

const UserProfileNoteLocation = ({ user, ...props }) => {
  const location = useMemo(() => (
    user.localities.join(', ')
  ), [user.localities]);

  if (isEmpty(location)) {
    return (null);
  }

  return (
    <ProfileNoteList
      value={[location]}
      iconName="pin"
      numberOfLines={2}
      {...props}
    />
  );
}

export default React.memo(UserProfileNoteLocation);
