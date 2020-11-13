import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

const useHandleLikeNotifications = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('like', {
        name: 'Received likes',
        sound: true,
      });
    }
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(({ notification }) => {
      if (notification?.request?.content?.data?.type === 'like:created') {
        navigation.navigate("LikesRouter", { screen: 'ReceivedLikes' });
      }
    });
  return () => subscription.remove();
  }, [navigation]);
}

export default useHandleLikeNotifications;
