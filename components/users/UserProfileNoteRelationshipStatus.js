import React, { useMemo } from 'react';

import useApp from '../../hooks/useApp';

import ProfileNoteList from '../ProfileNoteList';

const UserProfileNoteRelationshipStatus = ({ user, ...props }) => {
  const { relationshipStatuses } = useApp();

  const selectedRelationshipStatus = useMemo(() => (
    relationshipStatuses.find(({ id }) => user.relationshipStatusId === id)
  ), [relationshipStatuses, user]);

  if (!selectedRelationshipStatus) {
    return (null);
  }

  return (
    <ProfileNoteList
      value={[selectedRelationshipStatus?.label]}
      iconName="heart"
      {...props}
    />
  );
}

export default React.memo(UserProfileNoteRelationshipStatus);
