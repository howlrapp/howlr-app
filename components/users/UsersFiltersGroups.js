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

  const [ tmpValue, setTmpValue ] = useState(value)
  useEffect(() => (
    setTmpValue(value)
  ), [value]);

  const { groups } = useApp();
  const { groupIds } = useViewer();

  const groupsWithValue = useMemo(() => (
    groups.map((group) => {
      const checked = tmpValue.includes(group.id);

      if (checked !== group.checked) {
        return ({ ...group, checked });
      }

      return (group);
    })
  ), [groups, tmpValue]);

  const sortedGroups = useMemo(() => (
    orderBy(groupsWithValue, 'name')
  ), [groupsWithValue]);

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

  const handleSave = () => {
    if (onSave) {
      onSave(tmpValue);
    }
    handleClose();
  }

  const handleChangeGroup = useCallback((group, enabled) => {
    if (enabled) {
      setTmpValue(tmpValue => [ ...tmpValue, group.id ]);
    } else {
      setTmpValue(tmpValue => without(tmpValue, group.id));
    }
  }, [setTmpValue]);

  const renderItem = useCallback(({ item }) => (
    <CheckBox
      key={item.id}
      style={styles.checkbox}
      checked={item.checked}
      onChange={(checked) => handleChangeGroup(item, checked)}
    >
      {item.name}
    </CheckBox>
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

  return (
    <Portal>
      <ResponsiveModalize
        ref={modalizeRef}
        withHandle={false}
        panGestureEnabled={false}
        disableScrollIfPossible={true}
        modalStyle={{ backgroundColor: theme['background-basic-color-1'] }}
        onClose={onClose}
        HeaderComponent={HeaderComponent}
        sectionListProps={{
          sections,
          initialNumToRender: 20,
          keyExtractor,
          renderItem,
          ListEmptyComponent,
          renderSectionHeader,
          contentContainerStyle: [ styles.contentContainer, { paddingBottom: bottom } ],
          stickySectionHeadersEnabled: false
        }}
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
