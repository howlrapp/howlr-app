import { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';

import useViewer from './useViewer';
import useApp from './useApp';
import useJoinGroup from './useJoinGroup';
import useLeaveGroup from './useLeaveGroup';

const useToggleGroup = ({ group }) => {
  const { maximumJoinedGroupsCount } = useApp();
  const viewer = useViewer();

  const groupLimitReached = viewer.groupIds.length >= maximumJoinedGroupsCount;

  const [ joinGroup, { loading: joinLoading } ] = useJoinGroup();
  const join = useCallback(() => {
    if (groupLimitReached) {
      Alert.alert(
        `Unauthorized`,
        `You can only join up to ${maximumJoinedGroupsCount} groups.`,
      );
      return;
    }

    return (
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
      })
    );
  }, [groupLimitReached, group.id])

  const [ leaveGroup, { loading: leaveLoading } ] = useLeaveGroup();
  const leave = useCallback(() => (
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
            groupIds(groupIds) {
              return (
                groupIds.filter((groupId) => groupId !== leaveGroup.group.id)
              )
            }
          }
        })
      }
    })
  ), [group.id]);

  const joined = useMemo(() => (
    viewer.groupIds.includes(group.id)
  ), [viewer.groupIds, group.id]);

  return ({
    join,
    leave,
    joined,
    leaveLoading,
    joinLoading
  })
}

export default useToggleGroup;
