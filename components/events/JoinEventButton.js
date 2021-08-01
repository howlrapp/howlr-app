import React, { useCallback, useMemo } from 'react';
import {
  Button,
} from '@ui-kitten/components';
import { StyleSheet, Alert } from 'react-native';

import useViewer from '../../hooks/useViewer';
import useJoinEvent from '../../hooks/useJoinEvent';
import useLeaveEvent from '../../hooks/useLeaveEvent';

import { GET_VIEWER } from '../../hooks/useGetViewer';

const JoinEventButton = ({ event, style }) => {
  const { eventsAsParticipant } = useViewer();
  const joined = useMemo(() => (
    eventsAsParticipant.some(({ id }) => id === event.id)
  ), [eventsAsParticipant, event]);

  const [ joinEvent, { loading: joinEventLoading } ] = useJoinEvent();
  const [ leaveEvent, { loading: leaveEventLoading } ] = useLeaveEvent();

  const handleJoin = useCallback(() => {
    Alert.alert(
      'About Covid 19',
      "Always follow your local social distancing rules. Do not go if it is not allowed for you or if it isn't safe for you and your entourage.",
      [
        {
          text: "I'm not going",
          style: 'cancel'
        },
        {
          text: "I'm going",
          onPress: () => {
            joinEvent({
              variables: {
                input: { eventId: event.id }
              },
              awaitRefetchQueries: true,
              refetchQueries: [
                { query: GET_VIEWER }
              ],
            });
          }
        },
      ],
      { cancelable: true }
    );
  }, [event.id, joinEvent]);

  const handleLeave = useCallback(() => {
    leaveEvent({
      variables: {
        input: { eventId: event.id }
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: GET_VIEWER }
      ],
    });
  }, [event.id, leaveEvent])

  if (joined) {
    return (
      <Button
        style={style}
        onPress={handleLeave}
        disabled={leaveEventLoading}
        status="danger"
        appearance="outline"
      >
        Leave event
      </Button>
    );
  }

  return (
    <Button
      style={style}
      onPress={handleJoin}
      disabled={joinEventLoading}
    >
      Join event
    </Button>
  );
}

const styles = StyleSheet.create({
})

export default React.memo(JoinEventButton);
