import React, { useCallback, useMemo } from 'react';
import { ListItem, Button } from '@ui-kitten/components';
import { StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useActionSheet } from '@expo/react-native-action-sheet'

import useApp from '../../hooks/useApp';
import useToggleGroup from '../../hooks/useToggleGroup';
import useSetUsersSearchCriteria from '../../hooks/useSetUsersSearchCriteria';

import { DEFAULT_USERS_SEARCH_CRITERIA } from '../../graphql/apolloClient';

export const usersCountString = (usersCount) => {
  if (usersCount == 0) {
    return ("no members");
  } else if (usersCount == 1) {
    return ("one member");
  } else {
    return (`${usersCount} members`);
  }
}

const GroupItem = ({ group }) => {
  const { groupCategories } = useApp();

  const groupCategory = useMemo(() => (
    groupCategories.find(({ id }) => group.groupCategoryId === id)
  ), [group.groupCategoryId, groupCategories]);

  const groupCategoryLabel = useMemo(() => (
    groupCategory?.label?.replace(/s$/, '').toUpperCase()
  ), [groupCategory])

  const {
    join: handleJoin,
    leave: handleLeave,
    joined,
    leaveLoading,
    joinLoading
  } = useToggleGroup({ group });

  const { showActionSheetWithOptions } = useActionSheet();
  const [ setUsersSearchCriteria ] = useSetUsersSearchCriteria();
  const navigation = useNavigation();
  const handleOpenGroupMenu = useCallback(() => {
    showActionSheetWithOptions(
      {
        options: ['Open in Search', 'Cancel'],
        cancelButtonIndex: 1,
        title: group.name,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          await setUsersSearchCriteria({
            variables: {
              usersSearchCriteria: {
                ...DEFAULT_USERS_SEARCH_CRITERIA,
                groupIds: [group.id]
              }
            }
          });
          navigation.navigate("Users");
        }
      }
    )
  }, [group, showActionSheetWithOptions, setUsersSearchCriteria, navigation]);

  const renderAction = useCallback(() => {
    if (joined) {
      return (
        <Button
          size="tiny"
          appearance="outline"
          status="basic"
          onPress={handleLeave}
          disabled={leaveLoading}
          style={styles.button}
        >
          LEAVE
        </Button>
      );
    } else {
      return (
        <Button
          size="tiny"
          onPress={handleJoin}
          disabled={joinLoading}
          style={styles.button}
          status="warning"
          appearance="outline"
        >
          JOIN
        </Button>
      );
    }
  }, [handleLeave, handleJoin, joined, leaveLoading, joinLoading]);

  const groupDescription = useMemo(() => (
    `${groupCategoryLabel} - ${usersCountString(group.usersCount)}`
  ), [groupCategoryLabel, group.usersCount]);

  return (
    <ListItem
      onPress={handleOpenGroupMenu}
      title={group.name}
      description={groupDescription}
      accessoryRight={renderAction}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: 70,
  }
})

export default React.memo(GroupItem);
