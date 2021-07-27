import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Portal } from 'react-native-portalize';
import { Menu, useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { without } from 'lodash';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import useApp from '../../hooks/useApp';

import ResponsiveModalize from '../ResponsiveModalize';
import FormTopNavigation from '../FormTopNavigation';
import CheckBoxMenuGroup from '../CheckBoxMenuGroup';

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

  const { genders, sexualOrientations, relationshipStatuses } = useApp();
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

  const handleSave = () => {
    if (onSave) {
      onSave(tmpValue);
    }
    handleClose();
  }

  const HeaderComponent = useCallback(() => (
    <FormTopNavigation
      title="Profile filters"
      saveLabel="Done"
      disabled={loading}
      onCancel={handleClose}
      onSave={handleSave}
    />
  ), [loading, handleClose, handleSave]);

  console.log(bottom);

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
