import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { Text, ListItem, Divider } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import ResponsiveModalize from '../ResponsiveModalize';
import UserAvatar from '../UserAvatar';
import FormTopNavigation from '../FormTopNavigation';
import useGetUserSummaries from '../../hooks/useGetUserSummaries';
import useSetUsersSearchCriteria from '../../hooks/useSetUsersSearchCriteria';

import { DEFAULT_USERS_SEARCH_CRITERIA } from '../../graphql/apolloClient';

const EventUsersModal = ({
  event,
  open,
  onClose,
  ...props
}) => {
  const navigation = useNavigation();

  const modalizeRef = useRef();

  const { data: usersData } = useGetUserSummaries({
    variables: {
      eventIds: [event.id]
    },
    skip: !open
  });
  const users = usersData?.viewer?.userSummaries || [];

  const sortedUsers = useMemo(() => (
    [event.user].concat(users.filter(({ id }) => id !== event.user.id))
  ), [event.user, users]);

  console.log(open)
  useEffect(() => {
    if (open) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [open, modalizeRef.current]);

  const handleGoToUser = useCallback((user) => {
    navigation.navigate('User', { id: user.id });
    onClose();
  }, [navigation, onClose]);

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
    onClose();
  }, [event, navigation, setUsersSearchCriteria, onClose])

  const renderItem = useCallback(({ item }) => (
    <ListItem
      style={styles.listItem}
      onPress={() => handleGoToUser(item)}
      title={(props) => (
        <View style={styles.item}>
          <Text {...props}>{item.name}</Text>
          {item.id === event.user.id ? <Text category="c1" appearance="hint">Event organizer</Text> : null}
        </View>
      )}
      accessoryLeft={({ style: { height } }) => (
        <UserAvatar user={item} size={height} />
      )}
    />
  ), [event.user.id]);

  const keyExtractor = useCallback(({ id }) => id, []);

  const { bottom, left, right } = useSafeAreaInsets();

  const ListHeaderComponent = useCallback(() => (
    <FormTopNavigation
      cancelLabel="Close"
      onCancel={onClose}
      saveLabel="Open in Search"
      onSave={handleGoToSearch}
    />
  ), [event]);

  const flatListProps = useMemo(() => ({
    data: sortedUsers,
    renderItem,
    keyExtractor,
    ListHeaderComponent,
    contentContainerStyle: {
      paddingBottom: bottom + 20,
      paddingLeft: left,
      paddingRight: right,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      overflow: 'hidden',
    }
  }), [sortedUsers, renderItem, bottom, left, right]);

  return (
    <Portal>
      <ResponsiveModalize
        ref={modalizeRef}
        withHandle={false}
        panGestureEnabled={true}
        disableScrollIfPossible={false}
        keyboardAvoidingBehavior={'padding'}
        flatListProps={flatListProps}
        onClose={onClose}
        {...props}
      />
    </Portal>
  );
}

const styles = StyleSheet.create({
  topNavigationTitle: {
    alignItems: 'center'
  },
  listItem: {
    backgroundColor: "transparent",
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    backgroundColor: 'transparent'
  },
  listHeader: {
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 10,
  }
})

export default React.memo(EventUsersModal);
