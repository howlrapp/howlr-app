import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

const DEFAULT_NOTIFICATIONS_BEHAVIOR = {
  shouldShowAlert: true,
  shouldPlaySound: false,
  shouldSetBadge: false,
}

const IN_CHAT_NOTIFICATIONS_BEHAVIOR = {
  shouldShowAlert: false,
  shouldPlaySound: false,
  shouldSetBadge: false,
}

const usePreventMessageNotifications = (chatId) => {

  useEffect(() => {

    Notifications.setNotificationHandler({
      handleNotification: async (notification) => {
        const type = notification?.request?.content?.data?.type;
        const notificationChatId = notification?.request?.content?.data?.chat_id;

        if (type === 'message:created' && notificationChatId === chatId) {
          return (IN_CHAT_NOTIFICATIONS_BEHAVIOR);
        }
        return (DEFAULT_NOTIFICATIONS_BEHAVIOR);
      }
    });

    return(() => {
      Notifications.setNotificationHandler({
        handleNotification: async () => DEFAULT_NOTIFICATIONS_BEHAVIOR
      });
    })
  }, [chatId]);
}

export default usePreventMessageNotifications;
