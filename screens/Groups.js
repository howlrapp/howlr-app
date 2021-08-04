import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Divider, MenuItem } from '@ui-kitten/components';

import { isEmpty, orderBy } from 'lodash';
import { Keyboard, StyleSheet } from 'react-native';

import useFuse from "../hooks/useFuse";
import useApp from '../hooks/useApp';
import useViewer from '../hooks/useViewer';

import ResponsiveLayout from '../components/ResponsiveLayout';
import ResponsiveList from '../components/ResponsiveList';
import EmptyList from '../components/EmptyList';
import SearchBar from '../components/SearchBar';
import ThemedOverflowMenu from '../components/ThemedOverflowMenu';
import CancellableButton from '../components/CancellableButton';
import GroupItem from '../components/groups/GroupItem';

export const GROUP_SEARCH_OPTIONS = {
  keys: [
    'name'
  ],
  threshold: 0.35,
  shouldSort: true,
  ignoreFieldNorm: true,
};

const GROUP_STATUSES = {
  "joined": { label: "Joined" },
  "not_joined": { label: "Not joined" }
}

const Groups = () => {
  const { groups, groupCategories } = useApp();
  const { groupIds } = useViewer();
  const [ matchString, setMatchString ] = useState("");

  const [ groupCategory, setGroupCategory ] = useState(null);
  const [ groupCategorySelectorOpen, setGroupCategorySelectorOpen ] = useState(false);

  const [ groupStatus, setGroupStatus ] = useState(null);
  const [ groupStatusSelectorOpen, setGroupStatusSelectorOpen ] = useState(false);

  const searchResult = useFuse(groups, matchString, GROUP_SEARCH_OPTIONS);

  const searchedGroups = useMemo(() => {
    if (isEmpty(matchString)) {
      return (
        orderBy(groups, 'name')
      );
    }
    return (
      searchResult.map(({ item }) => item)
    )
  }, [searchResult]);

  const filteredGroups = useMemo(() => {
    return (
      searchedGroups
        .filter((group) => {
          if (groupCategory) {
            return (group.groupCategoryId === groupCategory?.id);
          }

          return (group);
        })
        .filter((group) => {
          if (groupStatus === 'joined') {
            return (groupIds.includes(group.id));
          }

          if (groupStatus === 'not_joined') {
            return (!groupIds.includes(group.id));
          }

          return (group);
        })
    );
  }, [searchedGroups, groupCategory, groupStatus]);

  const getItemLayout = useCallback((_data, index) => ({
    length: 55, offset: index * 55, index
  }), []);

  const ListEmptyComponent = useCallback(() => (
    <EmptyList
      title="No results found"
    />
  ), []);

  const renderItem = useCallback(({ item }) => (
    <GroupItem group={item} />
  ), []);

  const keyExtractor = useCallback(({ id }) => id, []);

  const handleOpenGroupCategorySelector = useCallback(() => {
    setGroupCategorySelectorOpen(true)
  }, []);

  const handleCloseGroupCategorySelector = useCallback(() => {
    setGroupCategorySelectorOpen(false)
  }, []);

  const handleOpenGroupStatusSelector = useCallback(() => {
    setGroupStatusSelectorOpen(true)
  }, []);

  const handleCloseGroupStatusSelector = useCallback(() => {
    setGroupStatusSelectorOpen(false)
  }, []);

  const listRef = useRef();

  const handleSetGroupCategory = useCallback((groupCategory) => {
    setGroupCategory(groupCategory);
    setGroupCategorySelectorOpen(false);
    if (listRef?.current) {
      listRef.current.scrollToOffset(0);
    }
  }, [listRef.current]);

  const handleClearGroupCategory = useCallback(() => {
    handleSetGroupCategory(null);
    if (listRef?.current) {
      listRef.current.scrollToOffset(0);
    }
  }, [listRef.current]);

  const renderCategoryButton = useCallback(() => (
    <CancellableButton
      size="tiny"
      hasValue={!!groupCategory}
      onPress={handleOpenGroupCategorySelector}
      onClear={handleClearGroupCategory}
      label={groupCategory ? groupCategory.label : "Category"}
      style={[styles.button, styles.firstButton]}
    />
  ), [handleOpenGroupCategorySelector, groupCategory]);


  const handleSetGroupStatus = useCallback((groupStatus) => {
    setGroupStatus(groupStatus);
    setGroupStatusSelectorOpen(false);
    if (listRef?.current) {
      listRef.current.scrollToOffset(0);
    }
  }, [listRef.current]);

  const handleClearGroupStatus = useCallback(() => {
    handleSetGroupStatus(null);
    if (listRef?.current) {
      listRef.current.scrollToOffset(0);
    }
  }, [listRef.current]);


  const handleClearMatchString = useCallback(() => {
    setMatchString("");
    Keyboard.dismiss();
  }, [setMatchString]);

  const renderStatusButton = useCallback(() => (
    <CancellableButton
      size="tiny"
      hasValue={groupStatus}
      onPress={handleOpenGroupStatusSelector}
      onClear={handleClearGroupStatus}
      label={groupStatus ? GROUP_STATUSES[groupStatus].label : "Status"}
      style={[styles.button]}
    />
  ), [handleOpenGroupStatusSelector, groupStatus]);

  return (
    <>
      <ResponsiveLayout grow={false} background="background-basic-color-1">
        <SearchBar
          value={matchString}
          onChangeText={setMatchString}
          onClear={handleClearMatchString}
          placeholder="Search groups"
          accessoryLeft={() => (
            <>
              <ThemedOverflowMenu
                anchor={renderCategoryButton}
                visible={groupCategorySelectorOpen}
                onBackdropPress={handleCloseGroupCategorySelector}
                placement="bottom"
              >
                {
                  groupCategories.map((groupCategory) => (
                    <MenuItem
                      key={groupCategory.id}
                      title={groupCategory.label}
                      onPress={() => handleSetGroupCategory(groupCategory)}
                    />
                  ))
                }
              </ThemedOverflowMenu>
              <ThemedOverflowMenu
                anchor={renderStatusButton}
                visible={groupStatusSelectorOpen}
                onBackdropPress={handleCloseGroupStatusSelector}
                placement="bottom"
              >
                {
                  Object.entries(GROUP_STATUSES).map(([ groupStatus, { label }]) => (
                    <MenuItem
                      key={groupStatus}
                      title={label}
                      onPress={() => handleSetGroupStatus(groupStatus)}
                    />
                  ))
                }
              </ThemedOverflowMenu>
            </>
          )}
        />
      </ResponsiveLayout>
      <Divider style={styles.divider} />
      <ResponsiveList
        ref={listRef}
        initialNumToRender={20}
        getItemLayout={getItemLayout}
        data={filteredGroups}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 4,
    maxWidth: '40%'
  },
  divider: {
    marginTop: 5,
  },
  firstButton: {
    marginLeft: 0,
  },
  contentContainer: {
    paddingBottom: 51,
  }
})

export default React.memo(Groups);