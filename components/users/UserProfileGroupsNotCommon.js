import React, { useMemo } from 'react';

import useApp from '../../hooks/useApp';
import useViewer from '../../hooks/useViewer';

import UserProfileGroups from './UserProfileGroups';

const UserProfileGroupsNotCommon = ({
  user,
  ...props
}) => {
  const { groups } = useApp();
  const { groupIds } = useViewer();

  const joinedGroups = useMemo(() => (
    groups.filter(({ id }) => user.groupIds.includes(id))
  ), [groups, user.groupIds])

  const otherGroups = useMemo(() => (
    joinedGroups.filter(({ id }) => !groupIds.includes(id))
  ), [joinedGroups, groupIds])

  return (
    <UserProfileGroups
      groups={otherGroups}
      title={otherGroups.length === joinedGroups.length ? "Groups" : "Other groups"}
      {...props}
    />
  );
}

export default React.memo(UserProfileGroupsNotCommon);