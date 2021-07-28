import React, { useState, useCallback, useMemo } from 'react';

import UsersFiltersProfile from './UsersFiltersProfile';

import CancellableButton from '../CancellableButton';

import isDeepEqualBy from '../../utils/isDeepEqualBy';

const UsersSearchBarProfileButton = ({
  onSave,
  value = {
    genderIds: [],
    sexualOrientationIds: [],
    relationshipStatusIds: []
  },
  ...props
}) => {
  const [ usersFiltersProfileOpen, setUsersFiltersProfileOpen ] = useState(false);

  const handleOpenUsersFiltersProfileOpen = useCallback(() => (
    setUsersFiltersProfileOpen(true)
  ));

  const handleOpenUsersFiltersProfileClose = useCallback(() => (
    setUsersFiltersProfileOpen(false)
  ));

  const handleClear = useCallback(() => (
    onSave({
      genderIds: [],
      sexualOrientationIds: [],
      relationshipStatusIds: [],
      matchKindIds: [],
      online: null,
      recent: null
    })
  ), [onSave]);

  const hasValue = !(
    value.genderIds.length === 0 &&
      value.sexualOrientationIds.length === 0 &&
      value.relationshipStatusIds.length === 0 &&
      value.matchKindIds.length === 0 &&
      !value.recent &&
      !value.online
  );

  const label = useMemo(() => {
    if (hasValue) {
      return ("Filtered");
    }

    return ("Filters");
  }, [hasValue]);

  return (
    <>
      <CancellableButton
        onPress={handleOpenUsersFiltersProfileOpen}
        onClear={handleClear}
        label={label}
        hasValue={hasValue}
        {...props}
      />
      <UsersFiltersProfile
        open={usersFiltersProfileOpen}
        onClose={handleOpenUsersFiltersProfileClose}
        onSave={onSave}
        value={value}
      />
    </>
  );
}

export default React.memo(UsersSearchBarProfileButton, isDeepEqualBy(['style']));
