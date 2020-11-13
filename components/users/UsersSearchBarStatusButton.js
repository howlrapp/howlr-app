import React, { useState, useCallback, useMemo } from 'react';

import useApp from '../../hooks/useApp';

import UsersFiltersStatus from './UsersFiltersStatus';
import CancellableButton from '../CancellableButton';

import isDeepEqualBy from '../../utils/isDeepEqualBy';

const UsersSearchBarStatusButton = ({
  onSave,
  value = {
    online: null,
    recent: null,
    matchKindIds: [],
  },
  ...props
}) => {
  const { matchKinds } = useApp();

  const [ usersFiltersStatusOpen, setUsersFiltersStatusOpen ] = useState(false);

  const handleOpenUsersFiltersStatusOpen = useCallback(() => (
    setUsersFiltersStatusOpen(true)
  ));

  const handleOpenUsersFiltersStatusClose = useCallback(() => (
    setUsersFiltersStatusOpen(false)
  ));

  const handleClear = useCallback(() => (
    onSave({
      online: null,
      recent: null,
      matchKindIds: [],
    })
  ), [onSave]);

  const enabledFiltersCount = [ value.online, value.recent, (value.matchKindIds || []).length > 0 ].filter(Boolean).length;

  const label = useMemo(() => {
    if (value.online && enabledFiltersCount === 1) {
      return ("Online")
    }
    if (value.online && enabledFiltersCount > 1) {
      return ("Online+");
    }

    if (value.recent && enabledFiltersCount === 1) {
      return ("New users")
    }
    if (value.recent && enabledFiltersCount > 1) {
      return ("New users+");
    }

    if (value.matchKindIds) {
      const firstMatchKind = matchKinds.find(({ id }) => value.matchKindIds.includes(id));

      if (firstMatchKind && value.matchKindIds.length === 1) {
        return (firstMatchKind.label)
      }

      if (firstMatchKind && value.matchKindIds.length > 1) {
        return (`${firstMatchKind.label}+`);
      }
    }

    return ("Status");
  }, [value, enabledFiltersCount]);

  return (
    <>
      <CancellableButton
        onPress={handleOpenUsersFiltersStatusOpen}
        onClear={handleClear}
        label={label}
        hasValue={enabledFiltersCount > 0}
        {...props}
      />
      <UsersFiltersStatus
        open={usersFiltersStatusOpen}
        onClose={handleOpenUsersFiltersStatusClose}
        onSave={onSave}
        value={value}
      />
    </>
  );
}

export default React.memo(UsersSearchBarStatusButton, isDeepEqualBy(['style']));
