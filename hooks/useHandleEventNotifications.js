import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

const useHandleEventNotifications = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('event', {
        name: 'Events notifications',
        sound: true,
      });
    }
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(({ notification }) => {
      if (notification?.request?.content?.data?.type === 'event:created') {
        navigation.navigate("EventsRouter", { screen: 'AllEvents' });
      }
      if (notification?.request?.content?.data?.type === 'event:joined') {
        navigation.navigate("EventsRouter", { screen: 'MyEvents' });
      }    });
  return () => subscription.remove();
  }, [navigation]);
}

export default useHandleEventNotifications;
