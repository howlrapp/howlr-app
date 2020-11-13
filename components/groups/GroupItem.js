import React, { useCallback, useMemo } from 'react';
import { ListItem, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import useViewer from '../../hooks/useViewer';
import useApp from '../../hooks/useApp';
import useUpdateViewer from '../../hooks/useUpdateViewer';

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
  }, [updateViewer, group.id, groupIds])

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
