import { useEffect } from 'react';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

import useUpdateSession from './useUpdateSession';
import useSession from './useSession';

const useSaveSessionInfo = () => {
  const [ updateSession ] = useUpdateSession();
  const session = useSession();

  useEffect(() => {
    if (!session) {
      return ;
    }

    updateSession({
      variables: {
        input: {
          version: Constants.manifest.extra.appVersion,
          device: `${Device.brand} ${Device.modelName} - ${Device.osName} ${Device.osVersion}`
        }
      }
    });
  }, [updateSession, session]);
}

export default useSaveSessionInfo;
