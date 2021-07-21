import React, { useMemo, useCallback } from 'react';
import { Card, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet'
import { showMessage } from "react-native-flash-message";

import useApp from '../../hooks/useApp';
import useToggleGroup from '../../hooks/useToggleGroup';

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

  const { showActionSheetWithOptions } = useActionSheet();

  const handleToggleGroup = useCallback(() => {
    showActionSheetWithOptions(
      {
        options: [joined ? "Leave group" : "Join group", 'Cancel'],
        cancelButtonIndex: 1,
        title: group.name,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          if (joined) {
            await leave();
            showMessage({
              message: "Removed from Common groups",
            });
          } else {
            await join();
            showMessage({
              message: "Added to Common groups",
            });
          }
        }
      }
    )
  }, [ showActionSheetWithOptions, join, leave, joined, group.id, group.name ])

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
