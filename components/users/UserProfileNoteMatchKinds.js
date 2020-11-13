import React, { useMemo } from 'react';

import useApp from '../../hooks/useApp';

import UserProfileNoteList from './UserProfileNoteList';

const UserProfileNoteMatchKinds = ({ user, ...props }) => {
  const { matchKinds } = useApp();

  const selectedMatchKinds = useMemo(() => (
    matchKinds.filter(({ id }) => user.matchKindIds.includes(id))
  ), [matchKinds, user]);

  const value = useMemo(() => (
    selectedMatchKinds.map(({ label }) => label)
  ), [selectedMatchKinds]);

  return (
    <UserProfileNoteList
      value={value}
      iconName="smiling-face"
      {...props}
    />
  );
}

export default React.memo(UserProfileNoteMatchKinds);
