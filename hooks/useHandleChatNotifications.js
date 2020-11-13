import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

const useHandleChatNotifications = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('chat', {
        name: 'Chat requests',
        sound: true,
      });
    }
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(({ notification }) => {
      const type = notification?.request?.content?.data?.type;

      if (type === 'chat:created' || type === 'chat:accepted') {
        navigation.navigate("Chat", { id: notification.request.content.data.id });
      }
    });
  return () => subscription.remove();
  }, [navigation]);
}

export default useHandleChatNotifications;
