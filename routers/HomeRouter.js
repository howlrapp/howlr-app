import React, { useMemo, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Text, useTheme } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { Host } from 'react-native-portalize';
import * as Notifications from 'expo-notifications';

import useChats from '../hooks/useChats';
import useHandleLikeNotifications from '../hooks/useHandleLikeNotifications';
import useHandleChatNotifications from '../hooks/useHandleChatNotifications';
import useHandleMessageNotifications from '../hooks/useHandleMessageNotifications';
import useHandleEventNotifications from '../hooks/useHandleEventNotifications';

import useNotificationsPermissions from '../hooks/useNotificationsPermissions';
import useSaveSessionInfo from '../hooks/useSaveSessionInfo';

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
    Notifications.setBadgeCountAsync(unreadChats.length);
  }, [unreadChats.length])

  useNotificationsPermissions();
  useSaveSessionInfo();

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
            icon={(props) => <Icon {...props} name='search' />}
          />
          <BottomNavigationTab
            title={withTitle && 'Events'}
            icon={(props) => <Icon {...props} name='calendar' />}
          />
          <BottomNavigationTab
            title={withTitle && 'Likes'}
            icon={(props) => <Icon {...props} name='heart' />}
          />
          <BottomNavigationTab
            title={withTitle && 'Groups'}
            icon={(props) => <Icon {...props} name='people' />}
          />
          <BottomNavigationTab
            title={(props) => (
              withTitle && (
                <>
                  <Text {...props}>Chats</Text>
                  {
                    unreadChats.length > 0 && (
                      <View
                        style={styles.badgeContainer}
                      >
                        <View
                          style={[ styles.badge, { backgroundColor: theme['color-danger-500'], borderColor: theme['background-basic-color-1'] } ]}
                        />
                      </View>
                    )
                  }
                </>
              )
           )}
            icon={(props) => <Icon {...props} name={'message-circle'} />}
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

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    alignSelf: 'center',
    top: 1,
    paddingLeft: 18,
  },
  badge: {
    alignSelf: 'center',
    width: 12,
    height: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
  }
})

export default React.memo(HomeRouter);
