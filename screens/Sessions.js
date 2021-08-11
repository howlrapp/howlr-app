import React, { useCallback, useMemo } from 'react';
import { ListItem, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { sortBy, trim } from 'lodash';

import useGetSessions, { GET_SESSIONS } from '../hooks/useGetSessions';

import InfoScreen from './InfoScreen';
import useSession from '../hooks/useSession';

import { renderInfoScreenItem } from './InfoScreen';
import useApp from '../hooks/useApp';
import useResponsiveActionSheet from '../hooks/useResponsiveActionSheet';
import useRemoveSession from '../hooks/useRemoveSession';
import showTransactionLoader from '../utils/showTransactionLoader';

const Sessions = () => {
  const { data, loading } = useGetSessions({
    fetchPolicy: "network-only"
  });

  const { name } = useApp();
  const session = useSession();

  const sessions = data?.viewer?.sessions || [];

  const sortedSessions = useMemo(() => (
    [
      session, ...(
        sortBy(
          sessions.filter(({ id }) => id !== session.id),
          ({ createdAt }) => (new Date(createdAt))
        )
      )
    ]
  ), [session, sessions]);

  const sortedSessionsPlusInfo = useMemo(() => (
    [
      {
        title: "ABOUT SESSIONS",
        body: trim(`
You can find below the list of all your sessions. ${name} will create a new session everytime you login and will remove it when you logout.

If something looks suspicious to you, do not hesitate to close the session by clicking on it and select "Delete session". Most of the time inactive sessions comes from previous installations of ${name} that were uninstalled without logging out. 
        `)
      },
      ...sortedSessions
    ]
  ), [sortedSessions]);

  const showActionSheetWithOptions = useResponsiveActionSheet();
  const [ removeSession ] = useRemoveSession();

  const handleShowOptions = useCallback((session) => {
    showActionSheetWithOptions(
      {
        options: ['Delete session', 'Cancel'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
        title: "Select action",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          showTransactionLoader(() => (
            removeSession({
              variables: {
                input: {
                  sessionId: session.id
                }
              },
              refetchQueries: [{ query: GET_SESSIONS }],
              awaitRefetchQueries: true
            })
          ));
        }
      }
    )
  }, [showActionSheetWithOptions]);

  const renderItem = useCallback(({ item }) => {
    if (!item.id) {
      return (renderInfoScreenItem({ item }));
    }

    return (
      <ListItem
        disabled={session.id === item.id}
        onPress={() => handleShowOptions(item)}
        title={item.device || "No device registered"}
        description={({ style }) => (
          <>
            <Text style={style}>
              {item.ip || "Not linked to any IP address"}
            </Text>
          </>
        )}
        accessoryRight={() => (
          session.id === item.id ? (
            <Text category="label" appearance="hint">CURRENT</Text>
           ) : (
             <Text category="c1" appearance="hint">
               {format(new Date(item.lastSeenAt || item.createdAt), "MMM. do  HH:mm")}
             </Text>
           )
        )}
      />
    );
  }, [session]);

  return (
    <InfoScreen
      title="Sessions"
      renderItem={renderItem}
      data={sortedSessionsPlusInfo}
    />
  );
}

const styles = StyleSheet.create({
})

export default React.memo(Sessions);
