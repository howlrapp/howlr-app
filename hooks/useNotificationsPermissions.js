import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

import useUpdateSession from './useUpdateSession';
import useSession from './useSession';

const useNotificationsPermissions = () => {
  const [ updateSession ] = useUpdateSession();
  const session = useSession();

  useEffect(() => {
    if (!session) {
      return ;
    }

    const requestPermissionAndSetToken = async () => {
      const settings = await Notifications.requestPermissionsAsync();
      if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED) {
        const expoToken = await Notifications.getExpoPushTokenAsync();

        if (expoToken?.data && session.expoToken !== expoToken.data) {
          updateSession({
            variables: {
              input: { expoToken: expoToken.data }
            }
          });
        }
      }
    }
    requestPermissionAndSetToken();
  }, [updateSession, session]);
}

export default useNotificationsPermissions;
