import React, { useMemo, useCallback } from 'react';
import { Platform, Alert } from 'react-native';

import * as Notifications from 'expo-notifications';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Linking from 'expo-linking';
import Constants from 'expo-constants';

import useViewer from '../../hooks/useViewer';
import useApp from '../../hooks/useApp';
import useUpdateViewer from '../../hooks/useUpdateViewer';

import MenuItemFormMultipleChoice from '../MenuItemFormMultipleChoice';

const DATA = [
  { value: "allow_chat_notification",              label: "Chat requests"                },
  { value: "allow_message_notification",           label: "Messages"                     },
  { value: "allow_like_notification",              label: "Likes"                        },
  { value: "allow_event_created_notification",     label: "Events"                       },
  { value: "allow_event_joiend_notification",      label: "Event participants"           },
];

const NotificationForm = (props) => {
  const { name } = useApp();
  const viewer = useViewer();
  const [ updateViewer, { loading } ] = useUpdateViewer();

  const initialValue = useMemo(() => {
    let initialValue = [];

    if (viewer.allowChatNotification)
      initialValue.push("allow_chat_notification")

    if (viewer.allowMessageNotification)
      initialValue.push("allow_message_notification")

    if (viewer.allowLikeNotification)
      initialValue.push("allow_like_notification")

    if (viewer.allowEventCreatedNotification)
      initialValue.push("allow_event_created_notification")

    if (viewer.allowEventJoinedNotification)
      initialValue.push("allow_event_joiend_notification")


    return (initialValue);
  }, [
    viewer.allowChatNotification,
    viewer.allowMessageNotification,
    viewer.allowLikeNotification,
    viewer.allowEventCreatedNotification,
    viewer.allowEventJoinedNotification,
  ])

  const handleSave = useCallback((value) => (
    updateViewer({
      variables: {
        input: {
          allowChatNotification: value.includes("allow_chat_notification"),
          allowMessageNotification: value.includes("allow_message_notification"),
          allowLikeNotification: value.includes("allow_like_notification"),
          allowEventCreatedNotification: value.includes("allow_event_created_notification"),
          allowEventJoinedNotification: value.includes("allow_event_joiend_notification"),
        }
      }
    })
  ), [updateViewer]);

  const handleOpen = async () => {
    const permissionSettings = await Notifications.getPermissionsAsync();
    const notificationsEnabled = permissionSettings.granted || permissionSettings.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED;

    if (!notificationsEnabled) {
      Alert.alert(
        "Permission denied",
        `You can enable notifications by changing ${name}'s permissions in your phone's Setting.`,
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Change settings',
            onPress: () => {
              if (Platform.OS === 'android') {
               IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APP_NOTIFICATION_SETTINGS,   {
                  "android.provider.extra.APP_PACKAGE": Constants.manifest.android.package
                })
              }
              if (Platform.OS === 'ios') {
                Linking.openURL("app-settings:")
              }
            }
          },
        ],
      )
      return ;
    }
  }

  return (
    <MenuItemFormMultipleChoice
      title="Notifications"
      options={DATA}
      description="We only send notifications for those five things but, if that's still too much for you, you can disable them."
      initialValue={initialValue}
      onOpen={handleOpen}
      onSave={handleSave}
      loading={loading}
      {...props}
    />
  );
}

export default React.memo(NotificationForm);
