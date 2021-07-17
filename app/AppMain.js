import React, { useEffect, useMemo, useState } from 'react';
import { AppState } from 'react-native';

import {
  ActionSheetProvider,
} from '@expo/react-native-action-sheet';
import * as Notifications from 'expo-notifications';

import { createStackNavigator } from '@react-navigation/stack';
import { Host } from 'react-native-portalize';
import { StatusBar } from 'expo-status-bar';

import HomeRouter from '../routers/HomeRouter';
import ProfileRouter from '../routers/ProfileRouter';

import Settings from '../screens/Settings';
import User from '../screens/User';
import Chat from '../screens/Chat';
import TermsAndConditions from '../screens/TermsAndConditions';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Changelog from '../screens/Changelog';
import Faq from '../screens/Faq';

import useGetViewer from '../hooks/useGetViewer';
import useGetLikes from '../hooks/useGetLikes';
import useGetChats from '../hooks/useGetChats';
import useGetEvents from '../hooks/useGetEvents';
import useGetSession from '../hooks/useGetSession';

import { ViewerContext } from '../hooks/useViewer';
import { ReceivedLikesContext } from '../hooks/useReceivedLikes';
import { SentLikesContext } from '../hooks/useSentLikes';
import { ChatsContext } from '../hooks/useChats';
import { EventsContext } from '../hooks/useEvents';

import { SessionContext } from '../hooks/useSession';

import { SentLikesUserIdsContext } from '../hooks/useSentLikesUserIds';
import { ReceivedLikesUserIdsContext } from '../hooks/useReceivedLikesUserIds';

import useDeleteToken from '../hooks/useDeleteToken';

import useActionCableChannel from '../hooks/useActionCableChannel';

import ErrorBoundary from '../components/ErrorBoundary';
import EmptyList from '../components/EmptyList';
import ProgressBar from '../components/ProgressBar';
import useDebouncedColorScheme from '../hooks/useDebouncedColorScheme';

const DEFAULT_NOTIFICATIONS_BEHAVIOR = {
  shouldShowAlert: true,
  shouldPlaySound: false,
  shouldSetBadge: false,
}

Notifications.setNotificationHandler({
  handleNotification: async () => DEFAULT_NOTIFICATIONS_BEHAVIOR
});

const MainNavigator = createStackNavigator();

const AppMain = () => {
  const [ allLoaded, setAllLoaded ] = useState(false);

  const {
     data: viewerData,
     loading: viewerLoading,
     refetch: refetchViewer,
     error: viewerError,
  } = useGetViewer();

  const {
     data: likesData,
     loading: likesLoading,
     refetch: refetchLikes,
     error: likesError,
  } = useGetLikes();

  const {
     data: chatsData,
     loading: chatsLoading,
     refetch: refetchChats,
     error: chatsError
  } = useGetChats();

  const {
     data: eventsData,
     loading: eventsLoading,
     refetch: refetchEvents,
     error: eventsError
  } = useGetEvents();

  const {
     data: sessionData,
     loading: sessionLoading,
     error: sessionError
  } = useGetSession();

  const loading = sessionLoading || viewerLoading || likesLoading || chatsLoading || eventsLoading;
  const error = sessionError || viewerError || likesError || chatsError || eventsError;

  useEffect(() => {
    if (!loading && !error) {
      setAllLoaded(true);
    }
  }, [loading]);

  // reload viewer when app becomes active
  useEffect(() => {
    const onAppStageChange = (state) => {
      if (state === 'active') {
        refetchViewer();
      }
    }
    AppState.addEventListener('change', onAppStageChange);

    return () => {
      AppState.removeEventListener('change', onAppStageChange);
    }
  })

  // if we get a non authorized on session loading
  // we clear the token
  const [ deleteToken ] = useDeleteToken();
  useEffect(() => {
    if (sessionError && !!sessionError.toString().match(/Not authorized/)) {
      deleteToken();
    }
  }, [sessionError])

  // reload chat on chat update
  const { data: chatChannelData } = useActionCableChannel({
    channel: "ChatChannel"
  });
  useEffect(() => {
    if (chatChannelData?.action === 'updated') {
      refetchChats();
    }
  }, [chatChannelData]);

  // reload like onlike update
  const { data: likeChannelData } = useActionCableChannel({
    channel: "LikeChannel"
  });
  useEffect(() => {
    if (likeChannelData?.action === 'updated') {
      refetchLikes();
      refetchEvents();
    }
  }, [likeChannelData]);

  // reload event onlike update
  const { data: eventChannelData } = useActionCableChannel({
    channel: "EventChannel"
  });
  useEffect(() => {
    if (eventChannelData?.action === 'updated') {
      refetchEvents();
      refetchViewer();
    }
  }, [eventChannelData]);

  // refetch events on viewer change
  useEffect(() => { refetchEvents() }, [viewerData?.viewer]);

  const sentLikesUserIds = useMemo(() => {
    if (!likesData?.viewer?.sentLikes) {
      return ([]);
    }

    return (
      likesData.viewer.sentLikes
        .map((like) => like.user.id)
        .reduce((sentLikesUserIds, id) => ( sentLikesUserIds[id] = true, sentLikesUserIds ), {})
    );
  }, [likesData]);

  const receivedLikesUserIds = useMemo(() => {
    if (!likesData?.viewer?.receivedLikes) {
      return ([]);
    }

    return (
      likesData.viewer.receivedLikes
        .map((like) => like.user.id)
        .reduce((receivedLikesUserIds, id) => ( receivedLikesUserIds[id] = true, receivedLikesUserIds ), {})
    );
  }, [likesData]);

  const colorScheme = useDebouncedColorScheme();

  if (!allLoaded && (loading || error)) {
    return (
      <EmptyList
        title={null}
        backgroundColor='color-basic-800'
      >
        <ProgressBar
          steps={[
            true, true, true, // three previous steps
            !viewerLoading,
            !sessionLoading,
            !chatsLoading,
            !likesLoading,
            !eventsLoading
          ]}
        />
      </EmptyList>
    );
  }

  return (
    <SessionContext.Provider value={sessionData?.session}>
      <ViewerContext.Provider value={viewerData.viewer}>
        <ReceivedLikesContext.Provider value={likesData.viewer.receivedLikes}>
          <SentLikesContext.Provider value={likesData.viewer.sentLikes}>
            <ChatsContext.Provider value={chatsData.viewer.chats}>
              <EventsContext.Provider value={eventsData.viewer.events}>
                <SentLikesUserIdsContext.Provider value={sentLikesUserIds}>
                  <ReceivedLikesUserIdsContext.Provider value={receivedLikesUserIds}>
                    <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                    <ErrorBoundary>
                      <Host>
                        <ActionSheetProvider>
                          <>
                            <MainNavigator.Navigator
                              screenOptions={{ headerShown: false }}
                            >
                              <MainNavigator.Screen
                                name="Home"
                                component={HomeRouter}
                              />
                              <MainNavigator.Screen
                                name="Settings"
                                component={Settings}
                              />
                              <MainNavigator.Screen
                                name="User"
                                component={User}
                              />
                              <MainNavigator.Screen
                                name="Chat"
                                component={Chat}
                              />
                              <MainNavigator.Screen
                                name="ProfileRouter"
                                component={ProfileRouter}
                              />
                              <MainNavigator.Screen
                                name="PrivacyPolicy"
                                component={PrivacyPolicy}
                              />
                              <MainNavigator.Screen
                                name="TermsAndConditions"
                                component={TermsAndConditions}
                              />
                              <MainNavigator.Screen
                                name="Changelog"
                                component={Changelog}
                              />
                              <MainNavigator.Screen
                                name="Faq"
                                component={Faq}
                              />
                            </MainNavigator.Navigator>
                          </>
                        </ActionSheetProvider>
                      </Host>
                    </ErrorBoundary>
                  </ReceivedLikesUserIdsContext.Provider>
                </SentLikesUserIdsContext.Provider>
              </EventsContext.Provider>
            </ChatsContext.Provider>
          </SentLikesContext.Provider>
        </ReceivedLikesContext.Provider>
      </ViewerContext.Provider>
    </SessionContext.Provider>
  );
}

export default AppMain;
