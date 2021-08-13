import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Portal } from 'react-native-portalize';
import { Menu, MenuGroup, MenuItem, Input, useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { without } from 'lodash';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import useApp from '../../hooks/useApp';

import ResponsiveModalize from '../ResponsiveModalize';
import FormTopNavigation from '../FormTopNavigation';
import CheckBoxMenuGroup from '../CheckBoxMenuGroup';

const LISTING_ITEMS = [
  { label: "Online now", id: "online"            },
  { label: "New members", id: "recent"           },
]

const LIKE_ITEMS = [
  { label: "Liked by me", id: "likedByMe"  },
  { label: "Liking me", id: "likingMe"  },
]

const AGE_ITEMS = [
  { label: "Between 18 and 25", id: "18_25",     },
  { label: "Between 25 and 35", id: "25_35",     },
  { label: "Between 35 and 50", id: "35_50",     },
  { label: "Between 50 and 65", id: "50_65",     },
  { label: "Above 65",          id: "65_150",    },
]

const UsersFiltersProfile = ({
  open,
  loading,
  onSave,
  onClose,
  value,
}) => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();

  const modalizeRef = useRef(null);

  const [ tmpValue, setTmpValue ] = useState(value)
  useEffect(() => (
    setTmpValue(value)
  ), [value]);

  const { genders, sexualOrientations, relationshipStatuses, matchKinds } = useApp();
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
  }, [modalizeRef.current, onClose]);

  const handleChangeRelationshipStatus = (relationshipStatus, enabled) => {
    if (enabled) {
      setTmpValue(value => ({
        ...value,
        relationshipStatusIds: [ ...value.relationshipStatusIds, relationshipStatus.id ]
      }))
    } else {
      setTmpValue(value => ({
        ...value,
        relationshipStatusIds: without(value.relationshipStatusIds, relationshipStatus.id)
      }))
    }
  }

  const handleChangeGender = (gender, enabled) => {
    if (enabled) {
      setTmpValue(value => ({
        ...value,
        genderIds: [ ...value.genderIds, gender.id ]
      }))
    } else {
      setTmpValue(value => ({
        ...value,
        genderIds: without(value.genderIds, gender.id)
      }))
    }
  }

  const handleChangeSexualOrientation = (sexualOrientation, enabled) => {
    if (enabled) {
      setTmpValue(value => ({
        ...value,
        sexualOrientationIds: [ ...value.sexualOrientationIds, sexualOrientation.id ]
      }))
    } else {
      setTmpValue(value => ({
        ...value,
        sexualOrientationIds: without(value.sexualOrientationIds, sexualOrientation.id)
      }))
    }
  }

  const handleChangeListing = useCallback((item, checked) => {
    setTmpValue((tmpValue) => ({ ...tmpValue, [item.id]: checked }));
  }, [setTmpValue]);

  const listingSelectedIds = useMemo(() => (
    [tmpValue.online && "online", tmpValue.recent && "recent"].filter((item) => !!item)
  ), [tmpValue.online, tmpValue.recent]);

  const likesSelectedIds = useMemo(() => (
    [tmpValue.likedByMe && "likedByMe", tmpValue.likingMe && "likingMe"].filter((item) => !!item)
  ), [tmpValue.likedByMe, tmpValue.likingMe]);

  const handleChangeMatchKind = useCallback((matchKind, checked) => {
    if (checked) {
      setTmpValue(tmpValue => ({ ...tmpValue, matchKindIds: [ ...tmpValue.matchKindIds, matchKind.id ] }));
    } else {
      setTmpValue(tmpValue => ({ ...tmpValue, matchKindIds: without(tmpValue.matchKindIds, matchKind.id) }));
    }
  }, []);

  const handleChangeAge = useCallback((ageItem, checked) => {
    if (checked) {
      setTmpValue(tmpValue => ({ ...tmpValue, ageIds: [ ...tmpValue.ageIds, ageItem.id ] }));
    } else {
      setTmpValue(tmpValue => ({ ...tmpValue, ageIds: without(tmpValue.ageIds, ageItem.id) }));
    }
  }, []);

  const handleSave = () => {
    if (onSave) {
      onSave(tmpValue);
    }
    handleClose();
  }

  const HeaderComponent = useCallback(() => (
    <FormTopNavigation
      title="Filters"
      saveLabel="Done"
      disabled={loading}
      onCancel={handleClose}
      onSave={handleSave}
    />
  ), [loading, handleClose, handleSave]);

  return (
    <Portal>
      <ResponsiveModalize
        ref={modalizeRef}
        withHandle={false}
        panGestureEnabled={false}
        disableScrollIfPossible={false}
        modalStyle={{ backgroundColor: theme['background-basic-color-1'] }}
        onClose={onClose}
        HeaderComponent={HeaderComponent}
      >
        <Menu
          style={{ marginBottom: bottom }}
        >
          <CheckBoxMenuGroup
            title="Status"
            items={LISTING_ITEMS}
            selectedItemIds={listingSelectedIds}
            onChange={handleChangeListing}
          />
          <CheckBoxMenuGroup
            title="Likes"
            items={LIKE_ITEMS}
            selectedItemIds={likesSelectedIds}
            onChange={handleChangeListing}
          />
          <CheckBoxMenuGroup
            title="Age"
            items={AGE_ITEMS}
            selectedItemIds={tmpValue.ageIds}
            onChange={handleChangeAge}
          />
          <CheckBoxMenuGroup
            title="Looking for"
            items={matchKinds}
            selectedItemIds={tmpValue.matchKindIds}
            onChange={handleChangeMatchKind}
          />
          <CheckBoxMenuGroup
            title="Genders"
            items={genders}
            selectedItemIds={tmpValue.genderIds}
            onChange={handleChangeGender}
          />
          <CheckBoxMenuGroup
            title="Sexual orientation"
            items={sexualOrientations}
            selectedItemIds={tmpValue.sexualOrientationIds}
            onChange={handleChangeSexualOrientation}
          />
          <CheckBoxMenuGroup
            title="Relationship status"
            items={relationshipStatuses}
            selectedItemIds={tmpValue.relationshipStatusIds}
            onChange={handleChangeRelationshipStatus}
          />          
        </Menu>
      </ResponsiveModalize>
    </Portal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingLeft: 10,
  },
  menuItem: {
    height: 38
  },
  checkbox: {
    height: 38
  },
  menuGroupTitleContainer: {
    justifyContent: "space-between",
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 8,
  }
})

export default React.memo(UsersFiltersProfile);
