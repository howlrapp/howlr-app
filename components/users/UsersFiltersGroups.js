import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Portal } from 'react-native-portalize';
import { CheckBox,  Text, useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { without } from 'lodash';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { orderBy } from 'lodash';

import useApp from '../../hooks/useApp';
import useViewer from '../../hooks/useViewer';

import EmptyListGroups from '../EmptyListGroups';
import ResponsiveModalize from '../ResponsiveModalize';
import FormTopNavigation from '../FormTopNavigation';
import UnmanagedCheckbox from '../UnmanagedCheckbox';

const UsersFiltersGroups = ({
  open,
  loading,
  onSave,
  onClose,
  value,
}) => {
  const theme = useTheme();

  const { bottom } = useSafeAreaInsets();

  const modalizeRef = useRef(null);

  const tmpValue = useRef(value);

  const { groups } = useApp();
  const { groupIds } = useViewer();

  const sortedGroups = useMemo(() => (
    orderBy(groups, 'name')
  ), [groups]);

  const myGroups = useMemo(() => (
    sortedGroups.filter(({ id }) => groupIds.includes(id))
  ), [sortedGroups, groupIds]);

  const otherGroups = useMemo(() => (
    sortedGroups.filter(({ id }) => !groupIds.includes(id))
  ), [sortedGroups, groupIds]);

  const sections = useMemo(() => ([
    {
      label: "My groups",
      data: myGroups,
      first: true
    },
    {
      label: "Other groups",
      data: otherGroups
    }
  ]), [myGroups, otherGroups])

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

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(tmpValue.current)
    }
    handleClose();
  }, [tmpValue]);

  const handleChangeGroup = useCallback((id, enabled) => {
    if (enabled) {
      tmpValue.current = [ ...tmpValue.current, id ];
    } else {
      tmpValue.current = without(tmpValue.current, id);
    }
  }, [tmpValue]);

  const renderItem = useCallback(({ item }) => (
    <UnmanagedCheckbox
      id={item.id}
      style={styles.checkbox}
      defaultChecked={value.includes(item.id)}
      onChange={handleChangeGroup}
    >
      {item.name}
    </UnmanagedCheckbox>
  ), [handleChangeGroup]);

  const keyExtractor = useCallback(({ id }) => id, []);

  const ListEmptyComponent = useCallback(() => (
    <EmptyListGroups
      description="Go to the Groups tab to join groups that match your interest."
      descriptionMaxWidth={240}
      onPressCallToAction={handleClose}
      backgroundColor='background-basic-color-1'
    />
  ), [handleClose]);

  const HeaderComponent = useCallback(() => (
    <FormTopNavigation
      title="Groups filters"
      saveLabel="Done"
      disabled={loading}
      onCancel={handleClose}
      onSave={handleSave}
    />
  ), [loading, handleClose, handleSave]);

  const noJoinedGroups = myGroups.length === 0;
  const renderSectionHeader = useCallback(({ section: { label, first, data } }) => {
    if (noJoinedGroups) {
      return (null);
    }

    return (
      <Text
        style={[ styles.categoryTitle, first ? styles.categoryTitleFirst : {} ]}
        category="c2"
        appearance="hint"
      >
        {label.toUpperCase()}
      </Text>
    );
  }, [noJoinedGroups]);

  const modalStyle = useMemo(() => ({
    backgroundColor: theme['background-basic-color-1']
  }), [theme]);

  const contentContainerStyle = useMemo(() => (
    [ styles.contentContainer, { paddingBottom: bottom } ]
  ), [bottom]);

  const sectionListProps = useMemo(() => ({
    sections,
    keyExtractor,
    renderItem,
    ListEmptyComponent,
    renderSectionHeader,
    contentContainerStyle,
    stickySectionHeadersEnabled: false,
  }), [
    sections,
    keyExtractor,
    renderItem,
    ListEmptyComponent,
    renderSectionHeader,
    contentContainerStyle,
  ])

  return (
    <Portal>
      <ResponsiveModalize
        ref={modalizeRef}
        withHandle={false}
        panGestureEnabled={false}
        disableScrollIfPossible={true}
        modalStyle={modalStyle}
        onClose={onClose}
        HeaderComponent={HeaderComponent}
        sectionListProps={sectionListProps}
      />
    </Portal>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    paddingVertical: 9,
    height: 38,
  },
  categoryTitle: {
    paddingBottom: 10,
    paddingTop: 20,
  },
  categoryTitleFirst: {
    paddingTop: 0,
  },
  contentContainer: {
    paddingLeft: 10,
  }
})

export default React.memo(UsersFiltersGroups);
