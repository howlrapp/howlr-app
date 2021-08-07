import React, { useCallback, useEffect, useMemo } from 'react';
import { ListItem, Text, useTheme } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { trim } from 'lodash';
import { differenceInDays } from 'date-fns'

import useApp from '../../hooks/useApp';
import useToggleGroup from '../../hooks/useToggleGroup';
import useSetUsersSearchCriteria from '../../hooks/useSetUsersSearchCriteria';

import { DEFAULT_USERS_SEARCH_CRITERIA } from '../../graphql/apolloClient';
import useResponsiveActionSheet from '../../hooks/useResponsiveActionSheet';

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
  } = useToggleGroup({ group });

  const showActionSheetWithOptions = useResponsiveActionSheet();
  const [ setUsersSearchCriteria ] = useSetUsersSearchCriteria();
  const navigation = useNavigation();
  const handleOpenGroupMenu = useCallback(() => {
    showActionSheetWithOptions(
      {
        options: [joined ? 'Leave group' : 'Join group', 'Open in Search', 'Cancel'],
        cancelButtonIndex: 2,
        destructiveButtonIndex: joined ? 0 : undefined,
        title: group.name,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          if (joined) {
            handleLeave()
          } else {
            handleJoin();
          }
        }
        if (buttonIndex === 1) {
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
  }, [
    group,
    showActionSheetWithOptions,
    setUsersSearchCriteria,
    navigation,
    joined,
    handleLeave,
    handleJoin
  ]);

  const renderJoined = useCallback(() => {
    if (joined) {
      return (
        <Text category="label" appearance="hint">JOINED</Text>
      )
    }
    return (null);
  }, [joined]);

  const groupDescription = useMemo(() => (
    `${groupCategoryLabel} - ${usersCountString(group.usersCount)}`
  ), [groupCategoryLabel, group.usersCount]);

  const theme = useTheme();

  const renderTitle = useCallback(({ style }) => {
    return (
      <View
        style={styles.title}
      >
        <Text style={style}>
          {trim(group.name)}
        </Text>
        {
          differenceInDays(new Date(), new Date(group.createdAt)) < 100 && (
            <View style={[ styles.newBadge, { backgroundColor: theme['color-danger-focus'] } ]}>
              <Text category="label" appearance='alternative'>
                NEW
              </Text>
            </View>
          )
        }
      </View>
    )
  }, [theme]);

  return (
    <ListItem
      onPress={handleOpenGroupMenu}
      title={renderTitle}
      description={groupDescription}
      accessoryRight={renderJoined}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: 70,
  },
  newBadge: {
    paddingHorizontal: 4,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})

export default React.memo(GroupItem);
