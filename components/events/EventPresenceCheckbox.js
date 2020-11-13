import React, { useCallback, useMemo } from 'react';
import {
  Text,
  CheckBox,
} from '@ui-kitten/components';
import { StyleSheet, Alert } from 'react-native';

import useViewer from '../../hooks/useViewer';
import useJoinEvent from '../../hooks/useJoinEvent';
import useLeaveEvent from '../../hooks/useLeaveEvent';

import { GET_VIEWER } from '../../hooks/useGetViewer';

const EventPresenceCheckbox = ({ event }) => {
  const viewer = useViewer();

  const joined = useMemo(() => (
    event.users.some(({ id }) => id === viewer.id)
  ), [event, viewer.id])

  const [ joinEvent, { loading: joinEventLoading } ] = useJoinEvent();
  const [ leaveEvent, { loading: leaveEventLoading } ] = useLeaveEvent();

  const handleGoingChange = useCallback((checked) => {
    if (checked) {
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
    } else {
      leaveEvent({
        variables: {
          input: { eventId: event.id }
        },
        awaitRefetchQueries: true,
        refetchQueries: [
          { query: GET_VIEWER }
        ],
      });
    }
  }, []);

  return (
    <CheckBox
      style={styles.checkbox}
      onChange={handleGoingChange}
      checked={joined}
      disabled={joinEventLoading || leaveEventLoading}
    >
      {
        (props) => <Text {...props}>Going</Text>
      }
    </CheckBox>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: "row-reverse"
  },
})

export default React.memo(EventPresenceCheckbox);
