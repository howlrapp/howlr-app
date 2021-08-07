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
        optimisticResponse: {
          joinGroup: {
            "__typename": "JoinGroupPayload",
            group: {
              ...group,
              usersCount: group.usersCount + 1
            }
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
  }, [groupLimitReached, joinGroup, group.id, group.usersCount])

  const [ leaveGroup, { loading: leaveLoading } ] = useLeaveGroup();
  const leave = useCallback(() => (
    leaveGroup({
      variables: {
        input: {
          groupId: group.id
        }
      },
      optimisticResponse: {
        leaveGroup: {
          "__typename": "LeaveGroupPayload",
          group: {
            ...group,
            usersCount: group.usersCount - 1
          }
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
  ), [leaveGroup, group.id, group.usersCount]);

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
