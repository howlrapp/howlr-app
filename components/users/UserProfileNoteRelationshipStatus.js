import React, { useMemo } from 'react';

import useApp from '../../hooks/useApp';

import UserProfileNoteList from './UserProfileNoteList';

const UserProfileNoteRelationshipStatus = ({ user, ...props }) => {
  const { relationshipStatuses } = useApp();

  const selectedRelationshipStatus = useMemo(() => (
    relationshipStatuses.find(({ id }) => user.relationshipStatusId === id)
  ), [relationshipStatuses, user]);

  if (!selectedRelationshipStatus) {
    return (null);
  }

  return (
    <UserProfileNoteList
      value={[selectedRelationshipStatus?.label]}
      iconName="heart"
      {...props}
    />
  );
}

export default React.memo(UserProfileNoteRelationshipStatus);
