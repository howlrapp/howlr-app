import { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';

import useViewer from './useViewer';
import useApp from './useApp';
import useJoinGroup from './useJoinGroup';
import useLeaveGroup from './useLeaveGroup';
import { GET_VIEWER } from './useGetViewer';

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
        refetchQueries: [{
          query: GET_VIEWER
        }],
        awaitRefetchQueries: true
      })
    );
  }, [groupLimitReached, joinGroup, group.id])

  const [ leaveGroup, { loading: leaveLoading } ] = useLeaveGroup();
  const leave = useCallback(() => (
    leaveGroup({
      variables: {
        input: {
          groupId: group.id
        }
      },
      refetchQueries: [{
        query: GET_VIEWER
      }],
      awaitRefetchQueries: true,
    })
  ), [leaveGroup, group.id]);

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
