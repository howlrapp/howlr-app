import React, { useCallback, useMemo } from 'react';
import { ListItem, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useActionSheet } from '@expo/react-native-action-sheet'

import useViewer from '../../hooks/useViewer';
import useApp from '../../hooks/useApp';
import useUpdateViewer from '../../hooks/useUpdateViewer';
import useSetUsersSearchCriteria from '../../hooks/useSetUsersSearchCriteria';

import { DEFAULT_USERS_SEARCH_CRITERIA } from '../../graphql/apolloClient';

const usersCountString = (usersCount) => {
  if (usersCount == 0) {
    return ("no members");
  } else if (usersCount == 1) {
    return ("one member");
  } else {
    return (`${usersCount} members`);
  }
}

const GroupItem = ({ group }) => {
  const { groupIds } = useViewer();
  const { groupCategories } = useApp();

  const [ updateViewer, { loading } ] = useUpdateViewer();

  const groupCategory = useMemo(() => (
    groupCategories.find(({ id }) => group.groupCategoryId === id)
  ), [group.groupCategoryId, groupCategories]);

  const groupCategoryLabel = useMemo(() => (
    groupCategory?.label?.replace(/s$/, '').toUpperCase()
  ), [groupCategory])

  const handleJoin = useCallback(() => {
    updateViewer({
      variables: {
        input: {
          groupIds: [...groupIds, group.id]
        }
      }
    });
  }, [updateViewer, group.id, groupIds])

   const handleLeave = useCallback(() => {
    updateViewer({
      variables: {
        input: {
          groupIds: groupIds.filter((otherId) => group.id != otherId)
        }
      }
    })
  }, [updateViewer, group.id, groupIds]);

  const { showActionSheetWithOptions } = useActionSheet();
  const [ setUsersSearchCriteria ] = useSetUsersSearchCriteria();
  const navigation = useNavigation();
  const handleOpenGroupMenu = useCallback(() => {
    showActionSheetWithOptions(
      {
        options: ['See members', 'Cancel'],
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
    if (groupIds.includes(group.id)) {
      return (
        <Button
          size="tiny"
          appearance="outline"
          status="basic"
          onPress={handleLeave}
          disabled={loading}
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
          disabled={loading}
          style={styles.button}
          status="warning"
          appearance="outline"
        >
          JOIN
        </Button>
      );
    }
  }, [groupIds, group.id, loading]);

  return (
    <ListItem
      onPress={handleOpenGroupMenu}
      title={group.name}
      description={`${groupCategoryLabel} - ${usersCountString(group.usersCount)}`}
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
