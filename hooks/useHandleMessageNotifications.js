import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

const useHandleMessageNotifications = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('message', {
        name: 'Chat messages',
        sound: true,
      });
    }
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(({ notification }) => {
      if (notification?.request?.content?.data?.type === 'message:created') {
        navigation.navigate("Chat", { id: notification.request.content.data.chat_id });
      }
    });
  return () => subscription.remove();
  }, [navigation]);
}

export default useHandleMessageNotifications;
