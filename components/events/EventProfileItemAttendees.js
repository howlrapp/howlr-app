import React, { useCallback } from 'react';
import { useTheme, Divider, Text, Button, Icon, ListItem } from '@ui-kitten/components';

import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EventAttendeesList from './EventAttendeesList';
import useSetUsersSearchCriteria from '../../hooks/useSetUsersSearchCriteria';
import { DEFAULT_USERS_SEARCH_CRITERIA } from '../../graphql/apolloClient';
import useGetUserSummaries from '../../hooks/useGetUserSummaries';

const EventProfileItemAttendees = ({ event, ...props }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [ setUsersSearchCriteria ] = useSetUsersSearchCriteria();
  const handleGoToSearch = useCallback(async () => {
    await setUsersSearchCriteria({
      variables: {
        usersSearchCriteria: {
          ...DEFAULT_USERS_SEARCH_CRITERIA,
          eventIds: [event.id]
        }
      }
    });
    navigation.navigate("Users");
  }, [event, navigation, setUsersSearchCriteria]);

  const { data: usersData, loading } = useGetUserSummaries({
    variables: {
      ...DEFAULT_USERS_SEARCH_CRITERIA,
      eventIds: [event.id]
    }
  });
  const users = usersData?.viewer?.userSummaries || [];

  return (
    <View
      {...props}
    >
      <Divider />
      <View
        style={[ styles.content, { backgroundColor: theme['background-basic-color-1'] } ]}
      >
        <Text
          appearance="hint"
          category="label"
          style={styles.label}
        >
          {"VISIBLE USERS GOING TO THIS EVENT"}
        </Text>
        <EventAttendeesList
          event={event}
          users={users}
          loading={loading}
        />
        {
          (users.length > 0 || event.user) && (
            <Button
              appearance="outline"
              style={styles.openInSearchButton}
              onPress={handleGoToSearch}
              accessoryLeft={({ style }) => (
                <Icon name="search" style={style} />
              )}
            >
              Open in Search
            </Button>
          )
        }
      </View>
      <Divider />
    </View>

  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  openInSearchButton: {
    marginTop: 5
  },
  label: {
    marginBottom: 4,
    textTransform: 'uppercase'
  },
});

export default React.memo(EventProfileItemAttendees);
