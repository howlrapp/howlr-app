import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import useSetUsersSearchCriteria from '../../hooks/useSetUsersSearchCriteria';
import useGetUserSummaries from '../../hooks/useGetUserSummaries';

import { DEFAULT_USERS_SEARCH_CRITERIA } from '../../graphql/apolloClient';
import FormModal from '../FormModal';
import EventAttendeesList from './EventAttendeesList';

const EventUsersModal = ({
  event,
  open,
  onClose,
  ...props
}) => {
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
    onClose();
    navigation.navigate("Users");
  }, [event, navigation, setUsersSearchCriteria, onClose]);

  const { data: usersData, loading } = useGetUserSummaries({
    variables: {
      eventIds: [event.id]
    },
    skip: !open
  });
  const users = usersData?.viewer?.userSummaries || [];

  return (
    <FormModal
      open={open}
      saveLabel="Open in Search"
      onSave={handleGoToSearch}
      onCancel={onClose}
      {...props}
    >
      <EventAttendeesList
        event={event}
        users={users}
        loading={loading}
      />
    </FormModal>
  )
}

export default React.memo(EventUsersModal);
