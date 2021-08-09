import React, { useMemo, useCallback } from 'react';
import { Card, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useApp from '../../hooks/useApp';
import useToggleGroup from '../../hooks/useToggleGroup';
import useSetUsersSearchCriteria from '../../hooks/useSetUsersSearchCriteria';
import useResponsiveActionSheet from '../../hooks/useResponsiveActionSheet';

import showTransactionLoader from '../../utils/showTransactionLoader';

import { DEFAULT_USERS_SEARCH_CRITERIA } from '../../graphql/apolloClient';

const UserProfileGroupsItem = ({
  group,
  style,
  cardStyle,
  editable,
  ...props
}) => {
  const { groupCategories } = useApp();

  const groupCategory = useMemo(() => (
    groupCategories.find(({ id }) => id === group.groupCategoryId)
  ), [groupCategories, group.groupCategoryId]);

  const {
    join,
    leave,
    joined,
    leaveLoading,
    joinLoading
  } = useToggleGroup({ group });

  const [ setUsersSearchCriteria ] = useSetUsersSearchCriteria();
  const navigation = useNavigation();
  const showActionSheetWithOptions = useResponsiveActionSheet();

  const handleToggleGroup = useCallback(() => {
    showActionSheetWithOptions(
      {
        options: [joined ? "Leave group" : "Join group", "Open in Search", 'Cancel'],
        destructiveButtonIndex: joined ? 0 : null,
        cancelButtonIndex: 2,
        title: group.name,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          if (joined) {
            showTransactionLoader(leave, { confirmation: "Removed from Common groups" });
          } else {
            showTransactionLoader(join, { confirmation: "Added to Common groups" });
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
    showActionSheetWithOptions,
    join,
    leave,
    joined,
    group,
    setUsersSearchCriteria,
    navigation
])

  const loading = leaveLoading || joinLoading;

  return (
    <View
      style={style}
    >
      <Card
        style={[cardStyle, { opacity: loading ? 0.6 : 1 }]}
        onPress={handleToggleGroup}
        disabled={leaveLoading || joinLoading || !editable}
        {...props}
      >
        <Text
          numberOfLines={1}
          category="c2"
          appearance="hint"
          style={styles.label}
        >
          {groupCategory.label}
        </Text>
        <Text
          numberOfLines={1}
          category="p1"
          style={styles.value}
        >
          {group.name}
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    textTransform: 'uppercase',
  },
  value: {
    marginTop: 12
  }
});

export default React.memo(UserProfileGroupsItem);
