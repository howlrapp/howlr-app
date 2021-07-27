import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Portal } from 'react-native-portalize';
import {  Menu, useTheme } from '@ui-kitten/components';
import { without } from 'lodash';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import CheckBoxMenuGroup from '../CheckBoxMenuGroup';

import useApp from '../../hooks/useApp';

import ResponsiveModalize from '../ResponsiveModalize';
import FormTopNavigation from '../FormTopNavigation';

const LISTING_ITEMS = [
  { label: "Online now", id: "online" },
  { label: "Users who joined recently", id: "recent" },
]

const UsersFiltersStatus = ({
  open,
  loading,
  onSave,
  onClose,
  value,
}) => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();

  const { matchKinds } = useApp();

  const modalizeRef = useRef(null);

  const [ tmpValue, setTmpValue ] = useState(value)
  useEffect(() => (
    setTmpValue(value)
  ), [value]);

  useEffect(() => {
    if (open) {
      modalizeRef.current?.open();
    }
  }, [open])

  const handleClose = useCallback(() => {
    modalizeRef.current?.close();

    if (onClose) {
      onClose();
    }
  }, [modalizeRef, onClose]);

  const handleSave = () => {
    if (onSave) {
      onSave(tmpValue);
    }
    handleClose();
  }

  const handleChangeListing = useCallback((item, checked) => {
    switch (item.id) {
      case "online":
        setTmpValue((tmpValue) => ({ ...tmpValue, online: checked }));
        break ;
      case "recent":
        setTmpValue((tmpValue) => ({ ...tmpValue, recent: checked }));
        break ;
    }
  }, [setTmpValue]);

  const listingSelectedIds = useMemo(() => (
    [tmpValue.online && "online", tmpValue.recent && "recent"].filter((item) => !!item)
  ), [tmpValue.online, tmpValue.recent]);

  const handleChangeMatchKind = useCallback((matchKind, checked) => {
    if (checked) {
      setTmpValue(tmpValue => ({ ...tmpValue, matchKindIds: [ ...tmpValue.matchKindIds, matchKind.id ] }));
    } else {
      setTmpValue(tmpValue => ({ ...tmpValue, matchKindIds: without(tmpValue.matchKindIds, matchKind.id) }));
    }
  });

  return (
    <Portal>
      <ResponsiveModalize
        ref={modalizeRef}
        withHandle={false}
        panGestureEnabled={false}
        disableScrollIfPossible={false}
        modalStyle={{ backgroundColor: theme['background-basic-color-1'] }}
        onClose={onClose}
      >
        <FormTopNavigation
          title="Status filters"
          saveLabel="Done"
          disabled={loading}
          onCancel={handleClose}
          onSave={handleSave}
        />
        <Menu
          style={{ marginBottom: bottom }}
        >
          <CheckBoxMenuGroup
            title="Listing"
            items={LISTING_ITEMS}
            selectedItemIds={listingSelectedIds}
            onChange={handleChangeListing}
          />
          <CheckBoxMenuGroup
            title="Looking for"
            items={matchKinds}
            selectedItemIds={tmpValue.matchKindIds}
            onChange={handleChangeMatchKind}
          />
        </Menu>
      </ResponsiveModalize>
    </Portal>
  );
}

export default React.memo(UsersFiltersStatus);
