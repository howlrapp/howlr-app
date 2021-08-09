import React, { useCallback, useState } from 'react';
import { MenuItem, TopNavigationAction, Icon } from '@ui-kitten/components';
import { Alert } from 'react-native';

import useRemoveEvent from '../../hooks/useRemoveEvent';
import useViewer from '../../hooks/useViewer';
import { GET_EVENTS } from '../../hooks/useGetEvents';
import { GET_VIEWER } from '../../hooks/useGetViewer';

import showTransactionLoader from '../../utils/showTransactionLoader';

import ThemedOverflowMenu from '../ThemedOverflowMenu';
import EventReportForm from './EventReportForm';
import EventForm from './EventForm';
import { useNavigation } from '@react-navigation/native';

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical' />
);

const EventActionsMenu = ({
  event,
}) => {
  const { id: viewerId } = useViewer();

  const [ menuOpen, setMenuOpen ] = useState(false);

  const handleOpenMenu = useCallback(() => {
    setMenuOpen(true);
  }, [setMenuOpen]);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  const [ reportFormOpen, setReportFormOpen ] = useState(false);

  const handleOpenReportForm = useCallback(() => {
    setMenuOpen(false);
    setReportFormOpen(true)
  });

  const handleCloseReportForm = useCallback(() => {
    setReportFormOpen(false);
  })

  const [ editFormOpen, setEditFormOpen ] = useState(false);

  const handleOpenEditForm = useCallback(() => {
    setMenuOpen(false);
    setEditFormOpen(true)
  });

  const handleCloseEditForm = useCallback(() => {
    setEditFormOpen(false);
  })

  const navigation = useNavigation();
  const [ removeEvent ] = useRemoveEvent();
  const handleRemoveEvent = useCallback(() => {
    setMenuOpen(false);

    Alert.alert(
      'Delete event',
      'This operation cannot be undone.',
      [
        {
          text: 'Confirm deletion',
          style: 'destructive',
          onPress: async () => {
            await showTransactionLoader(() => (
                removeEvent({
                  variables: {
                    input: { eventId: event.id }
                  },
                  awaitRefetchQueries: true,
                  refetchQueries: [
                    { query: GET_EVENTS },
                    { query: GET_VIEWER }
                  ]
                })
              )
            );
            navigation.navigate("AllEvents");
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        },
      ],
      { cancelable: true }
    );
  }, [event]);

  const renderMenuAction = useCallback(() => (
    <TopNavigationAction icon={MenuIcon} onPress={handleOpenMenu} />
  ), []);

  if (viewerId === event.user.id) {
    return (
      <>
        <ThemedOverflowMenu
          anchor={renderMenuAction}
          visible={menuOpen}
          onBackdropPress={handleCloseMenu}
          onSelect={handleCloseMenu}
        >
          <MenuItem
            title='Edit'
            onPress={handleOpenEditForm}
          />
          <MenuItem
            title='Delete event'
            onPress={handleRemoveEvent}
          />
        </ThemedOverflowMenu>
        <EventForm
          event={event}
          open={editFormOpen}
          onCancel={handleCloseEditForm}
          onSave={handleCloseEditForm}
          title="Edit event"
        />
      </>
    );
  }

  return (
    <>
      <ThemedOverflowMenu
        anchor={renderMenuAction}
        visible={menuOpen}
        onBackdropPress={handleCloseMenu}
      >
        <MenuItem
          title='Report event'
          onPress={handleOpenReportForm}
        />
      </ThemedOverflowMenu>
      <EventReportForm
        open={reportFormOpen}
        onClose={handleCloseReportForm}
        event={event}
      />
    </>
  );
}

export default React.memo(EventActionsMenu);
