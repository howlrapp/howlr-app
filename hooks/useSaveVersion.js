import { useEffect } from 'react';
import Constants from 'expo-constants';

import useUpdateSession from './useUpdateSession';
import useSession from './useSession';

const useSaveVersion = () => {
  const [ updateSession ] = useUpdateSession();
  const session = useSession();

  useEffect(() => {
    if (!session) {
      return ;
    }

    if (Constants.manifest.extra.appVersion !== session.version) {
      updateSession({
        variables: {
          input: { version: Constants.manifest.extra.appVersion }
        }
      });
    }

  }, [updateSession, session]);
}

export default useSaveVersion;
