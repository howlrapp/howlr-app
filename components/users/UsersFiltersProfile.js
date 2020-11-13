import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Portal } from 'react-native-portalize';
import { CheckBox,  Text, useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { without } from 'lodash';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import useApp from '../../hooks/useApp';

import ResponsiveModalize from '../ResponsiveModalize';
import FormTopNavigation from '../FormTopNavigation';

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

  const renderGenderItem = useCallback(({ item: gender }) => (
    <CheckBox
      key={gender.id}
      style={styles.checkbox}
      checked={tmpValue.genderIds.includes(gender.id)}
      onChange={(checked) => handleChangeGender(gender, checked)}
    >
      {gender.label}
    </CheckBox>
  ), [tmpValue.genderIds, handleChangeGender])

  const renderSexualOrientationItem = useCallback(({ item: sexualOrientation }) => (
    <CheckBox
      key={sexualOrientation.id}
      style={styles.checkbox}
      checked={tmpValue.sexualOrientationIds.includes(sexualOrientation.id)}
      onChange={(checked) => handleChangeSexualOrientation(sexualOrientation, checked)}
    >
      {sexualOrientation.label}
    </CheckBox>
  ), [tmpValue.sexualOrientationIds, handleChangeSexualOrientation])

  const renderRelationshipStatusItem = useCallback(({ item: relationshipStatus }) => (
    <CheckBox
      key={relationshipStatus.id}
      style={styles.checkbox}
      checked={tmpValue.relationshipStatusIds.includes(relationshipStatus.id)}
      onChange={(checked) => handleChangeRelationshipStatus(relationshipStatus, checked)}
    >
      {relationshipStatus.label}
    </CheckBox>
  ), [tmpValue.relationshipStatusIds, handleChangeRelationshipStatus])

  const sections = useMemo(() => ([
    {
      label: "Gender",
      data: genders,
      first: true,
      renderItem: renderGenderItem
    },
    {
      label: "Sexual orientation",
      data: sexualOrientations,
      renderItem: renderSexualOrientationItem
    },
    {
      label: "Relationship Status",
      data: relationshipStatuses,
      renderItem: renderRelationshipStatusItem
    }
  ]), [
    renderGenderItem,
    genders,

    renderSexualOrientationItem,
    sexualOrientations,

    relationshipStatuses
  ])

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

  const renderSectionHeader = useCallback(({ section: { label, first } }) => (
    <Text
      style={[ styles.categoryTitle, first ? styles.categoryTitleFirst : {} ]}
      category="c2"
      appearance="hint"
    >
      {label.toUpperCase()}
    </Text>
  ), []);

  const keyExtractor = useCallback(({ id }) => id, []);

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
        sectionListProps={{
          sections,
          initialNumToRender: 20,
          keyExtractor,
          renderSectionHeader,
          contentContainerStyle: [ styles.contentContainer, { paddingBottom: bottom } ],
          stickySectionHeadersEnabled: false
        }}
      />
    </Portal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingLeft: 10,
  },
  checkbox: {
    paddingVertical: 9,
  },
  categoryTitle: {
    paddingBottom: 10,
    paddingTop: 20,
  },
  categoryTitleFirst: {
    paddingTop: 0,
  },
})

export default React.memo(UsersFiltersProfile);
