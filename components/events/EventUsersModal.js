import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import useSetUsersSearchCriteria from '../../hooks/useSetUsersSearchCriteria';

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
  }, [event, navigation, setUsersSearchCriteria, onClose])

  return (
    <FormModal
      open={open}
      saveLabel="Open in Search"
      onSave={handleGoToSearch}
      onCancel={onClose}
      {...props}
    >
      <EventAttendeesList event={event} skip={!open || !event} />
    </FormModal>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyListMessage: {
    marginTop: 25,
    textAlign: 'center'
  }
})

export default React.memo(EventUsersModal);
