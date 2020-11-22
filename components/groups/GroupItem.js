import React, { useCallback, useMemo } from 'react';
import { ListItem, Button } from '@ui-kitten/components';
import { StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useActionSheet } from '@expo/react-native-action-sheet'

import useViewer from '../../hooks/useViewer';
import { GET_VIEWER } from '../../hooks/useGetViewer';
import useApp from '../../hooks/useApp';
import useJoinGroup from '../../hooks/useJoinGroup';
import useLeaveGroup from '../../hooks/useLeaveGroup';
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
  const viewer = useViewer();
  const { groupCategories, maximumJoinedGroupsCount } = useApp();

  const groupCategory = useMemo(() => (
    groupCategories.find(({ id }) => group.groupCategoryId === id)
  ), [group.groupCategoryId, groupCategories]);

  const groupCategoryLabel = useMemo(() => (
    groupCategory?.label?.replace(/s$/, '').toUpperCase()
  ), [groupCategory])

  const groupLimitReached = viewer.groupIds.length >= maximumJoinedGroupsCount;

  const [ joinGroup, { loading: joinGroupLoading } ] = useJoinGroup();
  const handleJoin = useCallback(() => {
    if (groupLimitReached) {
      Alert.alert(
        `Unauthorized`,
        `You can only join up to ${maximumJoinedGroupsCount} groups.`,
      );
      return;
    }

    joinGroup({
      variables: {
        input: {
          groupId: group.id
        }
      },
      update: (cache, { data: { joinGroup } }) => {
        cache.modify({
          id: cache.identify(viewer),
          fields: {
            groupIds(groupIds) {
              return (
                [ ...groupIds, joinGroup.group.id ]
              )
            }
          }
        })
      }
    });
  }, [groupLimitReached, group.id])

  const [ leaveGroup, { loading: leaveGroupLoading } ] = useLeaveGroup();
   const handleLeave = useCallback(() => {
    leaveGroup({
      variables: {
        input: {
          groupId: group.id
        }
      },
      update: (cache, { data: { leaveGroup } }) => {
        cache.modify({
          id: cache.identify(viewer),
          fields: {
            groupIds(groupIds, { readField }) {
              return (
                groupIds.filter((groupId) => groupId !== leaveGroup.group.id)
              )
            }
          }
        })
      }
    })
  }, [group.id]);

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

  const joined = useMemo(() => (
    viewer.groupIds.includes(group.id)
  ), [viewer.groupIds, group.id]);

  const renderAction = useCallback(() => {
    if (joined) {
      return (
        <Button
          size="tiny"
          appearance="outline"
          status="basic"
          onPress={handleLeave}
          disabled={leaveGroupLoading}
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
          disabled={joinGroupLoading}
          style={styles.button}
          status="warning"
          appearance="outline"
        >
          JOIN
        </Button>
      );
    }
  }, [handleLeave, handleJoin, joined, leaveGroupLoading, joinGroupLoading]);

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
