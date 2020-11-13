import React, { useState, useCallback, useMemo } from 'react';

import useApp from '../../hooks/useApp';

import UsersFiltersGroups from './UsersFiltersGroups';
import CancellableButton from '../CancellableButton';

import isDeepEqualBy from '../../utils/isDeepEqualBy';

const UsersSearchBarGroupsButton = ({
  onSave,
  value = [],
  ...props
}) => {
  const { groups } = useApp();

  const [ usersFiltersGroupsOpen, setUsersFiltersGroupsOpen ] = useState(false);

  const handleOpenUsersFiltersGroupsOpen = useCallback(() => (
    setUsersFiltersGroupsOpen(true)
  ), []);

  const handleOpenUsersFiltersGroupsClose = useCallback(() => (
    setUsersFiltersGroupsOpen(false)
  ), []);

  const handleClear = useCallback(() => (
    onSave([])
  ), [onSave]);

  const label = useMemo(() => {
    if (value.length >= 2) {
      return (`${value.length}+ groups`)
    }

    if (value.length >= 1) {
      const selectedGroups = groups.filter(({ id }) => value.includes(id));

      return (selectedGroups.map(({ name }) => name).join(', '));
    }

    return ("Groups")
  }, [value]);

  const hasValue = value.length > 0;

  return (
    <>
      <CancellableButton
        onPress={handleOpenUsersFiltersGroupsOpen}
        onClear={handleClear}
        label={label}
        hasValue={hasValue}
        {...props}
      />
      <UsersFiltersGroups
        open={usersFiltersGroupsOpen}
        onClose={handleOpenUsersFiltersGroupsClose}
        onSave={onSave}
        value={value}
      />
    </>
  );
}

export default React.memo(UsersSearchBarGroupsButton, isDeepEqualBy(['style']));
