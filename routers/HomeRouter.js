import React, { useMemo, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, useTheme } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Host } from 'react-native-portalize';
import * as Notifications from 'expo-notifications';

import useChats from '../hooks/useChats';
import useHandleLikeNotifications from '../hooks/useHandleLikeNotifications';
import useHandleChatNotifications from '../hooks/useHandleChatNotifications';
import useHandleMessageNotifications from '../hooks/useHandleMessageNotifications';
import useHandleEventNotifications from '../hooks/useHandleEventNotifications';

import useNotificationsPermissions from '../hooks/useNotificationsPermissions';
import useSaveVersion from '../hooks/useSaveVersion';

import UsersRouter from './UsersRouter';
import EventsRouter from './EventsRouter';
import LikesRouter from './LikesRouter';
import GroupsRouter from './GroupsRouter.js';
import ContactsRouter from './ContactsRouter.js';
import ResponsiveLayout from '../components/ResponsiveLayout';

const BottomTabBar = ({ navigation, state, withTitle }) => {
  const { bottom } = useSafeAreaInsets();

  const theme = useTheme();

  const chats = useChats();
  const unreadChats = useMemo(() => (
    chats.filter(({ unread }) => unread)
  ), [chats])

  useEffect(() => {
    if (unreadChats.length > 0) {
      Notifications.setBadgeCountAsync(unreadChats.length);
    }
  }, [unreadChats.length])

  useNotificationsPermissions();
  useSaveVersion();

  useHandleLikeNotifications();
  useHandleChatNotifications();
  useHandleMessageNotifications();
  useHandleEventNotifications();

  return (
    <ResponsiveLayout grow={false} background="background-basic-color-1">
      <View
        style={{ paddingBottom: bottom, backgroundColor: theme['background-basic-color-1'] }}
      >
        <BottomNavigation
          selectedIndex={state.index}
          onSelect={index => navigation.navigate(state.routeNames[index])}
        >
          <BottomNavigationTab
            title={withTitle && 'Search'}
            icon={(props) => <Icon {...props} name='search-outline' />}
          />
          <BottomNavigationTab
            title={withTitle && 'Events'}
            icon={(props) => <Icon {...props} name='calendar-outline' />}
          />
          <BottomNavigationTab
            title={withTitle && 'Likes'}
            icon={(props) => <Icon {...props} name='heart-outline' />}
          />
          <BottomNavigationTab
            title={withTitle && 'Groups'}
            icon={(props) => <Icon {...props} name='people-outline' />}
          />
          <BottomNavigationTab
            title={withTitle && 'Chats'}
            icon={(props) => <Icon {...props} name={unreadChats.length > 0 ? 'message-circle' : 'message-circle-outline'} />}
          />
        </BottomNavigation>
      </View>
    </ResponsiveLayout>
  )
};

const Tab = createBottomTabNavigator();

const HomeRouter = () => {
  return (
    <Host>
      <Tab.Navigator
        tabBar={props => <BottomTabBar {...props} withTitle={true} />}
      >
        <Tab.Screen name="UsersRouter"    component={UsersRouter}     />
        <Tab.Screen name="EventsRouter"   component={EventsRouter}    />
        <Tab.Screen name="LikesRouter"    component={LikesRouter}     />
        <Tab.Screen name="GroupsRouter"   component={GroupsRouter}    />
        <Tab.Screen name="ContactsRouter" component={ContactsRouter}  />
      </Tab.Navigator>
    </Host>
  )
}

export default React.memo(HomeRouter);
